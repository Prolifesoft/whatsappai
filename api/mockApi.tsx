// FIX: Moved type definitions here from AuthContext.tsx to break circular dependency.
export type UserPlan = 'Başlangıç' | 'Profesyonel' | 'Kurumsal';

export interface Template {
    name: string;
    prompt: string;
    isCustom?: boolean;
}

export interface KnowledgeItem {
    id: string;
    type: 'text' | 'pdf' | 'sitemap';
    title: string;
    content: string;
}

export interface Agent {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    template: string;
    phone: string | null;
    systemPrompt: string;
    knowledgeBase: KnowledgeItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  plan: UserPlan;
  usage: {
    messages: {
      sent: number;
      limit: number;
    };
  };
}


// --- DATABASE SIMULATION ---
const DB_KEY = 'agentai_db';

interface Database {
  users: User[];
  agents: { [userId: string]: Agent[] };
  templates: { [userId: string]: Template[] };
}

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length > 1) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const MOCK_AGENTS: Agent[] = [
    {
        id: 'agent-1', name: 'Satış Destek Asistanı', status: 'active', template: 'E-Ticaret', phone: '+90 555 123 4567',
        systemPrompt: 'Sen bir e-ticaret sitesi için çalışan, arkadaş canlısı ve yardımsever bir satış asistanısın. Müşterilerin ürünler hakkında sorduğu soruları cevapla, sipariş durumunu kontrol et ve onlara yardımcı ol.',
        knowledgeBase: [ { id: 'kb-1', type: 'text', title: 'İade Politikası', content: 'Ürünleri 14 gün içinde koşulsuz iade edebilirsiniz.' } ],
    },
    {
        id: 'agent-2', name: 'Klinik Randevu Botu', status: 'inactive', template: 'Sağlık', phone: null,
        systemPrompt: 'Sen bir tıp merkezi için randevu planlama asistanısın...', knowledgeBase: [],
    }
];

const MOCK_TEMPLATES: Template[] = [
    { name: 'Özel', prompt: 'Sen, sahibi tarafından özelleştirilecek bir asistansın.', isCustom: true },
];


const initializeDb = (): Database => {
  const defaultUser: User = {
    id: 'user-123', name: 'Demo Kullanıcı', email: 'demo@agentai.com', initials: 'DK', plan: 'Profesyonel',
    usage: { messages: { sent: 7850, limit: 10000 } },
  };

  const db: Database = {
    users: [defaultUser],
    agents: { [defaultUser.id]: MOCK_AGENTS },
    templates: { [defaultUser.id]: MOCK_TEMPLATES },
  };
  localStorage.setItem(DB_KEY, JSON.stringify(db));
  return db;
};

const _getDb = (): Database => {
  const dbString = localStorage.getItem(DB_KEY);
  return dbString ? JSON.parse(dbString) : initializeDb();
};

const _saveDb = (db: Database) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// --- MOCK API FUNCTIONS ---

// FIX: Corrected generic function syntax for simulateNetwork.
const simulateNetwork = <T,>(callback: () => T): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = callback();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, 500); // 500ms delay
  });
};

// --- User API ---
// FIX: Corrected function signature and logic.
export const login = (email: string, pass: string): Promise<User> => simulateNetwork(() => {
  const db = _getDb();
  const user = db.users.find(u => u.email === email); // In real life, check password hash
  if (user && pass) { // Simple pass check for mock
    return user;
  }
  throw new Error('Invalid credentials');
});

// FIX: Corrected function signature and implementation.
export const register = (name: string, email: string, pass: string): Promise<User> => simulateNetwork(() => {
  const db = _getDb();
  if (db.users.some(u => u.email === email)) {
    throw new Error('User already exists');
  }
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    initials: getInitials(name),
    plan: 'Başlangıç',
    usage: { messages: { sent: 0, limit: 2500 } },
  };
  db.users.push(newUser);
  db.agents[newUser.id] = [];
  db.templates[newUser.id] = MOCK_TEMPLATES;
  _saveDb(db);
  return newUser;
});

// FIX: Corrected function signature and implementation with trailing comma for JSX parser hint.
export const updateUser = (userId: string, updates: Partial<User>): Promise<User> => simulateNetwork(() => {
    const db = _getDb();
    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error('User not found');
    
    if (updates.plan) {
        const newLimit = updates.plan === 'Profesyonel' ? 10000 : updates.plan === 'Kurumsal' ? Infinity : 2500;
        db.users[userIndex].plan = updates.plan;
        db.users[userIndex].usage.limit = newLimit;
    }
    
    const updatedUser = { ...db.users[userIndex], ...updates, };
    db.users[userIndex] = updatedUser;
    
    _saveDb(db);
    return updatedUser;
});

// --- Agent API ---
// FIX: Corrected function signature.
export const getAgents = (userId: string): Promise<Agent[]> => simulateNetwork(() => {
  const db = _getDb();
  return db.agents[userId] || [];
});

// FIX: Corrected function signature and implementation.
export const createAgent = (userId: string, data: { name: string; phone: string }): Promise<Agent> => simulateNetwork(() => {
  const db = _getDb();
  const newAgent: Agent = {
    id: `agent-${Date.now()}`,
    name: data.name,
    status: data.phone ? 'active' : 'inactive',
    template: 'Genel',
    phone: data.phone || null,
    systemPrompt: 'Sen genel amaçlı bir asistansın...',
    knowledgeBase: [],
  };
  if (!db.agents[userId]) db.agents[userId] = [];
  db.agents[userId].push(newAgent);
  _saveDb(db);
  return newAgent;
});

// FIX: Corrected function signature.
export const updateAgent = (userId: string, updatedAgent: Agent): Promise<Agent> => simulateNetwork(() => {
  const db = _getDb();
  const userAgents = db.agents[userId];
  if (!userAgents) throw new Error('User agents not found');
  const agentIndex = userAgents.findIndex(a => a.id === updatedAgent.id);
  if (agentIndex === -1) throw new Error('Agent not found');
  userAgents[agentIndex] = updatedAgent;
  _saveDb(db);
  return updatedAgent;
});

// FIX: Corrected function signature and implementation.
export const deleteAgent = (userId: string, agentId: string): Promise<void> => simulateNetwork(() => {
  const db = _getDb();
  if (db.agents[userId]) {
    db.agents[userId] = db.agents[userId].filter(a => a.id !== agentId);
    _saveDb(db);
  }
});

// --- Template API ---
// FIX: Corrected function signature.
export const getTemplates = (userId: string): Promise<Template[]> => simulateNetwork(() => {
  const db = _getDb();
  return db.templates[userId] || [];
});

// FIX: Corrected function signature and implementation with trailing comma for JSX parser hint.
export const createTemplate = (userId: string, template: Template): Promise<Template> => simulateNetwork(() => {
  const db = _getDb();
  const newTemplate = { ...template, isCustom: true, };
  if (!db.templates[userId]) db.templates[userId] = [];
  db.templates[userId].push(newTemplate);
  _saveDb(db);
  return newTemplate;
});

// FIX: Corrected function signature and implementation with trailing comma for JSX parser hint.
export const updateTemplate = (userId: string, originalName: string, newTemplate: Template): Promise<Template> => simulateNetwork(() => {
  const db = _getDb();
  const userTemplates = db.templates[userId];
  if (!userTemplates) throw new Error('User templates not found');
  const templateIndex = userTemplates.findIndex(t => t.name === originalName);
  if (templateIndex === -1) throw new Error('Template not found');
  userTemplates[templateIndex] = { ...newTemplate, isCustom: true, };
  _saveDb(db);
  return newTemplate;
});

// FIX: Corrected function signature and implementation.
export const deleteTemplate = (userId: string, templateName: string): Promise<void> => simulateNetwork(() => {
  const db = _getDb();
  if (db.templates[userId]) {
    db.templates[userId] = db.templates[userId].filter(t => t.name !== templateName);
    _saveDb(db);
  }
});
