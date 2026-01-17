import { useState, useRef, useEffect } from 'react';
import type { Message } from '../types/chat';
import { sendMessage } from '../services/api';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

const SAMPLE_QUESTIONS = [
  'What is CRISPR?',
  'What is Genetic Sequencing?',
  'What is the criteria for diagnosing acute pancreatitis?',
  'Spindle fibers pull what apart in anaphase?',
  'What are recent trends in molecular biology research?',
  'Following are included in criteria for diagnosing acute pancreatitis except\nOptions: A. Typical abdominal pain in the epigastrium, B. Three fold elevation in enzymes (amylase), C. Cullen sign, D. Imaging findings suggestive of pancreatitis',
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>();
  const [error, setError] = useState<string>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleClear = () => {
    setMessages([]);
    setConversationId(undefined);
    setError(undefined);
  };

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await sendMessage({
        message: content,
        conversation_id: conversationId,
      });

      setConversationId(response.conversation_id);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex chat-container">
      {/* Left Sidebar */}
      <aside className="sidebar bg-light border-end d-flex flex-column">
        <div className="p-3 border-bottom">
          <h6 className="mb-0 text-secondary fw-semibold">Sample Questions</h6>
        </div>
        <div className="flex-grow-1 overflow-auto p-3">
          <div className="d-flex flex-column gap-2">
            {SAMPLE_QUESTIONS.map((question) => (
              <button
                key={question}
                onClick={() => handleSend(question)}
                disabled={isLoading}
                className="btn btn-outline-success question-btn"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="chat-main d-flex flex-column">
        <header className="header-gradient text-white px-4 py-3 border-bottom d-flex justify-content-between align-items-center">
          <div>
            <h1 className="h4 mb-1 fw-bold">Genetics Assistant AI</h1>
            <p className="mb-0 small opacity-75">Ask questions about genetics, DNA, and molecular biology</p>
            <p className="mb-0 opacity-75" style={{ fontSize: '0.7em' }}>(Be patient, it may take up to 3 mins to respond)</p>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="btn btn-outline-light btn-sm"
              disabled={isLoading}
            >
              Clear Chat
            </button>
          )}
        </header>

        <main className="messages-area p-4">
          {messages.length === 0 ? (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center">
              <div className="mb-3" style={{ fontSize: '4rem' }}>🧬</div>
              <h2 className="h5 fw-semibold text-dark">Welcome to Genetics Assistant</h2>
              <p className="text-muted" style={{ maxWidth: '400px' }}>
                Ask me anything about genetics, CRISPR, DNA sequencing, gene expression, or molecular biology.
              </p>
            </div>
          ) : (
            <div className="mx-auto" style={{ maxWidth: '768px' }}>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="d-flex justify-content-start mb-3">
                  <div className="message-bubble message-assistant px-3 py-2">
                    <div className="d-flex gap-1">
                      <span className="loading-dot"></span>
                      <span className="loading-dot"></span>
                      <span className="loading-dot"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        {error && (
          <div className="mx-4 mb-3">
            <div className="alert alert-danger py-2 mb-0" role="alert">
              {error}
            </div>
          </div>
        )}

        <footer className="border-top bg-light p-3">
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </footer>
      </div>
    </div>
  );
}
