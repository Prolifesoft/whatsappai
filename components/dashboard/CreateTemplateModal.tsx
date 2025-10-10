import React, { useState, useEffect } from 'react';
import { Template } from '../../auth/AuthContext';

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Template) => void;
  templateToEdit: Template | null;
}

const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({ isOpen, onClose, onSave, templateToEdit }) => {
  const [name, setName] = useState('');
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (templateToEdit) {
        setName(templateToEdit.name);
        setPrompt(templateToEdit.prompt);
      } else {
        setName('');
        setPrompt('');
      }
    }
  }, [isOpen, templateToEdit]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !prompt.trim()) return;
    onSave({ name, prompt });
    onClose();
  };

  if (!isOpen) {
    return null;
  }
  
  const isEditing = !!templateToEdit;

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
          <h2 className="text-2xl font-bold text-slate-900">{isEditing ? 'Şablonu Düzenle' : 'Yeni Şablon Oluştur'}</h2>
          <p className="mt-2 text-slate-600">
            {isEditing ? 'Şablonun adını ve talimatını güncelleyin.' : 'Yeniden kullanılabilir bir şablon oluşturun.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="template_name" className="block text-sm font-medium text-slate-700">Şablon Adı</label>
            <input
              type="text"
              name="template_name"
              id="template_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3"
              placeholder="Örn: Teknik Destek Asistanı"
            />
          </div>
          <div>
            <label htmlFor="template_prompt" className="block text-sm font-medium text-slate-700">Sistem Talimatı (Prompt)</label>
            <textarea
              name="template_prompt"
              id="template_prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
              rows={5}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3"
              placeholder="Bu şablonu kullanan agent'ların nasıl davranmasını istediğinizi yazın..."
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
              disabled={!name.trim() || !prompt.trim()}
              className="px-6 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-600 rounded-lg disabled:bg-slate-400"
            >
              {isEditing ? 'Değişiklikleri Kaydet' : 'Şablonu Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTemplateModal;
