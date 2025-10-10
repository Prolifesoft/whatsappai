import React, { useState, useEffect } from 'react';
import { Agent } from '../../auth/AuthContext';

interface AgentSettingsTabProps {
    agent: Agent;
    onUpdateSettings: (agentId: string, newName: string) => void;
    onDelete: (agentId: string) => void;
}

const AgentSettingsTab: React.FC<AgentSettingsTabProps> = ({ agent, onUpdateSettings, onDelete }) => {
    const [agentName, setAgentName] = useState(agent.name);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');

    useEffect(() => {
        setAgentName(agent.name);
    }, [agent]);

    const handleNameChange = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateSettings(agent.id, agentName);
        alert('Agent adı güncellendi.');
    };
    
    const handleDelete = () => {
        if (deleteConfirmation === agent.name) {
            onDelete(agent.id);
        } else {
            alert('Lütfen silme işlemini onaylamak için agent adını doğru yazın.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold text-slate-800 border-b pb-4 mb-4">Genel Ayarlar</h2>
                <form onSubmit={handleNameChange} className="space-y-4">
                    <div>
                        <label htmlFor="agentName" className="block text-sm font-medium text-slate-700">Agent Adı</label>
                        <input
                            type="text"
                            id="agentName"
                            value={agentName}
                            onChange={(e) => setAgentName(e.target.value)}
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-dark focus:ring-brand-dark sm:text-sm p-3"
                        />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="bg-brand-dark hover:bg-brand-teal text-white font-bold py-2 px-6 rounded-lg transition-colors">
                            Değişiklikleri Kaydet
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-2 border-red-200">
                 <h2 className="text-xl font-bold text-red-700">Tehlikeli Alan</h2>
                 <p className="mt-1 text-sm text-slate-500 mb-4">Bu işlemler geri alınamaz. Lütfen dikkatli olun.</p>
                
                <div className="mt-4 pt-4 border-t border-red-200">
                    <h3 className="font-semibold text-slate-800">Agent'ı Sil</h3>
                    <p className="text-sm text-slate-600 mt-1">
                        Bu agent'ı ve ilişkili tüm verileri kalıcı olarak silmek için lütfen agent'ın adını (<span className="font-bold">{agent.name}</span>) aşağıdaki alana yazın.
                    </p>
                    <div className="flex items-center space-x-3 mt-3">
                        <input
                            type="text"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            placeholder="Agent adını yazın"
                            className="flex-grow block w-full rounded-md border-slate-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-2"
                        />
                        <button
                            onClick={handleDelete}
                            disabled={deleteConfirmation !== agent.name}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
                        >
                            Agent'ı Sil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentSettingsTab;