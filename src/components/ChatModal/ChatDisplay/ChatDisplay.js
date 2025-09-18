import { useEffect } from 'react';
import { useChatBuffer } from '@hooks/useChatBuffer';
import { AiAgentCoin } from '@/lib/icon';

import Markdown from 'react-markdown'
import LoadingDot from '@/components/LoadingDot/LoadingDot';
import styles from './ChatDisplay.module.css';

function AiInMarkDown({ message }) {
  return <>
  <Markdown>{message}</Markdown>
  </>
}

export default function ChatDisplay({ userMessage, aiMessage, isPending }) {
  const [messages, addUserMessage, addAiMessage] = useChatBuffer(4);
  
  useEffect(() => {
    if (userMessage) addUserMessage(userMessage);
  }, [userMessage]);

  useEffect(() => {
    if (aiMessage) addAiMessage(aiMessage);
    console.log("messages dans chatbuffer : ", messages);
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
                {<div className={styles.AiAgentCoin}><AiAgentCoin /></div>}
                <div className={styles.chat__ai_bubble}>
                  {<span>Coach AI</span>}
                  {<div className={styles.chat__ai_bubble_message}><AiInMarkDown message={message.text}/></div>}
                </div>
              </>
            )
          }
        </div>
      ))}
      { isPending && (
          <div className={ styles.chat__ai}>
                  <div className={styles.AiAgentCoin}><AiAgentCoin /></div>
                  <div className={styles.chat__ai_bubble}>
                    <LoadingDot />
                    </div>
          </div>)
      }
    </div>
  );
}