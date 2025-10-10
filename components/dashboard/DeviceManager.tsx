import React, { useState } from 'react';

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


const DeviceManager: React.FC = () => {
    const [showQRCode, setShowQRCode] = useState(false);
    
    const apiInfo = {
        "status": 200,
        "message": "Welcome to the Evolution API, it is working!",
        "version": "1.7.4",
        "swagger": "http://whatsapp.prolifesoft.com/docs",
        "manager": "http://whatsapp.prolifesoft.com/manager",
        "documentation": "https://doc.evolution-api.com"
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900">Cihaz Yönetimi</h1>
            <p className="mt-1 text-slate-600">WhatsApp hesabınızı yönetin ve yeni cihazlar bağlayın.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Connection Status */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Mevcut Durum</h2>
                    <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                        <div>
                            <p className="font-semibold text-green-800">Cihaz Bağlı</p>
                            <p className="text-sm text-green-700">+90 555 123 4567</p>
                        </div>
                    </div>
                    <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                        Bağlantıyı Kes
                    </button>
                </div>
                
                {/* API Info */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">API Bilgileri</h2>
                    <div className="text-sm space-y-2">
                        <p><span className="font-semibold text-slate-600">Durum:</span> <span className="text-green-600 font-bold">{apiInfo.status}</span></p>
                        <p><span className="font-semibold text-slate-600">Versiyon:</span> {apiInfo.version}</p>
                        <p><span className="font-semibold text-slate-600">Swagger UI:</span> <a href={apiInfo.swagger} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">Ziyaret Et</a></p>
                        <p><span className="font-semibold text-slate-600">Dokümantasyon:</span> <a href={apiInfo.documentation} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">Ziyaret Et</a></p>
                    </div>
                </div>
            </div>

            {/* Connect New Device */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-slate-800">Yeni Cihaz Bağla</h2>
                {!showQRCode ? (
                    <>
                        <p className="mt-2 text-slate-600">Yeni bir WhatsApp hesabı bağlamak için butona tıklayın ve telefonunuzdan QR kodu okutun.</p>
                        <button onClick={() => setShowQRCode(true)} className="mt-4 bg-brand-dark hover:bg-brand-teal text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            QR Kodu Oluştur
                        </button>
                    </>
                ) : (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="max-w-xs mx-auto">
                            <QRCodePlaceholder />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">QR Kodu Nasıl Okutulur?</h3>
                            <ol className="list-decimal list-inside mt-2 text-slate-600 space-y-2">
                                <li>Telefonunuzda WhatsApp'ı açın.</li>
                                <li><strong>Ayarlar</strong> &gt; <strong>Bağlı Cihazlar</strong>'a gidin.</li>
                                <li><strong>Cihaz Bağla</strong>'ya dokunun.</li>
                                <li>Telefonunuzla bu ekrandaki QR kodunu tarayın.</li>
                            </ol>
                            <button onClick={() => setShowQRCode(false)} className="mt-6 text-sm text-slate-500 hover:underline">İptal</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceManager;