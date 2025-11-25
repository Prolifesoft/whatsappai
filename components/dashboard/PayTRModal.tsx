import React, { useEffect } from 'react';

interface PayTRModalProps {
    isOpen: boolean;
    onClose: () => void;
    token: string;
}

const PayTRModal: React.FC<PayTRModalProps> = ({ isOpen, onClose, token }) => {
    
    // Iframe boyutlandırma scripti (PayTR dokümanından)
    useEffect(() => {
        if (isOpen) {
            const script = document.createElement('script');
            script.src = "https://www.paytr.com/js/iframeResizer.min.js";
            script.async = true;
            document.body.appendChild(script);
            
            script.onload = () => {
                // @ts-ignore
                window.iFrameResize({}, '#paytriframe');
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="relative bg-white w-full max-w-4xl h-[90vh] rounded-lg shadow-2xl flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-bold text-slate-800">Güvenli Ödeme</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-red-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                    <iframe 
                        src={`https://www.paytr.com/odeme/guvenli/${token}`} 
                        id="paytriframe"
                        style={{width: '100%', minHeight: '600px', border: 'none'}}
                        title="PayTR Ödeme Formu"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default PayTRModal;
