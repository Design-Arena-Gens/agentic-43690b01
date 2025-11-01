'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'm a demo ChatGPT interface. I can help you with various tasks!",
        "That's an interesting question. In a real implementation, this would connect to an AI API.",
        "I understand. This is a demonstration of a ChatGPT-like interface built with Next.js.",
        "Great question! This interface mimics the ChatGPT experience with a clean, modern design.",
        "I'm here to help! This is a static demo, but you could connect this to OpenAI's API or other LLM services."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>ChatGPT</h1>
      </div>

      <div style={styles.chatContainer}>
        <div style={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                ...styles.messageWrapper,
                backgroundColor: message.role === 'user' ? '#f7f7f8' : '#ffffff'
              }}
            >
              <div style={styles.messageContent}>
                <div style={styles.avatar}>
                  {message.role === 'user' ? '👤' : '🤖'}
                </div>
                <div style={styles.text}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ ...styles.messageWrapper, backgroundColor: '#ffffff' }}>
              <div style={styles.messageContent}>
                <div style={styles.avatar}>🤖</div>
                <div style={styles.text}>
                  <div style={styles.loadingDots}>
                    <span>.</span><span>.</span><span>.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Send a message..."
              style={styles.input}
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              style={{
                ...styles.button,
                opacity: !input.trim() || isLoading ? 0.5 : 1,
                cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              ↑
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#ffffff',
  },
  header: {
    padding: '16px',
    borderBottom: '1px solid #e5e5e5',
    backgroundColor: '#ffffff',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
    textAlign: 'center',
  },
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
  messageWrapper: {
    padding: '24px 0',
    borderBottom: '1px solid #e5e5e5',
  },
  messageContent: {
    display: 'flex',
    gap: '16px',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px',
  },
  avatar: {
    fontSize: '24px',
    flexShrink: 0,
  },
  text: {
    flex: 1,
    lineHeight: '1.6',
    fontSize: '16px',
    color: '#2d3748',
  },
  inputContainer: {
    padding: '20px',
    borderTop: '1px solid #e5e5e5',
    backgroundColor: '#ffffff',
  },
  form: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '12px',
    resize: 'none',
    fontFamily: 'inherit',
    outline: 'none',
    maxHeight: '200px',
  },
  button: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#10a37f',
    color: '#ffffff',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  loadingDots: {
    display: 'flex',
    gap: '4px',
  },
};
