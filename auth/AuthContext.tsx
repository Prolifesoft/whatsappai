import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as api from '../api/mockApi';
// FIX: Import types from mockApi.tsx to break circular dependency.
import type { User, Agent, Template, KnowledgeItem, UserPlan } from '../api/mockApi';

interface AuthContextType {
  user: User | null;
  agents: Agent[];
  customTemplates: Template[];
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  upgradePlan: (newPlan: UserPlan) => Promise<void>;
  addTemplate: (template: Template) => Promise<void>;
  updateTemplate: (originalName: string, newTemplate: Template) => Promise<void>;
  deleteTemplate: (templateName: string) => Promise<void>;
  addAgent: (data: { name: string; phone: string }) => Promise<void>;
  updateAgent: (updatedAgent: Agent) => Promise<void>;
  deleteAgent: (agentId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [customTemplates, setCustomTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  const syncDataForUser = async (userData: User) => {
    try {
      const [userAgents, userTemplates] = await Promise.all([
        api.getAgents(userData.id),
        api.getTemplates(userData.id)
      ]);
      setAgents(userAgents);
      setCustomTemplates(userTemplates);
      setUser(userData);
    } catch (error) {
      console.error("Failed to sync user data:", error);
      logout(); // Log out if data sync fails
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          await syncDataForUser(userData);
        }
      } catch (error) {
        console.error("Failed to parse from localStorage", error);
        localStorage.removeItem('user');
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);
  
  const login = async (email: string, pass: string) => {
    const userData = await api.login(email, pass);
    localStorage.setItem('user', JSON.stringify(userData));
    await syncDataForUser(userData);
  };

  const register = async (name: string, email: string, pass: string) => {
    const newUser = await api.register(name, email, pass);
    localStorage.setItem('user', JSON.stringify(newUser));
    await syncDataForUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setAgents([]);
    setCustomTemplates([]);
  };

  const upgradePlan = async (newPlan: UserPlan) => {
    if (user) {
      const updatedUser = await api.updateUser(user.id, { plan: newPlan });
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const addTemplate = async (template: Template) => {
    if (user) {
      const newTemplate = await api.createTemplate(user.id, template);
      setCustomTemplates(prev => [...prev, newTemplate]);
    }
  };

  const updateTemplate = async (originalName: string, newTemplate: Template) => {
    if (user) {
      const updated = await api.updateTemplate(user.id, originalName, newTemplate);
      setCustomTemplates(prev => prev.map(t => t.name === originalName ? updated : t));
    }
  };

  const deleteTemplate = async (templateName: string) => {
    if (user) {
      await api.deleteTemplate(user.id, templateName);
      setCustomTemplates(prev => prev.filter(t => t.name !== templateName));
    }
  };

  const addAgent = async (data: { name: string; phone: string }) => {
    if (user) {
      const newAgent = await api.createAgent(user.id, data);
      setAgents(prev => [...prev, newAgent]);
    }
  };

  const updateAgent = async (updatedAgent: Agent) => {
    if (user) {
      const result = await api.updateAgent(user.id, updatedAgent);
      setAgents(prev => prev.map(a => a.id === result.id ? result : a));
    }
  };

  const deleteAgent = async (agentId: string) => {
    if (user) {
      await api.deleteAgent(user.id, agentId);
      setAgents(prev => prev.filter(a => a.id !== agentId));
    }
  };

  const value = { 
      user, 
      agents,
      customTemplates,
      loading, 
      login, 
      register, 
      logout, 
      upgradePlan, 
      addTemplate, 
      updateTemplate, 
      deleteTemplate,
      addAgent,
      updateAgent,
      deleteAgent
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
