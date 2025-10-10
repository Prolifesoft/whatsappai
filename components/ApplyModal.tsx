import React, { useState, useEffect, useRef } from 'react';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose, jobTitle }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (isOpen) {
          setIsSuccess(false);
          setFileName('');
      }
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
          setTimeout(() => {
              onClose();
          }, 2500);
      }, 1500);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName('');
    }
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
        className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg m-4"
        onClick={(e) => e.stopPropagation()}
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
                <h2 className="text-2xl font-bold text-slate-900">Başvurunuz Alındı!</h2>
                <p className="mt-2 text-slate-600">İlginiz için teşekkür ederiz. Ekibimiz başvurunuzu inceledikten sonra sizinle iletişime geçecektir.</p>
            </div>
        ) : (
            <>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">İş Başvurusu</h2>
                    <p className="mt-2 text-slate-600 font-semibold">{jobTitle}</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="apply_first_name" className="block text-sm font-medium text-slate-700">Adınız</label>
                            <input type="text" name="first_name" id="apply_first_name" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                        </div>
                        <div>
                            <label htmlFor="apply_last_name" className="block text-sm font-medium text-slate-700">Soyadınız</label>
                            <input type="text" name="last_name" id="apply_last_name" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="apply_email" className="block text-sm font-medium text-slate-700">E-postanız</label>
                            <input type="email" name="email" id="apply_email" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                        </div>
                        <div>
                            <label htmlFor="apply_phone" className="block text-sm font-medium text-slate-700">Telefon Numaranız</label>
                            <input type="tel" name="phone" id="apply_phone" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="resume" className="block text-sm font-medium text-slate-700">Özgeçmiş/CV Yükle</label>
                        <div className="mt-1">
                            <input 
                                type="file" 
                                name="resume" 
                                id="resume" 
                                required 
                                className="sr-only" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                            />
                            <button 
                                type="button" 
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full text-left p-3 rounded-md border border-slate-300 cursor-pointer bg-white flex items-center justify-between"
                            >
                                <span className="text-slate-500 truncate">{fileName || 'Dosya seçin...'}</span>
                                <span className="flex-shrink-0 ml-4 px-3 py-1 text-sm font-medium bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                                    Gözat
                                </span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="cover_letter" className="block text-sm font-medium text-slate-700">Ön Yazı (İsteğe Bağlı)</label>
                         <textarea name="cover_letter" id="cover_letter" rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"></textarea>
                    </div>

                    <div>
                        <button type="submit" disabled={isSubmitting} className="w-full mt-4 flex justify-center items-center bg-brand-dark hover:bg-brand-teal text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:bg-slate-400 disabled:scale-100">
                            {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                        </button>
                    </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
