import { useState } from 'react';
import { string } from 'zod';

/**
 * Brief: Hook personnalisé pour gérer un buffer de messages de chat avec limitation de taille
 * 
 * @param {number} maxSize - Taille maximale du buffer de messages (défaut: 4)
 * @returns {Array} Tableau contenant [messages, addUserMessage, addAiMessage] pour gérer les messages
 */
export function useChatBuffer(maxSize = 4) {
  const [messages, setMessages] = useState([]);

  /**
   * Brief: Ajoute un message utilisateur au buffer de chat
   * 
   * @param {string} text - Texte du message utilisateur à ajouter
   */
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

  /**
   * Brief: Ajoute un message de l'IA au buffer de chat
   * 
   * @param {string} text - Texte du message de l'IA à ajouter
   */
  const addAiMessage = (text) => {
    console.log('addAiMessage typeof(text) :', typeof(text));
    if (typeof(text) !== 'string') return;
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