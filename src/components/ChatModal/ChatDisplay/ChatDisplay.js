import { useEffect, useRef } from 'react';
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
  const scrollableRef  = useRef(null);

  useEffect(() => {
    if (userMessage) addUserMessage(userMessage);
  }, [userMessage]);

  useEffect(() => {
    if (aiMessage)addAiMessage(aiMessage);
  }, [aiMessage]);

  useEffect(() => {
    // Automatically scroll to the latest message when messages update
    if(scrollableRef.current)scrollableRef.current.scrollTo(0, scrollableRef.current.scrollHeight);
  }, [messages]);


  return (
    <section className={styles.chat} ref={scrollableRef}>
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
    </section>
  );
}