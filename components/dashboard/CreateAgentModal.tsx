import React, { useEffect, useMemo, useState } from 'react';
import type { EvolutionInstance } from '../../api/mockApi';
import {
  buildInstanceSnapshot,
  createEvolutionInstance,
  createManagerInstance,
  generateInstanceToken,
  normalizeInstanceName,
  type InstanceCreationPayload,
} from '../../api/evolution';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; phone: string; evolutionInstance?: EvolutionInstance }) => Promise<void>;
}

type StepState = 'idle' | 'running' | 'success' | 'error';

interface StepItem {
  label: string;
  state: StepState;
  message?: string;
}

const STORAGE_KEYS = {
  apiBaseUrl: 'agentai.evolution.apiUrl',
  masterKey: 'agentai.evolution.masterKey',
  managerUrl: 'agentai.evolution.managerUrl',
};

const DEFAULT_MANAGER_URL = 'https://serwer.prolifesoft.com/manager';

const readStorage = (key: string): string => {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(key) || '';
};

const writeStorage = (key: string, value: string) => {
  if (typeof window === 'undefined') return;
  if (value) {
    window.localStorage.setItem(key, value);
  } else {
    window.localStorage.removeItem(key);
  }
};

const initialSteps: StepItem[] = [
  { label: 'Evolution Manager kaydı', state: 'idle' },
  { label: 'Evolution API instance oluşturma', state: 'idle' },
  { label: 'Dashboard kaydı', state: 'idle' },
];

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ isOpen, onClose, onSave }) => {
  const [agentName, setAgentName] = useState('');
  const [whatsAppNumber, setWhatsAppNumber] = useState('');
  const [instanceToken, setInstanceToken] = useState(generateInstanceToken());
  const [steps, setSteps] = useState<StepItem[]>(initialSteps);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tokenCopied, setTokenCopied] = useState(false);

  const [apiBaseUrl, setApiBaseUrl] = useState(() => {
    const fromEnv = typeof import.meta !== 'undefined' ? (import.meta.env as Record<string, string | undefined>).VITE_EVOLUTION_API_URL : undefined;
    return readStorage(STORAGE_KEYS.apiBaseUrl) || fromEnv || '';
  });
  const [masterKey, setMasterKey] = useState(() => {
    const fromEnv = typeof import.meta !== 'undefined' ? (import.meta.env as Record<string, string | undefined>).VITE_EVOLUTION_MASTER_KEY : undefined;
    return readStorage(STORAGE_KEYS.masterKey) || fromEnv || '';
  });
  const [managerUrl, setManagerUrl] = useState(() => {
    const fromEnv = typeof import.meta !== 'undefined' ? (import.meta.env as Record<string, string | undefined>).VITE_EVOLUTION_MANAGER_URL : undefined;
    return readStorage(STORAGE_KEYS.managerUrl) || fromEnv || DEFAULT_MANAGER_URL;
  });

  useEffect(() => {
    if (!isOpen) return;
    setAgentName('');
    setWhatsAppNumber('');
    setInstanceToken(generateInstanceToken());
    setSteps(initialSteps);
    setSubmitError('');
    setTokenCopied(false);
  }, [isOpen]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.apiBaseUrl, apiBaseUrl);
  }, [apiBaseUrl]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.masterKey, masterKey);
  }, [masterKey]);

  useEffect(() => {
    writeStorage(STORAGE_KEYS.managerUrl, managerUrl);
  }, [managerUrl]);

  useEffect(() => {
    setTokenCopied(false);
  }, [instanceToken]);

  const instanceName = useMemo(() => normalizeInstanceName(agentName), [agentName]);

  const updateStep = (index: number, updates: Partial<StepItem>) => {
    setSteps(prev => prev.map((step, idx) => (idx === index ? { ...step, ...updates } : step)));
  };

  const numberIsValid = (value: string) => /^\+90\d{10}$/.test(value.trim());

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(instanceToken);
      setTokenCopied(true);
      setTimeout(() => setTokenCopied(false), 2000);
    } catch (error) {
      console.error('Token kopyalanamadı:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!agentName.trim()) {
      setSubmitError('Agent adı zorunludur.');
      return;
    }

    if (!numberIsValid(whatsAppNumber)) {
      setSubmitError('Telefon numarası +90 ile başlamalı ve toplam 12 rakam içermelidir. Örn: +905551234567');
      return;
    }

    if (!managerUrl.trim()) {
      setSubmitError('Manager URL alanı boş bırakılamaz.');
      return;
    }

    if (!apiBaseUrl.trim()) {
      setSubmitError('Evolution API adresini girmeniz gerekiyor.');
      return;
    }

    if (!masterKey.trim()) {
      setSubmitError('Evolution API master token alanı zorunludur.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setSteps(initialSteps.map(step => ({ ...step }))); // reset states

    const payload: InstanceCreationPayload = {
      instanceName,
      token: instanceToken,
      number: whatsAppNumber.trim(),
      channel: 'baileys',
      qrcode: true,
    };

    try {
      updateStep(0, { state: 'running', message: undefined });
      await createManagerInstance(payload, { managerBaseUrl: managerUrl.trim() });
      updateStep(0, { state: 'success', message: 'Manager kaydı tamamlandı.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Manager servisine ulaşılamadı.';
      updateStep(0, { state: 'error', message });
      setSubmitError(message);
      setIsSubmitting(false);
      return;
    }

    try {
      updateStep(1, { state: 'running', message: undefined });
      await createEvolutionInstance(payload, {
        apiBaseUrl: apiBaseUrl.trim(),
        masterKey: masterKey.trim(),
        qrcode: true,
      });
      updateStep(1, { state: 'success', message: 'Evolution API instance oluşturuldu.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Evolution API çağrısı başarısız oldu.';
      updateStep(1, { state: 'error', message });
      setSubmitError(message);
      setIsSubmitting(false);
      return;
    }

    try {
      updateStep(2, { state: 'running', message: undefined });
      const snapshot = buildInstanceSnapshot(payload, managerUrl.trim());
      await onSave({
        name: agentName.trim(),
        phone: whatsAppNumber.trim(),
        evolutionInstance: snapshot,
      });
      updateStep(2, { state: 'success', message: 'Dashboard kaydı tamamlandı.' });
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Agent kaydedilirken bir hata oluştu.';
      updateStep(2, { state: 'error', message });
      setSubmitError(message);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => {
        if (!isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => !isSubmitting && onClose()}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Kapat"
          disabled={isSubmitting}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 pt-8 pb-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 text-center">Yeni Agent ve Instance Oluştur</h2>
          <p className="mt-2 text-slate-600 text-center">
            Agent adını yazdığınızda Evolution API üzerinde aynı isimle bir instance açılacak. Token otomatik üretilir ve Baileys kanalı zorunludur.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="agent_name" className="block text-sm font-medium text-slate-700">Agent Adı</label>
                <input
                  type="text"
                  id="agent_name"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
                  placeholder="Örn: Satış Destek Asistanı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Instance Adı</label>
                <input
                  type="text"
                  value={instanceName}
                  readOnly
                  className="mt-1 block w-full rounded-md border border-slate-200 bg-slate-50 text-slate-600 sm:text-sm p-3"
                />
                <p className="mt-1 text-xs text-slate-500">Instance adı agent adından otomatik üretilir ve yalnızca küçük harf, sayı ve tire içerir.</p>
              </div>
              <div>
                <label htmlFor="instance_number" className="block text-sm font-medium text-slate-700">WhatsApp Numarası</label>
                <input
                  type="tel"
                  id="instance_number"
                  value={whatsAppNumber}
                  onChange={(e) => setWhatsAppNumber(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
                  placeholder="+905551234567"
                />
                <p className="mt-1 text-xs text-slate-500">Numara +90 ile başlamalı ve toplam 12 rakamdan oluşmalıdır.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Kanal</label>
                <input
                  type="text"
                  value="Baileys"
                  readOnly
                  className="mt-1 block w-full rounded-md border border-slate-200 bg-slate-50 text-slate-700 sm:text-sm p-3 uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Instance Token</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    value={instanceToken}
                    readOnly
                    className="flex-1 rounded-l-md border border-slate-300 bg-slate-50 text-sm p-3 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setInstanceToken(generateInstanceToken())}
                    className="px-3 bg-slate-100 border border-l-0 border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-200"
                    disabled={isSubmitting}
                  >
                    Yenile
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyToken}
                    className="px-3 bg-brand-dark text-white rounded-r-md text-sm font-medium hover:bg-brand-teal disabled:bg-slate-400"
                    disabled={isSubmitting}
                  >
                    Kopyala
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Token otomatik üretilir ve müşterinizle paylaşılacak tek kimliktir.
                  {tokenCopied && <span className="ml-2 text-emerald-600 font-semibold">Kopyalandı!</span>}
                </p>
              </div>
              <div className="border border-emerald-100 bg-emerald-50 rounded-lg p-4 text-sm text-emerald-800">
                Oluşturma tamamlandığında QR kodu Evolution API tarafından üretilecek ve agent detay sayfasındaki cihaz kartından erişilebilecektir.
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(prev => !prev)}
              className="text-sm font-medium text-brand-dark hover:text-brand-teal"
            >
              {showAdvanced ? 'API ayarlarını gizle' : 'API ayarlarını göster'}
            </button>
            {showAdvanced && (
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div>
                  <label htmlFor="api_base_url" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Evolution API URL</label>
                  <input
                    id="api_base_url"
                    type="text"
                    value={apiBaseUrl}
                    onChange={(e) => setApiBaseUrl(e.target.value)}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-2.5"
                    placeholder="https://sunucu-adresiniz:8080"
                  />
                </div>
                <div>
                  <label htmlFor="master_key" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Master Token</label>
                  <input
                    id="master_key"
                    type="text"
                    value={masterKey}
                    onChange={(e) => setMasterKey(e.target.value)}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-2.5"
                    placeholder="Evolution API master token"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="manager_url" className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">Manager Servis URL</label>
                  <input
                    id="manager_url"
                    type="text"
                    value={managerUrl}
                    onChange={(e) => setManagerUrl(e.target.value)}
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-2.5"
                    placeholder={DEFAULT_MANAGER_URL}
                  />
                  <p className="mt-1 text-xs text-slate-500">Bu servis Evolution Manager'da instance kaydı oluşturur. Varsayılan değer PROLIFE sunucusudur.</p>
                </div>
              </div>
            )}
          </div>

          {submitError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <div className="space-y-2">
            {steps.map((step, index) => (
              <div key={step.label} className="flex items-center text-sm">
                <span
                  className={`mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${
                    step.state === 'success'
                      ? 'bg-emerald-100 text-emerald-700'
                      : step.state === 'error'
                        ? 'bg-red-100 text-red-700'
                        : step.state === 'running'
                          ? 'bg-sky-100 text-sky-700 animate-pulse'
                          : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {step.state === 'success' ? '✓' : step.state === 'error' ? '!' : index + 1}
                </span>
                <span className="font-medium text-slate-700">{step.label}</span>
                {step.message && <span className="ml-2 text-slate-500">— {step.message}</span>}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => !isSubmitting && onClose()}
              className="px-6 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              disabled={isSubmitting}
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-brand-teal rounded-lg disabled:bg-slate-400"
            >
              {isSubmitting ? 'Oluşturuluyor...' : 'Oluştur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentModal;
