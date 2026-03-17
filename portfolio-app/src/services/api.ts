import type { PortfolioProfile, ContactMessage } from '@/types/Types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!response.ok) throw new Error(`API Error: ${response.statusText} (${response.status}`);
    
    if (response.status === 204 || response.status === 202) return {} as T;
    
    return response.json();
}

export const portfolioService = {
    getProfile: () => apiFetch<PortfolioProfile>('/profile'),
    transmitMessage: (payload: ContactMessage) => apiFetch<void>('/transmit', {
        method: 'POST',
        body: JSON.stringify(payload),
    }),
};