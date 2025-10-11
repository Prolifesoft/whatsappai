import type { EvolutionInstance } from './mockApi';

export interface InstanceCreationPayload {
  instanceName: string;
  token: string;
  number: string;
  channel?: 'baileys';
  qrcode?: boolean;
}

export interface ManagerRequestOptions {
  managerBaseUrl?: string;
}

export interface EvolutionRequestOptions {
  apiBaseUrl?: string;
  masterKey?: string;
  qrcode?: boolean;
}

const DEFAULT_MANAGER_URL = 'https://serwer.prolifesoft.com/manager';

const readEnv = (key: string): string | undefined => {
  return typeof import.meta !== 'undefined' && import.meta.env ? (import.meta.env as Record<string, string | undefined>)[key] : undefined;
};

const DEFAULT_API_BASE = readEnv('VITE_EVOLUTION_API_URL') || '';
const DEFAULT_MASTER_KEY = readEnv('VITE_EVOLUTION_MASTER_KEY') || '';

const normalizeBaseUrl = (value: string) => value.replace(/\/$/, '');

export const normalizeInstanceName = (name: string): string => {
  if (!name.trim()) {
    return `instance-${Date.now()}`;
  }
  const ascii = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/Ç/g, 'c')
    .replace(/Ğ/g, 'g')
    .replace(/İ/g, 'i')
    .replace(/Ö/g, 'o')
    .replace(/Ş/g, 's')
    .replace(/Ü/g, 'u');

  const slug = ascii
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || `instance-${Date.now()}`;
};

export const generateInstanceToken = (): string => {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return `tok_${crypto.randomUUID().replace(/-/g, '')}`;
    }
  } catch {
    // ignore
  }
  return `tok_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
};

export const createManagerInstance = async (
  payload: InstanceCreationPayload,
  options: ManagerRequestOptions = {}
) => {
  const managerBase = options.managerBaseUrl || readEnv('VITE_EVOLUTION_MANAGER_URL') || DEFAULT_MANAGER_URL;
  if (!managerBase) {
    throw new Error('Manager servis adresi tanımlı değil.');
  }

  const url = `${normalizeBaseUrl(managerBase)}/api/instances`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: payload.instanceName,
      channel: payload.channel ?? 'baileys',
      token: payload.token,
      number: payload.number,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `Manager servisi ${response.status} hatası döndürdü.`);
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const createEvolutionInstance = async (
  payload: InstanceCreationPayload,
  options: EvolutionRequestOptions = {}
) => {
  const apiBaseUrl = options.apiBaseUrl || DEFAULT_API_BASE;
  const masterKey = options.masterKey || DEFAULT_MASTER_KEY;

  if (!apiBaseUrl) {
    throw new Error('Evolution API sunucu adresi tanımlı değil.');
  }
  if (!masterKey) {
    throw new Error('Evolution API master anahtarı gerekli.');
  }

  const url = `${normalizeBaseUrl(apiBaseUrl)}/instance/create`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: masterKey,
    },
    body: JSON.stringify({
      instanceName: payload.instanceName,
      token: payload.token,
      qrcode: options.qrcode ?? payload.qrcode ?? true,
      number: payload.number,
      channel: payload.channel ?? 'baileys',
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(text || `Evolution API ${response.status} hatası döndürdü.`);
  }

  return response.json();
};

export const buildInstanceSnapshot = (
  payload: InstanceCreationPayload,
  managerUrl?: string
): EvolutionInstance => ({
  name: payload.instanceName,
  token: payload.token,
  channel: payload.channel ?? 'baileys',
  number: payload.number,
  managerUrl,
  createdAt: new Date().toISOString(),
});
