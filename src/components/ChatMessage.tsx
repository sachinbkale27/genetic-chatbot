import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`d-flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}>
      <div className={`message-bubble px-3 py-2 ${isUser ? 'message-user' : 'message-assistant'}`}>
        <p className="mb-0 small" style={{ whiteSpace: 'pre-wrap' }}>{message.content}</p>
      </div>
    </div>
  );
}
