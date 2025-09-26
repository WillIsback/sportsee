'use client';
import styles from './PlanningBuilder.module.css';
import PlanningDefault from './PlanningDefault/PlanningDefault';
import PlanningGoal from './PlanningGoal/PlanningGoal';
import PlanningDate from './PlanningDate/PlanningDate';
import PlanningGenerate from './PlanningGenerate/PlanningGenerate';
import ErrorToast from '../ErrorToast/ErrorToast';
import useRateLimit from '@hooks/useRateLimit';
import Loader from '../Loader/Loader';
import RefreshButton from '../Button/RefreshButton/RefreshButton';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { useMistralAPIRequest } from '@hooks/useMistralAPIRequest';
import { useUserSessions } from '@hooks/useUserData';
import { decrementWeek, convertDateToISO, getUserFriendlyError } from '@/lib/utils';
import { formatWeeklyData, formatUserDataProfile } from '@/lib/utils';
import { UserProfileContext } from '@context/UserContext';
import { useEffect, useState, use } from 'react';

/**
 * Brief: Composant principal de création de plannings d'entraînement avec IA
 * 
 * @returns {JSX.Element} Interface multi-étapes pour générer un planning personnalisé
 */
export default function PlanningBuilder () {
  const [step, setStep] = useState(0);
  const [objectif, setObjectif] = useState('');
  const [date, setDate] = useState();
  const [planning, setPlanning] = useState({});
  const [isRateLimited,  activateRateLimit] = useRateLimit();
  const [isPending, response, executePostFetch] = useMistralAPIRequest("api/training-plan/generate");
  const [errorState, setErrorState] = useState(null);

  const startWeek = decrementWeek(convertDateToISO(Date.now()), 2);
  const endWeek = convertDateToISO(Date.now());
  const lastWeekSession = useUserSessions(startWeek, endWeek);
  const userData = use(UserProfileContext);
  const weekFormatedData = formatWeeklyData(lastWeekSession) || undefined;
  const profileFormatedData =  formatUserDataProfile(userData?.dataProfile) || undefined;
 
  useEffect(() => {
    if (!isPending) {
      if (response.success && response.data) {
        setPlanning(response.data);
        setErrorState(null); // Reset l'erreur en cas de succès
        nextStep();
      }
      else if (response.errorCode === 403) {
        activateRateLimit();
      }
      else if (!response.success && response.error) {
        // Message d'erreur personnalisé selon le code
        const userFriendlyMessage = getUserFriendlyError(response.errorCode, response.error);
        setErrorState(userFriendlyMessage);
        setStep(-10);
      }
    }
  }, [isPending]);

  /**
   * Brief: Passe à l'étape suivante du processus de création de planning
   */
  function nextStep() {
    if(step<3){
      setStep(step+1);
    };
  };

  /**
   * Brief: Revient à l'étape précédente du processus de création
   */
  function previousStep(){
    if(step>0){
      setStep(step-1);
    };
  };

  function handleStartClick () {
    nextStep();
  };
  function handleGoalNextTo () {
    nextStep();
  };
  /**
   * Brief: Lance la génération du planning d'entraînement via l'IA
   */
  function handleGenerateClick() {

      executePostFetch({
        userProfile : profileFormatedData,
        userData: weekFormatedData,
        objectif: objectif || undefined,
        date: date || undefined,
      })
      // demo avec mock data
      // setPlanning(workoutProgramMockData);
      // nextStep();
  };

  function handleBackWardClick(){
    previousStep();
  }

  function handleRestartClick(){
    restart();
  }

  /**
   * Brief: Remet à zéro le processus de création de planning
   */
  function restart(){
    setStep(0);
    setObjectif(null);
    setDate(null);
    setPlanning(null);
  }

  // console.log("objectif : ", objectif);
  // console.log("Planning selected start date :", date);
  // console.log("PlanningBuilder render, step:", step, "planning keys:", Object.keys(planning));
  // console.log("isRateLimited ? :", isRateLimited.state);
  function updateStepRender () {
    switch (step) {
      case 0 :
        return <PlanningDefault handleStartClick={handleStartClick} />
      case 1 :
        return <PlanningGoal 
          handleGoalNextTo={handleGoalNextTo} 
          setObjectif={setObjectif}
          />
      case 2 :
        return (isPending ? <Loader /> : <PlanningDate 
          handleBackWardClick={handleBackWardClick} 
          handleGenerateClick={handleGenerateClick}
          setDate={setDate} 
          />)
      case 3 :
        return (isRateLimited.state 
          ? <ErrorToast />  
          : <PlanningGenerate 
                planning={planning} 
                startDate={date}
                handleRestartClick={handleRestartClick}
              />)
      default:
        return (
          <>
            <ErrorMessage message={errorState || "Le chargement du planning a échoué"} />
            <RefreshButton />
          </>
        );
    }
  }

  // console.log("step :", step)

  return (
  <section className={styles.PlanningBuilder}>
    {updateStepRender()}
  </section>
  )
}