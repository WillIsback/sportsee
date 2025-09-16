import { useEffect } from 'react';
import { useChatBuffer } from '@hooks/useChatBuffer';
import styles from './ChatDisplay.module.css';

export default function ChatDisplay({ userMessage, aiMessage }) {
  const [messages, addUserMessage, addAiMessage] = useChatBuffer(4);
  const isEmpty = (message) => !message?.trim();
  const hasUserMessage = !isEmpty(userMessage);
  const hasAiMessage = !isEmpty(aiMessage);
  
  useEffect(() => {
    if (userMessage) addUserMessage(userMessage);
  }, [userMessage]);

  useEffect(() => {
    if (aiMessage) addAiMessage(aiMessage);
  }, [aiMessage]);


  return (
    <div className={styles.chat}>
      {messages.map(message => (
        <div key={message.id} className={message.type === 'user' 
          ? 
          styles.chat__user 
        : 
          styles.chat__ai}
        >
          {message.type === 'user'
            ? (
                <div className={styles.chat__user_bubble}>
                  {<p>{message.text}</p>}
                </div>
            )
            : (
              <>
                {<span>Coach AI</span>}
                <div className={styles.chat__ai_bubble}>
                  {<p>{message.text}</p>}
                </div>
              </>
            )
          }
        </div>
      ))}
    </div>
  );
}