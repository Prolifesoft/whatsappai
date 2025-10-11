import React, { useState, useEffect } from 'react';
import { Agent } from '../../auth/AuthContext';

const QRCodePlaceholder = () => (
    <div className="bg-white p-4 rounded-lg border">
        <svg viewBox="0 0 256 256" className="w-full h-full">
            <rect width="256" height="256" fill="#f0f0f0"/>
            <rect x="32" y="32" width="32" height="32" fill="#333"/>
            <rect x="32" y="192" width="32" height="32" fill="#333"/>
            <rect x="192" y="32" width="32" height="32" fill="#333"/>
            <rect x="80" y="48" width="16" height="16" fill="#333"/>
            <rect x="112" y="64" width="16" height="16" fill="#333"/>
            <rect x="160" y="32" width="16" height="16" fill="#333"/>
            <rect x="48" y="80" width="16" height="16" fill="#333"/>
            <rect x="96" y="96" width="32" height="32" fill="#333"/>
            <rect x="144" y="96" width="16" height="16" fill="#333"/>
            <rect x="176" y="80" width="32" height="16" fill="#333"/>
            <rect x="48" y="144" width="32" height="32" fill="#333"/>
            <rect x="32" y="144" width="16" height="16" fill="#333"/>
            <rect x="128" y="160" width="16" height="32" fill="#333"/>
            <rect x="176" y="176" width="48" height="48" fill="#333"/>
            <rect x="96" y="192" width="16" height="16" fill="#333"/>
        </svg>
    </div>
);

interface AgentOverviewTabProps {
    agent: Agent;
    onDisconnect: (agentId: string) => void;
    onConnect: (agentId: string, phone: string) => void;
    onConfirmConnection: (agentId: string) => void;
}

const AgentOverviewTab: React.FC<AgentOverviewTabProps> = ({ agent, onDisconnect, onConnect, onConfirmConnection }) => {
    const [phone, setPhone] = useState('');
    const [isConnecting, setIsConnecting] = useState(false);
    const [tokenCopied, setTokenCopied] = useState(false);

    useEffect(() => {
        // If agent phone exists but status is inactive, it means we are in the connecting (QR) stage
        if (agent.phone && agent.status === 'inactive') {
            setIsConnecting(true);
        } else {
            setIsConnecting(false);
        }
    }, [agent]);

    useEffect(() => {
        setTokenCopied(false);
    }, [agent.evolutionInstance?.token]);


    const handleAssignNumber = (e: React.FormEvent) => {
        e.preventDefault();
        onConnect(agent.id, phone);
    };

    const handleConfirm = () => {
        onConfirmConnection(agent.id);
    };

    const handleDisconnect = () => {
        if (window.confirm('Bu cihazın bağlantısını kesmek istediğinizden emin misiniz?')) {
            onDisconnect(agent.id);
        }
    };

    const handleCopyToken = async () => {
        if (!agent.evolutionInstance?.token) return;
        try {
            await navigator.clipboard.writeText(agent.evolutionInstance.token);
            setTokenCopied(true);
            setTimeout(() => setTokenCopied(false), 2000);
        } catch (error) {
            console.error('Token kopyalanamadı:', error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-slate-800">Cihaz Bağlantısı</h2>
            <div className="mt-4">
                {agent.status === 'active' && agent.phone ? (
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                             <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
                            <div>
                                <p className="font-semibold text-green-800">Cihaz Bağlı</p>
                                <p className="text-sm text-green-700">{agent.phone}</p>
                            </div>
                        </div>
                        <button onClick={handleDisconnect} className="bg-red-100 text-red-700 hover:bg-red-200 font-medium text-sm py-2 px-4 rounded-lg">
                            Bağlantıyı Kes
                        </button>
                    </div>
                ) : isConnecting ? (
                     <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-4 border-2 border-dashed rounded-lg">
                        <div className="max-w-xs mx-auto">
                            <QRCodePlaceholder />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">QR Kodu Okutun</h3>
                            <p className="text-sm text-slate-500 mb-2">Aşağıdaki adımları izleyerek <span className="font-semibold">{agent.phone}</span> numarasını bağlayın.</p>
                            <ol className="list-decimal list-inside text-slate-600 space-y-1 text-sm">
                                <li>Telefonunuzda WhatsApp'ı açın.</li>
                                <li><strong>Ayarlar</strong> &gt; <strong>Bağlı Cihazlar</strong>'a gidin.</li>
                                <li><strong>Cihaz Bağla</strong>'ya dokunun.</li>
                                <li>QR kodunu tarayın.</li>
                            </ol>
                            <div className="mt-4 flex space-x-2">
                                <button onClick={handleConfirm} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg">
                                    Bağlantıyı Onayla
                                </button>
                                <button onClick={() => onDisconnect(agent.id)} className="text-sm text-slate-500 hover:underline">İptal</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleAssignNumber} className="space-y-3">
                        <p className="text-sm text-slate-600">Bu agent'ı bir WhatsApp numarasına bağlamak için başlayın.</p>
                         <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Telefon Numarası</label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
                                placeholder="+905551234567"
                            />
                        </div>
                         <button type="submit" className="bg-slate-800 hover:bg-slate-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            Numarayı Ata ve Bağlan
                        </button>
                    </form>
                )}
            </div>

            {agent.evolutionInstance && (
                <div className="mt-6 border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-semibold text-slate-800">Evolution API Instance Bilgileri</h3>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <dl className="space-y-3 text-sm">
                                <div>
                                    <dt className="font-medium text-slate-600 uppercase text-xs tracking-wide">Instance Adı</dt>
                                    <dd className="text-slate-800 font-semibold">{agent.evolutionInstance.name}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-slate-600 uppercase text-xs tracking-wide">Kanal</dt>
                                    <dd className="text-slate-800">{agent.evolutionInstance.channel.toUpperCase()}</dd>
                                </div>
                                <div>
                                    <dt className="font-medium text-slate-600 uppercase text-xs tracking-wide">Token</dt>
                                    <dd className="flex items-center space-x-2">
                                        <span className="font-mono text-xs break-all text-slate-700">{agent.evolutionInstance.token}</span>
                                        <button
                                            type="button"
                                            onClick={handleCopyToken}
                                            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
                                        >
                                            Kopyala
                                        </button>
                                    </dd>
                                    {tokenCopied && <p className="mt-1 text-xs text-emerald-600">Token panoya kopyalandı.</p>}
                                </div>
                                <div>
                                    <dt className="font-medium text-slate-600 uppercase text-xs tracking-wide">Kayıt Tarihi</dt>
                                    <dd className="text-slate-800">
                                        {new Date(agent.evolutionInstance.createdAt).toLocaleString('tr-TR')}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className="flex flex-col justify-between bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                            <div>
                                <h4 className="text-sm font-semibold text-slate-700">Manager Servisi</h4>
                                <p className="text-xs text-slate-500">
                                    Instance kaydı Evolution Manager üzerinde de oluşturulmuştur. Yönetim panelini açarak QR kod ve entegrasyonları kontrol edebilirsiniz.
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-medium text-slate-600 uppercase">Bağlı Numara</p>
                                    <p className="text-sm text-slate-800">{agent.evolutionInstance.number}</p>
                                </div>
                                {agent.evolutionInstance.managerUrl && (
                                    <a
                                        href={`${agent.evolutionInstance.managerUrl.replace(/\/$/, '')}/manager/instance/${agent.evolutionInstance.name}/dashboard`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center rounded-md bg-brand-dark px-3 py-2 text-xs font-semibold text-white hover:bg-brand-teal"
                                    >
                                        Manager'da Aç
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentOverviewTab;