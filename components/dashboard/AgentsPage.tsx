import React, { useState } from 'react';
import { Agent } from '../../auth/AuthContext';
import CreateAgentModal from './CreateAgentModal';

interface AgentsPageProps {
    agents: Agent[];
    onSelectAgent: (agent: Agent) => void;
    onAddAgent: (data: { name: string; phone: string }) => void;
}

const AgentCard: React.FC<{ agent: Agent, onSelect: () => void }> = ({ agent, onSelect }) => (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={onSelect}>
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold text-slate-800">{agent.name}</h3>
                <p className="text-sm text-slate-500 mt-1">Şablon: {agent.template}</p>
            </div>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${agent.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>
                {agent.status === 'active' ? 'Aktif' : 'Pasif'}
            </span>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${agent.phone ? 'text-brand-green' : 'text-slate-400'}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
             </svg>
            <p className="ml-2 text-sm text-slate-600">{agent.phone ? agent.phone : 'Cihaz bağlı değil'}</p>
        </div>
    </div>
);


const AgentsPage: React.FC<AgentsPageProps> = ({ agents, onSelectAgent, onAddAgent }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    return (
        <>
            <div>
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Agent Yönetimi</h1>
                        <p className="mt-1 text-slate-600">Yapay zeka asistanlarınızı oluşturun ve yönetin.</p>
                    </div>
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-brand-dark hover:bg-brand-teal text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Yeni Agent Oluştur
                    </button>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map(agent => (
                        <AgentCard key={agent.id} agent={agent} onSelect={() => onSelectAgent(agent)} />
                    ))}
                </div>
            </div>

            <CreateAgentModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={onAddAgent}
            />
        </>
    );
};

export default AgentsPage;