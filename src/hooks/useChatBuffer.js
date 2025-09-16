import { useState } from 'react';

export function useChatBuffer(maxSize = 4) {
  const [messages, setMessages] = useState([]);

  const addUserMessage = (text) => {
    if (!text?.trim()) return;
    
    const message = {
      id: Date.now(), 
      type: 'user',
      text: text.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, message].slice(-maxSize));
  };

  const addAiMessage = (text) => {
    if (!text?.trim()) return;
    
    const message = {
      id: crypto.randomUUID(),
      type: 'ai', 
      text: text.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, message].slice(-maxSize));
  };

  return [messages, addUserMessage, addAiMessage];
}