import React, { useState, useEffect } from 'react';

interface AddSitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (url: string) => void;
}

const AddSitemapModal: React.FC<AddSitemapModalProps> = ({ isOpen, onClose, onSave }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUrl('');
    }
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url.trim()) return;
    onSave(url);
    onClose();
  };

  const isValidUrl = (urlString: string) => {
    try { 
      return Boolean(new URL(urlString)); 
    }
    catch(e){ 
      return false; 
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in-up"
      style={{ animationDuration: '0.3s' }}
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

        <div className="text-left">
          <h2 className="text-2xl font-bold text-slate-900">Site Haritası URL'si Ekle</h2>
          <p className="mt-2 text-slate-600">Web sitenizin içeriğini otomatik olarak eklemek için site haritası (sitemap.xml) URL'sini girin.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="sitemap_url" className="block text-sm font-medium text-slate-700">Site Haritası URL</label>
            <input
              type="url"
              name="sitemap_url"
              id="sitemap_url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
              placeholder="https://siteniz.com/sitemap.xml"
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
              disabled={!isValidUrl(url)}
              className="px-6 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-brand-teal rounded-lg disabled:bg-slate-400"
            >
              Ekle ve Eğit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSitemapModal;
