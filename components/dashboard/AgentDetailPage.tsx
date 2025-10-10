import React, { useState } from 'react';
import { Agent, KnowledgeItem } from '../../auth/AuthContext';
import { Template } from '../../auth/AuthContext';

// Tab Components
import AgentOverviewTab from './AgentOverviewTab';
import AgentTrainingTab from './AgentTrainingTab';
import AgentIntegrationsTab from './AgentIntegrationsTab';
import AgentSettingsTab from './AgentSettingsTab';

interface AgentDetailPageProps {
    agent: Agent;
    onBack: () => void;
    onUpdateAgent: (updatedAgent: Agent) => void;
    onDeleteAgent: (agentId: string) => void;
    customTemplates: Template[];
    onAddTemplate: (template: Template) => void;
    onUpdateTemplate: (originalName: string, newTemplate: Template) => void;
    onDeleteTemplate: (templateName: string) => void;
}

const AgentDetailPage: React.FC<AgentDetailPageProps> = ({ 
    agent, 
    onBack, 
    onUpdateAgent, 
    onDeleteAgent,
    customTemplates,
    onAddTemplate,
    onUpdateTemplate,
    onDeleteTemplate,
}) => {
    const [activeTab, setActiveTab] = useState('overview');

    const handleUpdateTraining = (agentId: string, prompt: string) => {
        onUpdateAgent({ ...agent, systemPrompt: prompt });
    };

    const handleUpdateKnowledgeBase = (agentId: string, knowledgeBase: KnowledgeItem[]) => {
        onUpdateAgent({ ...agent, knowledgeBase });
    };

    const handleUpdateSettings = (agentId: string, newName: string) => {
        onUpdateAgent({ ...agent, name: newName });
    };

    const handleDisconnect = (agentId: string) => {
        onUpdateAgent({ ...agent, phone: null, status: 'inactive' });
    };
    
    const handleConnect = (agentId: string, phone: string) => {
        onUpdateAgent({ ...agent, phone, status: 'inactive' }); // inactive until confirmed
    };
    
    const handleConfirmConnection = (agentId: string) => {
        onUpdateAgent({ ...agent, status: 'active' });
    };


    const tabs = [
        { id: 'overview', label: 'Genel Bakış' },
        { id: 'training', label: 'Eğitim' },
        { id: 'integrations', label: 'Entegrasyonlar' },
        { id: 'settings', label: 'Ayarlar' },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return <AgentOverviewTab 
                            agent={agent} 
                            onConnect={handleConnect} 
                            onDisconnect={handleDisconnect} 
                            onConfirmConnection={handleConfirmConnection} 
                        />;
            case 'training':
                return <AgentTrainingTab 
                            agent={agent}
                            customTemplates={customTemplates}
                            onAddTemplate={onAddTemplate}
                            onUpdateTemplate={onUpdateTemplate}
                            onDeleteTemplate={onDeleteTemplate}
                            onUpdateTraining={handleUpdateTraining}
                            onUpdateKnowledgeBase={handleUpdateKnowledgeBase}
                        />;
            case 'integrations':
                return <AgentIntegrationsTab />;
            case 'settings':
                return <AgentSettingsTab 
                            agent={agent} 
                            onUpdateSettings={handleUpdateSettings} 
                            onDelete={onDeleteAgent} 
                        />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="text-slate-500 hover:text-slate-800 mr-4 p-2 rounded-full hover:bg-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{agent.name}</h1>
                    <div className="flex items-center mt-1">
                        <span className={`w-2.5 h-2.5 rounded-full mr-2 ${agent.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                        <p className="text-sm text-slate-600">
                            {agent.status === 'active' ? 'Aktif' : 'Pasif'}
                            {agent.phone && ` - ${agent.phone}`}
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-b border-slate-200 mb-6">
                <nav className="-mb-px flex space-x-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab.id
                                ? 'border-brand-dark text-brand-dark'
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default AgentDetailPage;