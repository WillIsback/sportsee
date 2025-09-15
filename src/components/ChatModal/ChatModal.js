import styles from './ChatModal.module.css';
import ChatDisplay from './ChatDisplay/ChatDisplay';
import ChatForm from './ChatForm/ChatForm';
import { IconX } from '@/lib/icon';
import { useEffect, useState, useTransition } from 'react';
import { sanitizeRequest } from '@/lib/askai.lib';
import { useRouter } from 'next/navigation'

export default function ChatModal({ onClose }) {
  const [isNew, setIsNew] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [userMessage, setUserMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const router = useRouter()

  useEffect(()=>{
    setIsNew(false);
  },[]);

  const addNewRequest = (formData) => {
    const message = formData.get('message');

    if(message){
      const reponse = startTransition(async () => {
        const cleanMess = await sanitizeRequest(message);
        setUserMessage(cleanMess);
        return await fetch('/api/chat', {
        method: "POST",
        body: cleanMess
        });
      });
      setAiMessage(reponse);
    }
    else{
      return "Impossible d’envoyer le message";
    }
  }
  
  return (
    <>
      <div className={styles.ChatModal}>
        <section className={styles.ChatModal__header}>
          <nav>
            <button
              onClick={onClose}
            >Fermer<span><IconX /></span></button></nav>
          {isNew && <h1>Posez vos questions sur votre programme, <br />vos performances ou vos objectifs </h1>}
        </section>
        <section className={styles.ChatModal__display}>
          <ChatDisplay userMessage={userMessage} aiMessage={aiMessage}/>
        </section>
        <section className={styles.ChatModal__form}>
          <ChatForm isPending={isPending} addNewRequest={addNewRequest}/>
          <div className={styles.ChatModal__form_suggested}></div>
        </section>
      </div>
      <div className={styles.overlay}></div>
    </>
  )
}