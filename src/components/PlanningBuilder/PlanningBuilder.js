import styles from './PlanningBuilder.module.css';
import PlanningDefault from './PlanningDefault/PlanningDefault';
import PlanningGoal from './PlanningGoal/PlanningGoal';
import PlanningDate from './PlanningDate/PlanningDate';
import PlanningGenerate from './PlanningGenerate/PlanningGenerate';
import usePlanRequest from '@hooks/usePlanRequest';
import { useUserSessions } from '@hooks/useUserData';
import { decrementWeek, convertDateToISO } from '@/lib/utils';
import { formatWeeklyData, formatUserDataProfile } from '@/lib/utils';
import { UserProfileContext } from '@context/UserContext';
import { useEffect, useState, use } from 'react';
import { workoutProgramMockData } from '@/lib/constants';

export default function PlanningBuilder () {
  const [step, setStep] = useState(0);
  const [objectif, setObjectif] = useState('');
  const [date, setDate] = useState();
  const [planning, setPlanning] = useState({});
  const [isPending, response, executePostFetch] = usePlanRequest();
  const startWeek = decrementWeek(convertDateToISO(Date.now()), 2);
  const endWeek = convertDateToISO(Date.now());
  const lastWeekSession = useUserSessions(startWeek, endWeek);
  const userData = use(UserProfileContext);

  // useEffect(()=>{
  //   if(!isPending){
  //     if(response.error === 403){
  //       activateRateLimit();
  //       console.error("Error :", response.error, "Rate limit detection : Request per second reach for this model !");
  //     }
  //     else if (!response.error && response?.planning){
  //       if(response?.planning.length > 0){
  //         setPlanning(JSON.parse(response?.planning));
  //         console.log("executePostFetch Planning return message :", JSON.parse(response?.planning));
  //         if(step < 3 )
  //         {
  //           setStep(step+1);
  //         }
  //       }
  //     }
  //   }
  // }, [isPending]);

  function nextStep() {
    if(step<3){
      setStep(step+1);
    };
  };

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
  function handleGenerateClick() {
      const weekFormatedData = formatWeeklyData(lastWeekSession) || undefined;
      const profileFormatedData =  formatUserDataProfile(userData?.dataProfile) || undefined;
      // executePostFetch({
      //   userProfile : profileFormatedData,
      //   userData: weekFormatedData,
      //   objectif: objectif || undefined,
      //   date: date || undefined,
      // })
      setPlanning(workoutProgramMockData);
      nextStep();
  };

  function handleBackWardClick(){
    previousStep();
  }

  function restart(){
    setStep(0);
  }
  // console.log("objectif : ", objectif);
  // console.log("Planning selected start date :", date);
  // console.log("PlanningBuilder render, step:", step, "planning keys:", Object.keys(planning));

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
        return <PlanningDate 
          handleBackWardClick={handleBackWardClick} 
          handleGenerateClick={handleGenerateClick}
          setDate={setDate} 
          />
      case 3 :
        return <PlanningGenerate planning={planning} restart={restart} />
      default:
        return <>step 1</>  
    }
  }

  console.log("step :", step)

  return (
  <section className={styles.PlanningBuilder}>
    {updateStepRender()}
  </section>
  )
}