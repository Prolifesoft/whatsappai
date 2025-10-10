import React, { useState, useEffect } from 'react';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; phone: string }) => void;
}

const CreateAgentModal: React.FC<CreateAgentModalProps> = ({ isOpen, onClose, onSave }) => {
  const [agentName, setAgentName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAgentName('');
      setPhone('');
    }
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agentName.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSave({ name: agentName, phone });
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Kapat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Yeni Agent Oluştur</h2>
          <p className="mt-2 text-slate-600">Yeni yapay zeka asistanınıza bir isim verin.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="agent_name" className="block text-sm font-medium text-slate-700">Agent Adı</label>
            <input
              type="text"
              name="agent_name"
              id="agent_name"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
              placeholder="Örn: Satış Destek Asistanı"
            />
          </div>
           <div>
            <label htmlFor="agent_phone" className="block text-sm font-medium text-slate-700">Telefon Numarası (İsteğe Bağlı)</label>
            <input
              type="tel"
              name="agent_phone"
              id="agent_phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
              placeholder="+905551234567"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !agentName.trim()}
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