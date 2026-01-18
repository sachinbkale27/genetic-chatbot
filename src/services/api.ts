import type { ChatRequest, ChatResponse } from '../types/chat';

const API_KEY = import.meta.env.VITE_API_KEY || '';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Failed to send message');
  }

  return response.json();
}
