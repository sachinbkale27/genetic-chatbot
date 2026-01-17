import type { ChatRequest, ChatResponse } from '../types/chat';

const API_KEY = import.meta.env.VITE_API_KEY || '';

export async function sendMessage(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch('/api/v1/chat', {
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
