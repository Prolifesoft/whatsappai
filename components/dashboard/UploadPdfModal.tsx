import React, { useState, useEffect, useRef } from 'react';

interface UploadPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File) => void;
}

const UploadPdfModal: React.FC<UploadPdfModalProps> = ({ isOpen, onClose, onSave }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedFile(null);
    }
  }, [isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;
    onSave(selectedFile);
    onClose();
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
          <h2 className="text-2xl font-bold text-slate-900">PDF Belgesi Yükle</h2>
          <p className="mt-2 text-slate-600">Agent'ınızın öğrenmesi için bir PDF dosyası (ürün kataloğu, SSS vb.) yükleyin.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="pdf_upload" className="block text-sm font-medium text-slate-700">PDF Dosyası</label>
            <div className="mt-1">
              <input 
                  type="file" 
                  name="pdf_upload" 
                  id="pdf_upload" 
                  required 
                  className="sr-only" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
              />
              <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full text-left p-3 rounded-md border-2 border-dashed border-slate-300 cursor-pointer bg-white flex items-center justify-center text-slate-500 hover:border-brand-dark hover:text-brand-dark"
              >
                  {selectedFile ? (
                    <span className="font-semibold text-brand-dark">{selectedFile.name}</span>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V6a2 2 0 012-2h10a2 2 0 012 2v6a4 4 0 01-4 4H7z" /></svg>
                      <span>Bir dosya seçin veya buraya sürükleyin</span>
                    </>
                  )}
              </button>
            </div>
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
              disabled={!selectedFile}
              className="px-6 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-brand-teal rounded-lg disabled:bg-slate-400"
            >
              Yükle ve Eğit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPdfModal;
