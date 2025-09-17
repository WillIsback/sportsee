import styles from './ChatModal.module.css';
import ChatDisplay from './ChatDisplay/ChatDisplay';
import ChatForm from './ChatForm/ChatForm';
import ErrorToast from '../ErrorToast/ErrorToast';
import { IconX } from '@/lib/icon';
import { useState, useTransition, useEffect, useRef } from 'react';
import { sanitizeRequest } from '@/lib/askai.lib';
import { ErrorMessage } from 'app/(user)/api/chat/route';
import { MISTRAL_RATE_LIMIT } from '@/lib/constants';

export default function ChatModal({ onClose }) {
  const [isNew, setIsNew] = useState(true);
  const [isPending, startTransition] = useTransition(false);
  const [userMessage, setUserMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [isRateLimited, setRateLimited] = useState({state:false,timeStamp:0});
  const { timeframe } = MISTRAL_RATE_LIMIT[0];
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, []);   

  const addNewRequest = (formData) => {
    setIsNew(false);
    const message = formData.get('message');
    if(message){
      startTransition(async () => {
        const cleanMess = await sanitizeRequest(message);
        console.log("cleanMess : ", cleanMess);
        setUserMessage(cleanMess);
        try{
          const rep =  await fetch('/api/chat', {
            method: "POST",
            body: JSON.stringify(cleanMess)
            });
            // Gestion des erreurs HTTP
            if (!rep.ok) {
              if(rep.status===403){
                setRateLimited({
                  state: true,
                  timeStamp: Date.now()+timeframe,
                });
                console.log("isRateLimited : ", isRateLimited, "for :", timeframe/1000, 'seconds');
                timeoutIdRef.current = setTimeout(() => {
                  setRateLimited({
                    state: false,
                    timeStamp: 0,
                  });
                }, timeframe);    
              }
              const errorMessages = ErrorMessage(rep.status);
              console.error("[addNewRequest]", errorMessages.dev);
            }
          if(rep.ok){
            const response = await rep.json();
            console.log("addNewRequest response : ", response);
            setAiMessage(response);
          }
        }catch(e){
          console.error("Error : ", e)
        }
      });
    }
    else{
      return "Impossible d’envoyer le message";
    }
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