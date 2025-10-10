import React, { useState, useEffect } from 'react';
import { Agent, KnowledgeItem } from '../../auth/AuthContext';
import { Template } from '../../auth/AuthContext';
import AddEditKnowledgeModal from './AddEditKnowledgeModal';
import CreateTemplateModal from './CreateTemplateModal';

interface AgentTrainingTabProps {
    agent: Agent;
    customTemplates: Template[];
    onAddTemplate: (template: Template) => void;
    onUpdateTemplate: (originalName: string, newTemplate: Template) => void;
    onDeleteTemplate: (templateName: string) => void;
    onUpdateTraining: (agentId: string, prompt: string) => void;
    onUpdateKnowledgeBase: (agentId: string, knowledgeBase: KnowledgeItem[]) => void;
}

const KnowledgeItemCard: React.FC<{ item: KnowledgeItem, onEdit: () => void, onDelete: () => void }> = ({ item, onEdit, onDelete }) => {
    const getIcon = () => {
        switch (item.type) {
            case 'pdf': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
            case 'sitemap': return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.002 6.002 0 0110.457 2.61.5.5 0 00.865-.5A7.002 7.002 0 006.49 6.25a.5.5 0 00-.39.837 6.024 6.024 0 01-1.768.94zM14.78 11.51a.5.5 0 00-.51.684A6.003 6.003 0 017.39 16.5a.5.5 0 00.423.86A7.003 7.003 0 0015 12a.5.5 0 00-.22-.49z" clipRule="evenodd" /></svg>;
            default: return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 1h8a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1zm1 5a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg>;
        }
    };
    return (
        <div className="bg-slate-100/70 p-3 rounded-lg border border-slate-200 flex items-center justify-between group">
            <div className="flex items-center min-w-0">
                <div className="flex-shrink-0">{getIcon()}</div>
                <div className="ml-3 min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{item.title}</p>
                    <p className="text-sm text-slate-500 truncate">{item.content}</p>
                </div>
            </div>
            <div className="flex items-center space-x-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={onEdit} className="text-slate-500 hover:text-emerald-600 p-2 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg></button>
                <button onClick={onDelete} className="text-slate-500 hover:text-red-600 p-2 rounded-md"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg></button>
            </div>
        </div>
    );
};


const AgentTrainingTab: React.FC<AgentTrainingTabProps> = ({ agent, customTemplates, onAddTemplate, onUpdateTemplate, onDeleteTemplate, onUpdateTraining, onUpdateKnowledgeBase }) => {
    
    const [systemPrompt, setSystemPrompt] = useState(agent.systemPrompt);
    const [selectedTemplate, setSelectedTemplate] = useState(agent.template);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
    const [editingKnowledgeItem, setEditingKnowledgeItem] = useState<KnowledgeItem | null>(null);
    const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
    const [showSitemapForm, setShowSitemapForm] = useState(false);
    const [sitemapUrl, setSitemapUrl] = useState('');
    const [sitemapError, setSitemapError] = useState('');

    useEffect(() => {
        setSystemPrompt(agent.systemPrompt);
        setSelectedTemplate(agent.template);
    }, [agent]);
    
    const PRESET_TEMPLATES: Template[] = [
        { name: 'E-Ticaret', prompt: 'Sen bir e-ticaret sitesi için çalışan, arkadaş canlısı ve yardımsever bir satış asistanısın...' },
        { name: 'Sağlık', prompt: 'Sen bir tıp merkezi için randevu planlama asistanısın...' },
        { name: 'Genel', prompt: 'Sen genel amaçlı bir asistansın...' },
    ];
    
    const allTemplates = [...PRESET_TEMPLATES, ...customTemplates];

    const handleSavePrompt = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            onUpdateTraining(agent.id, systemPrompt);
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 1000);
    };

    const applyTemplate = (template: Template) => {
        setSystemPrompt(template.prompt);
        setSelectedTemplate(template.name);
    };

    const handleSaveKnowledge = (item: { title: string, content: string }) => {
        let updatedItems;
        if (editingKnowledgeItem) {
            updatedItems = agent.knowledgeBase.map(kb => kb.id === editingKnowledgeItem.id ? { ...kb, ...item } : kb);
        } else {
            const newItem: KnowledgeItem = { id: `kb-${Date.now()}`, type: 'text', ...item };
            updatedItems = [...agent.knowledgeBase, newItem];
        }
        onUpdateKnowledgeBase(agent.id, updatedItems);
        setIsKnowledgeModalOpen(false);
        setEditingKnowledgeItem(null);
    };
    
    const handleAddPdf = (file: File) => {
        const newItem: KnowledgeItem = { id: `kb-${Date.now()}`, type: 'pdf', title: file.name, content: `PDF Dosyası - ${Math.round(file.size / 1024)} KB` };
        onUpdateKnowledgeBase(agent.id, [...agent.knowledgeBase, newItem]);
    };

    const handleAddSitemap = (e: React.FormEvent) => {
        e.preventDefault();
        if (!sitemapUrl.trim()) {
            setSitemapError('Lütfen bu alanı doldurun.');
            return;
        }
         try {
            new URL(sitemapUrl);
        } catch (_) {
            setSitemapError('Lütfen geçerli bir URL girin.');
            return;
        }
        setSitemapError('');

        const newItem: KnowledgeItem = { id: `kb-${Date.now()}`, type: 'sitemap', title: 'Site Haritası', content: sitemapUrl };
        onUpdateKnowledgeBase(agent.id, [...agent.knowledgeBase, newItem]);
        setShowSitemapForm(false);
        setSitemapUrl('');
    };

    const handleEditKnowledge = (item: KnowledgeItem) => {
        setEditingKnowledgeItem(item);
        setIsKnowledgeModalOpen(true);
    };

    const handleDeleteKnowledge = (id: string) => {
        if (window.confirm('Bu bilgi kaynağını silmek istediğinizden emin misiniz?')) {
            const updatedItems = agent.knowledgeBase.filter(kb => kb.id !== id);
            onUpdateKnowledgeBase(agent.id, updatedItems);
        }
    };
    
    const handleSaveTemplate = (template: Template) => {
        if (editingTemplate) {
            onUpdateTemplate(editingTemplate.name, template);
        } else {
            onAddTemplate(template);
        }
        setEditingTemplate(null);
    };
    
    const handleEditTemplate = (template: Template) => {
        setEditingTemplate(template);
        setIsTemplateModalOpen(true);
    };

    const handleDeleteTemplate = (name: string) => {
        if (window.confirm(`'${name}' şablonunu silmek istediğinizden emin misiniz?`)) {
            onDeleteTemplate(name);
        }
    };
    
    const isCustom = (name: string) => customTemplates.some(t => t.name === name);

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
                 <h2 className="text-xl font-bold text-slate-800">Sistem Talimatı (Prompt)</h2>
                 <p className="mt-1 text-sm text-slate-500 mb-4">Agent'ınızın temel kişiliğini ve görevini burada tanımlayın.</p>
                
                 <div className="flex flex-wrap items-start gap-3 mb-4">
                    {allTemplates.map(template => (
                         <div key={template.name} className={`relative group p-3 rounded-lg border-2 text-center ${selectedTemplate === template.name ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
                             <p className="font-semibold text-slate-700">{template.name}</p>
                             <button
                                onClick={() => applyTemplate(template)}
                                className={`w-full mt-2 text-xs font-bold py-1 px-3 rounded-full ${selectedTemplate === template.name ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                            >
                                {selectedTemplate === template.name ? 'Uygulandı' : 'Uygula'}
                            </button>
                            {isCustom(template.name) && (
                                <div className="absolute top-1 right-1 flex opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEditTemplate(template)} className="p-1 text-slate-500 hover:text-emerald-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg></button>
                                    <button onClick={() => handleDeleteTemplate(template.name)} className="p-1 text-slate-500 hover:text-red-600"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg></button>
                                </div>
                            )}
                        </div>
                    ))}
                    <button onClick={() => { setEditingTemplate(null); setIsTemplateModalOpen(true); }} className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:text-emerald-500 text-slate-500 w-24 h-[76px]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        <span className="text-xs font-semibold mt-1">Yeni Şablon</span>
                    </button>
                </div>

                <div className="relative">
                    <textarea
                        value={systemPrompt}
                        onChange={(e) => setSystemPrompt(e.target.value)}
                        rows={6}
                        className="w-full p-3 rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                    <button 
                        onClick={handleSavePrompt} 
                        disabled={saveStatus !== 'idle'}
                        className="absolute bottom-3 right-3 bg-slate-800 text-white font-bold py-2 px-5 rounded-lg transition-colors disabled:bg-slate-400 hover:bg-slate-600"
                    >
                         {saveStatus === 'saving' ? 'Kaydediliyor...' : saveStatus === 'saved' ? 'Kaydedildi!' : 'Kaydet'}
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-slate-800">Bilgi Kaynakları</h2>
                <p className="mt-1 text-sm text-slate-500 mb-4">Agent'ınızın konuşmalarda kullanacağı ek bilgiler.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    <button onClick={() => { setEditingKnowledgeItem(null); setIsKnowledgeModalOpen(true); }} className="text-sm font-medium flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Bilgi Ekle</button>
                    {/* <button onClick={() => {}} className="text-sm font-medium flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>PDF Yükle</button> */}
                    <button onClick={() => setShowSitemapForm(prev => !prev)} className="text-sm font-medium flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>Site Haritası</button>
                </div>

                 {showSitemapForm && (
                     <form onSubmit={handleAddSitemap} className="relative mb-4 p-4 bg-slate-50 rounded-lg border">
                         <input
                             type="url"
                             value={sitemapUrl}
                             onChange={(e) => { setSitemapUrl(e.target.value); setSitemapError(''); }}
                             placeholder="https://siteniz.com/sitemap.xml"
                             className={`w-full p-2 border rounded-md ${sitemapError ? 'border-red-500' : 'border-slate-300'}`}
                         />
                         {sitemapError && <p className="absolute -bottom-5 left-2 text-xs text-red-600 bg-white px-1">{sitemapError}</p>}
                         <div className="flex justify-end space-x-2 mt-2">
                             <button type="button" onClick={() => setShowSitemapForm(false)} className="text-sm px-3 py-1 bg-slate-200 rounded-md">İptal</button>
                             <button type="submit" className="text-sm px-3 py-1 bg-emerald-600 text-white rounded-md">Ekle</button>
                         </div>
                     </form>
                 )}

                 <div className="space-y-3">
                    {agent.knowledgeBase.length > 0 ? (
                        agent.knowledgeBase.map(item => (
                            <KnowledgeItemCard 
                                key={item.id} 
                                item={item} 
                                onEdit={() => handleEditKnowledge(item)}
                                onDelete={() => handleDeleteKnowledge(item.id)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
                            <p className="text-slate-500">Bilgi kaynağı eklenmemiş.</p>
                        </div>
                    )}
                </div>
            </div>
             <AddEditKnowledgeModal 
                isOpen={isKnowledgeModalOpen}
                onClose={() => { setIsKnowledgeModalOpen(false); setEditingKnowledgeItem(null); }}
                onSave={handleSaveKnowledge}
                knowledgeItem={editingKnowledgeItem}
            />
            <CreateTemplateModal 
                isOpen={isTemplateModalOpen}
                onClose={() => setIsTemplateModalOpen(false)}
                onSave={handleSaveTemplate}
                templateToEdit={editingTemplate}
            />
        </div>
    );
};

export default AgentTrainingTab;