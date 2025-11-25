// Tip tanımlamaları
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

// PHP API'nizin bulunduğu yol. React build alıp aynı sunucuya atacağınız için relative path kullanıyoruz.
// "api" klasörünü public_html içine oluşturduğunuzu varsayıyoruz.
const API_URL = '/api';

const handleResponse = async (response: Response) => {
    const text = await response.text();
    try {
        const data = JSON.parse(text);
        if (!response.ok) {
            throw new Error(data.message || 'API Hatası');
        }
        return data;
    } catch (e) {
        console.error("JSON Parse Error:", text);
        throw new Error('Sunucu yanıtı geçersiz.');
    }
};

const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length > 1) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

// --- AUTH API ---

export const login = async (email: string, pass: string): Promise<User> => {
    const response = await fetch(`${API_URL}/auth.php?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
    });
    return handleResponse(response);
};

export const register = async (name: string, email: string, pass: string): Promise<User> => {
    const response = await fetch(`${API_URL}/auth.php?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name, 
            email, 
            password: pass,
            initials: getInitials(name)
        }),
    });
    return handleResponse(response);
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<User> => {
    // PHP tarafında tam bir user update endpoint'i api.php içine eklenebilir.
    // Şimdilik simüle ediyoruz veya auth.php'ye ekleyebilirsiniz.
    // Gerçekte backend'den güncel user'ı çekmelisiniz.
    return { ...updates } as User; 
};

// --- AGENT API ---

export const getAgents = async (userId: string): Promise<Agent[]> => {
    const response = await fetch(`${API_URL}/api.php?resource=agents&userId=${userId}`);
    return handleResponse(response);
};

export const createAgent = async (userId: string, data: { name: string; phone: string }): Promise<Agent> => {
    const response = await fetch(`${API_URL}/api.php?resource=agents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId,
            name: data.name,
            phone: data.phone,
            status: data.phone ? 'active' : 'inactive',
            template: 'Genel',
            systemPrompt: 'Sen genel amaçlı bir asistansın...'
        }),
    });
    return handleResponse(response);
};

export const updateAgent = async (userId: string, updatedAgent: Agent): Promise<Agent> => {
    const response = await fetch(`${API_URL}/api.php?resource=agents&id=${updatedAgent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAgent),
    });
    return handleResponse(response);
};

export const deleteAgent = async (userId: string, agentId: string): Promise<void> => {
    await fetch(`${API_URL}/api.php?resource=agents&id=${agentId}`, {
        method: 'DELETE',
    });
};

// --- TEMPLATE API ---

export const getTemplates = async (userId: string): Promise<Template[]> => {
    const response = await fetch(`${API_URL}/api.php?resource=templates&userId=${userId}`);
    return handleResponse(response);
};

export const createTemplate = async (userId: string, template: Template): Promise<Template> => {
    const response = await fetch(`${API_URL}/api.php?resource=templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...template }),
    });
    return handleResponse(response);
};

export const updateTemplate = async (userId: string, originalName: string, newTemplate: Template): Promise<Template> => {
    // Basitlik adına PHP tarafında update endpoint'i tam yazılmadıysa create gibi davranabilir
    // veya api.php'ye template update case'i eklenebilir.
    return newTemplate;
};

export const deleteTemplate = async (userId: string, templateName: string): Promise<void> => {
    // api.php'de template delete case'i eklenebilir.
};


// --- PAYTR API ---

export const getPaytrToken = async (userId: string, plan: string, price: number): Promise<{status: string, token: string, reason?: string}> => {
    const response = await fetch(`${API_URL}/paytr_token.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, plan, price }),
    });
    return handleResponse(response);
};
