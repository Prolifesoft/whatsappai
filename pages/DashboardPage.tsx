import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import DashboardHome from '../components/dashboard/DashboardHome';
import BillingPage from '../components/dashboard/BillingPage';
import AccountSettings from '../components/dashboard/AccountSettings';
import AgentsPage from '../components/dashboard/AgentsPage';
import AgentDetailPage from '../components/dashboard/AgentDetailPage';
import { Agent } from '../auth/AuthContext';

const DashboardPage: React.FC = () => {
    const { 
        user, 
        logout,
        agents, 
        customTemplates,
        addAgent,
        updateAgent,
        deleteAgent,
        addTemplate,
        updateTemplate,
        deleteTemplate
    } = useAuth();
    
    const [currentView, setCurrentView] = useState('anasayfa');
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

    if (!user) {
        return null; 
    }

    const handleSelectAgent = (agent: Agent) => {
        setSelectedAgent(agent);
        setCurrentView('agent-detail');
    };
    
    const handleBackToAgents = () => {
        setSelectedAgent(null);
        setCurrentView('agentlar');
    };
    
    const handleDeleteAndGoBack = async (agentId: string) => {
        if (window.confirm("Bu agent'ı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
            await deleteAgent(agentId);
            handleBackToAgents();
        }
    };
    
    // This function ensures the selected agent state is also updated after an action
    const handleAgentUpdate = async (updatedAgent: Agent) => {
        await updateAgent(updatedAgent);
        setSelectedAgent(updatedAgent);
    }
    
    const views: { [key: string]: { title: string; component: React.ReactNode } } = {
        'anasayfa': { title: 'Genel Bakış', component: <DashboardHome user={user} onNavigate={setCurrentView} /> },
        'agentlar': { title: 'Agent\'lar', component: <AgentsPage agents={agents} onSelectAgent={handleSelectAgent} onAddAgent={addAgent} /> },
        'agent-detail': { title: 'Agent Detayı', component: selectedAgent ? 
            <AgentDetailPage 
                key={selectedAgent.id} // Add key to force re-render on agent change
                agent={selectedAgent} 
                onBack={handleBackToAgents} 
                onUpdateAgent={handleAgentUpdate} 
                onDeleteAgent={handleDeleteAndGoBack} 
                customTemplates={customTemplates} 
                onAddTemplate={addTemplate} 
                onUpdateTemplate={updateTemplate} 
                onDeleteTemplate={deleteTemplate} 
            /> : <div>Lütfen bir agent seçin.</div> },
        'cihaz': { title: 'Cihaz Yönetimi', component: <div>Cihaz Yönetimi (Tüm Agent'lar)</div> },
        'faturalandirma': { title: 'Faturalandırma', component: <BillingPage user={user} /> },
        'ayarlar': { title: 'Hesap Ayarları', component: <AccountSettings /> },
    };
    
    const navItems = [
        { id: 'anasayfa', label: 'Genel Bakış', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
        { id: 'agentlar', label: 'Agent\'lar', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg> },
        { id: 'cihaz', label: 'Cihaz Yönetimi', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" /></svg> },
        { id: 'faturalandirma', label: 'Faturalandırma', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg> },
        { id: 'ayarlar', label: 'Hesap Ayarları', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg> },
    ];

    return (
        <div className="flex h-screen bg-slate-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-[#111827] text-slate-300 flex flex-col flex-shrink-0">
                <div className="h-20 flex items-center justify-center border-b border-slate-800">
                     <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-brand-green"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.75.45 3.41 1.27 4.9L2 22l5.25-1.38c1.44.78 3.03 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.83S17.5 2 12.04 2zM9.53 16.23h-.11c-.57 0-1.25-.22-2.1-.66L7 15.38l-1.33.7c-.22.12-.46.06-.61-.12s-.16-.41-.04-.63l.89-1.63c-.45-.7-.7-1.48-.7-2.31 0-2.67 2.16-4.84 4.84-4.84.62 0 1.21.12 1.74.33l.4.15 1.5-1.5c.2-.2.51-.2.71 0s.2.51 0 .71l-1.5 1.5.15.4c.21.53.33 1.12.33 1.74.01 2.67-2.15 4.84-4.83 4.84zm1.09-3.32c-.17-.09-.37-.14-.58-.14-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.21 0 .41-.05.58-.14l2.17.65c-.39.51-.94.85-1.56.97v.75c0 .28.22.5.5.5s.5-.22.5-.5v-.75c1.4-.29 2.5-1.5 2.5-2.91 0-1.07-.57-2.01-1.42-2.52l-2.19.65z"/></svg>
                        <span className="font-bold text-xl text-white">AgentAI</span>
                    </div>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setSelectedAgent(null); setCurrentView(item.id); }}
                            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group ${currentView === item.id || (currentView === 'agent-detail' && item.id === 'agentlar') ? 'bg-emerald-600/20 text-emerald-300' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-800">
                     <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white">
                            {user.initials}
                        </div>
                        <div className="ml-3">
                             <p className="text-sm font-semibold text-white">{user.name}</p>
                             <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                     </div>
                     <button onClick={logout} className="w-full flex items-center mt-4 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
                        Çıkış Yap
                    </button>
                </div>
            </aside>
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                     {views[currentView].component}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
