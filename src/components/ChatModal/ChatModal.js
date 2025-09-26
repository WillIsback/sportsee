'use client';
import styles from './ChatModal.module.css';
import ChatDisplay from './ChatDisplay/ChatDisplay';
import ChatForm from './ChatForm/ChatForm';
import ErrorToast from '../ErrorToast/ErrorToast';
import useRateLimit from '@hooks/useRateLimit';
import useSanitization from '@hooks/useSanitization';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import RefreshButton from '../Button/RefreshButton/RefreshButton';

import { useMistralAPIRequest } from '@hooks/useMistralAPIRequest';
import { useUserSessions } from '@hooks/useUserData';
import { MISTRAL_RATE_LIMIT } from '@/lib/constants';
import { IconX } from '@/lib/icon';
import { useEffect, useState } from 'react';
import { decrementWeek, convertDateToISO } from '@/lib/utils';
import { formatWeeklyData, formatUserDataProfile, getUserFriendlyError } from '@/lib/utils';
import { UserProfileContext } from '@context/UserContext';
import { use } from 'react';

/**
 * Brief: Composant modal de chat avec l'IA incluant gestion des messages et limitations
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onClose - Fonction appelée pour fermer la modal
 * @returns {JSX.Element} Modal complète de chat avec formulaire et affichage des messages
 */
export default function ChatModal({ onClose }) {
  const [isNew, setIsNew] = useState(true);
  const [isRateLimited,  activateRateLimit] = useRateLimit();
  const [pending, result, executeSanitization] = useSanitization();
  const [isPending, response, executePostFetch] = useMistralAPIRequest("api/chat");
  const [userMessage, setUserMessage] = useState('');
  const [aiMessage, setAiMessage] = useState('');
  const [errorState, setErrorState] = useState(null);


  const startWeek = decrementWeek(convertDateToISO(Date.now()), 2);
  const endWeek = convertDateToISO(Date.now());
  const lastWeekSession = useUserSessions(startWeek, endWeek);
  const userData = use(UserProfileContext);
  const { timeframe } = MISTRAL_RATE_LIMIT[0];

  useEffect(() =>{
    if(!pending && result?.data && !result?.error){  
      if(result?.data.length > 0){
        setUserMessage(result?.data);
        // console.log("executeSanitization return message :", result?.data);
        if(!lastWeekSession?.isPending){
            const weekFormatedData = formatWeeklyData(lastWeekSession);
            const profileFormatedData =  formatUserDataProfile(userData?.dataProfile);
            executePostFetch({
              userProfile : profileFormatedData,
              userData: weekFormatedData,
              message: result?.data
            });
          };
      }
    }
    if(!pending && result?.error){
      setUserMessage('');
      console.error(result?.error);
    }
  }, [pending]);

  useEffect(() => {
    if (!isPending) {
      if (response.success && response.data) {
        if (response.data.length > 0) {
          setErrorState(null); // Reset l'erreur en cas de succès
          setAiMessage(JSON.parse(response.data));
        }
      }
      else if (response.errorCode === 403) {
        activateRateLimit();
        console.error("Error:", response.errorCode, "Rate limit detection!");
      }
      else if (!response.success && response.error) {
        const userFriendlyMessage = getUserFriendlyError(response.errorCode, response.error);
        setErrorState(userFriendlyMessage);
        console.error("Error:", response.error);
      }
    }
  }, [isPending]);

  const addNewRequest = (formData) => {
    setIsNew(false);
    const message = formData.get('message');
    // console.log("ChatModal input message :", message);
    executeSanitization(message);
  }

  const handleOnClick = (e) => {
    const formData = new FormData();
    // console.log("e.target.textContent : ", e.target.textContent );
    formData.set('message', e.target.textContent);
    addNewRequest(formData);
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
            {errorState && 
          <>
            <ErrorMessage message={errorState || "Le chargement du planning a échoué"} />
            <RefreshButton />
          </>
          }
          </section>
          <section className={styles.ChatModal__display}>
            <ChatDisplay userMessage={userMessage} aiMessage={aiMessage} isPending={isPending} />
          </section>
          <section className={styles.ChatModal__form}>
            <ChatForm isPending={isPending} addNewRequest={addNewRequest}/>
            <div className={styles.ChatModal__form_suggested}>
              <ul>
                <li><button onClick={(e) => handleOnClick(e)}>Comment améliorer mon endurance ?</button></li>
                <li><button onClick={(e) => handleOnClick(e)}>Que signifie mon score de récupération ?</button></li>
                <li><button onClick={(e) => handleOnClick(e)}>Peux-tu m’expliquer mon dernier graphique ?</button></li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}