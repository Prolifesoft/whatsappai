import React, { useState, useEffect } from 'react';
import { KnowledgeItem } from '../../auth/AuthContext';

interface AddEditKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: { title: string, content: string }) => void;
  knowledgeItem: KnowledgeItem | null;
}

const AddEditKnowledgeModal: React.FC<AddEditKnowledgeModalProps> = ({ isOpen, onClose, onSave, knowledgeItem }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (knowledgeItem) {
        setTitle(knowledgeItem.title);
        setContent(knowledgeItem.content);
      } else {
        setTitle('');
        setContent('');
      }
    }
  }, [isOpen, knowledgeItem]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSave({ title, content });
  };

  if (!isOpen) {
    return null;
  }

  const modalTitle = knowledgeItem ? 'Bilgi Sayfasını Düzenle' : 'Yeni Bilgi Sayfası Ekle';
  const buttonText = knowledgeItem ? 'Değişiklikleri Kaydet' : 'Kaydet';

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
          <h2 className="text-2xl font-bold text-slate-900">{modalTitle}</h2>
          <p className="mt-2 text-slate-600">Agent'ınızın bu bilgiyi kullanarak cevap vermesini sağlayın.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="kb_title" className="block text-sm font-medium text-slate-700">Başlık</label>
            <input
              type="text"
              name="kb_title"
              id="kb_title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
              placeholder="Örn: İade ve Değişim Politikası"
            />
          </div>
          <div>
            <label htmlFor="kb_content" className="block text-sm font-medium text-slate-700">İçerik</label>
            <textarea
              name="kb_content"
              id="kb_content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={6}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
              placeholder="Agent'ınızın öğrenmesini istediğiniz detaylı bilgiyi buraya yazın..."
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
              disabled={!title.trim() || !content.trim()}
              className="px-6 py-2 text-sm font-medium text-white bg-brand-dark hover:bg-brand-teal rounded-lg disabled:bg-slate-400"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditKnowledgeModal;