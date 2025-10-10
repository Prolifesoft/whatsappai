import React, { useState, useEffect } from 'react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [accountType, setAccountType] = useState('individual'); // 'individual' or 'corporate'

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  useEffect(() => {
      // Reset state when modal is opened
      if (isOpen) {
          setIsSuccess(false);
          setAccountType('individual');
      }
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
          // Close modal after a short delay to show success message
          setTimeout(() => {
              onClose();
          }, 2000);
      }, 1500);
  };


  if (!isOpen) {
    return null;
  }

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up" 
        style={{animationDuration: '0.3s'}}
        onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md m-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Kapat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {isSuccess ? (
            <div className="text-center py-8">
                <div className="flex items-center justify-center mx-auto w-16 h-16 bg-green-100 rounded-full mb-4">
                     <svg className="w-10 h-10 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Teşekkürler!</h2>
                <p className="mt-2 text-slate-600">Formunuz başarıyla gönderildi. Ekibimiz en kısa sürede sizinle iletişime geçecektir.</p>
            </div>
        ) : (
            <>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Ücretsiz Denemeyi Başlatın</h2>
                    <p className="mt-2 text-slate-600">Bilgilerinizi girin, ekibimiz sizinle iletişime geçsin ve AgentAI'nin potansiyelini keşfedin.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Hesap Türü</label>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <input
                                    type="radio"
                                    name="account_type"
                                    id="individual"
                                    value="individual"
                                    className="sr-only peer"
                                    checked={accountType === 'individual'}
                                    onChange={() => setAccountType('individual')}
                                />
                                <label
                                    htmlFor="individual"
                                    className="w-full text-center p-3 rounded-md border cursor-pointer peer-checked:bg-brand-teal peer-checked:text-white peer-checked:border-brand-teal transition-colors"
                                >
                                    Bireysel
                                </label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="account_type"
                                    id="corporate"
                                    value="corporate"
                                    className="sr-only peer"
                                    checked={accountType === 'corporate'}
                                    onChange={() => setAccountType('corporate')}
                                />
                                <label
                                    htmlFor="corporate"
                                    className="w-full text-center p-3 rounded-md border cursor-pointer peer-checked:bg-brand-teal peer-checked:text-white peer-checked:border-brand-teal transition-colors"
                                >
                                    Kurumsal
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label htmlFor="first_name" className="block text-sm font-medium text-slate-700">Adınız</label>
                            <input type="text" name="first_name" id="first_name" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium text-slate-700">Soyadınız</label>
                            <input type="text" name="last_name" id="last_name" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">E-postanız</label>
                        <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                    </div>
                     <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Telefon Numaranız</label>
                        <input type="tel" name="phone" id="phone" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                    </div>
                     
                    {accountType === 'corporate' && (
                        <>
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-slate-700">Şirket Adınız</label>
                                <input type="text" name="company" id="company" required={accountType === 'corporate'} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                            </div>
                             <div>
                                <label htmlFor="company_size" className="block text-sm font-medium text-slate-700">Çalışan Sayısı</label>
                                <select
                                    id="company_size"
                                    name="company_size"
                                    required={accountType === 'corporate'}
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
                                >
                                    <option value="">Seçiniz...</option>
                                    <option value="1-10">1-10</option>
                                    <option value="11-50">11-50</option>
                                    <option value="51-200">51-200</option>
                                    <option value="201-1000">201-1000</option>
                                    <option value="1000+">1000+</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div>
                        <button type="submit" disabled={isSubmitting} className="w-full mt-4 flex justify-center items-center bg-brand-dark hover:bg-brand-teal text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:bg-slate-400 disabled:scale-100">
                            {isSubmitting ? 'Gönderiliyor...' : 'Denemeyi Başlat'}
                        </button>
                    </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default TrialModal;