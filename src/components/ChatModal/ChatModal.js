import styles from './ChatModal.module.css';
import ChatDisplay from './ChatDisplay/ChatDisplay';
import ChatForm from './ChatForm/ChatForm';
import ErrorToast from '../ErrorToast/ErrorToast';
import useRateLimit from '@hooks/useRateLimit';
import useSanitization from '@hooks/useSanitization';
import useChatRequest from '@hooks/useChatRequest';

import { MISTRAL_RATE_LIMIT } from '@/lib/constants';
import { IconX } from '@/lib/icon';
import { useEffect, useState } from 'react';



export default function ChatModal({ onClose }) {
  const [isNew, setIsNew] = useState(true);
  const [isRateLimited,  activateRateLimit] = useRateLimit();
  const [pending, result, executeSanitization] = useSanitization();
  const [isPending, response, executePostFetch] = useChatRequest();
  const [userMessage, setUserMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const { timeframe } = MISTRAL_RATE_LIMIT[0];

  useEffect(() =>{
    if(!pending && result?.data && !result?.error){
      if(result?.data.length > 0){
        setUserMessage(result?.data);
        console.log("executeSanitization return message :", result?.data);
        executePostFetch(result?.data);
      }
    }
    if(!pending && result?.error){
      setUserMessage('');
      console.error(result?.error);
    }
  }, [pending]);

  useEffect(() =>{
    if(!isPending){
      if(response.error === 403){
        activateRateLimit();
        console.error(response.error);
      }
      else if (!response.error && response?.aiMessage){
        if(response?.aiMessage.length > 0){
          setAiMessage(JSON.parse(response?.aiMessage));
          console.log("executePostFetch return message :", JSON.parse(response?.aiMessage));
        }
      }
    }
  }, [isPending]);

  const addNewRequest = (formData) => {
    setIsNew(false);
    const message = formData.get('message');
    console.log("ChatModal input message :", message);
    executeSanitization(message);
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.ChatModal} onClick={(e) => e.stopPropagation()}>
          <section className={styles.ChatModal__header}>
            <nav>
              <button
                onClick={onClose}
              >Fermer<span><IconX /></span></button></nav>
            {isNew && <h1>Posez vos questions sur votre programme, <br />vos performances ou vos objectifs </h1>}
            {isRateLimited.state && <ErrorToast message={`Rate Limit reach please wait ... ${timeframe/1000}s`}/>}
          </section>
          <section className={styles.ChatModal__display}>
            <ChatDisplay userMessage={userMessage} aiMessage={aiMessage} isPending={isPending} />
          </section>
          <section className={styles.ChatModal__form}>
            <ChatForm isPending={isPending} addNewRequest={addNewRequest}/>
            <div className={styles.ChatModal__form_suggested}></div>
          </section>
        </div>
      </div>
    </>
  )
}