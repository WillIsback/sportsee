import styles from './UserRecapGrid.module.css';
import { useUserProfile, useUserStats, useUserSessions, useUserAllSessions } from '@hooks/useUserData';
import { convertDateToISO, convertDateToString, getDeltaDays, convertMMTimeToHHMM } from '@/lib/utils';
import Loader from '../Loader/Loader';
import RecapCard from './RecapCard/RecapCard';
import { useMemo } from 'react';

export default function UserRecapGrid() {
    const userDataProfile = useUserProfile();
    const userDataProfileStats = useUserStats(); 
    const userDataSession = useUserAllSessions(); 
    if(userDataProfile?.loading || userDataProfileStats?.loading ||userDataSession?.loading) return <Loader />;
    if(userDataProfile?.error || userDataProfileStats?.error || userDataSession?.error) return <div>
            <p> 
                Error : {userDataProfile?.error?.user || userDataProfile?.error?.dev ||
                userDataProfileStats?.error?.user || userDataProfileStats?.error?.dev ||
                typeof error === 'string' ? error : error?.user || error?.dev} 
            </p>
        </div>;
    
    const { createdAt, ...rest } = userDataProfile?.userProfileData;
    const { totalDistance, totalSessions, totalDuration } = userDataProfileStats?.userStatsData;
    const { error , loading, sessionData } = userDataSession;




    // Calculate totalRunningDate
    // const listUniqueRunningDate= sessionData.flatMap((item) => item.date).sort();
    // console.log('listUniqueRunningDate :', listUniqueRunningDate);

    
    // console.log("statistics :", userDataProfileStats);
    // console.log("profile :", userDataProfile);
    // console.log("getAllRunningData: " , sessionData)

    // Calculate totalRunningDate
    const listUniqueRunningDate= sessionData.flatMap((item) => item.date).sort();
    // console.log('listUniqueRunningDate length :', listUniqueRunningDate.length);
    const totalPeriodDays = getDeltaDays(createdAt, convertDateToISO((new Date (Date.now()))));
    // console.log('totalPeriodDays :', totalPeriodDays);
    const numberOfRestDays = totalPeriodDays - listUniqueRunningDate.length;
    // console.log('numberOfRestDays :', numberOfRestDays);

    const { hourQ, minuteR } = convertMMTimeToHHMM(totalDuration);

    // Calculate totalCalories
    const totalCalories = Math.round(sessionData.reduce(
        (sum, session) => sum + session.caloriesBurned,
        0
    ).toFixed(1));

    // console.log('totalCalories :', totalCalories);

    const recapData = [
        {
            title : 'Temps total couru',
            data : `${hourQ}h`,
            unit : `${minuteR}min`,
        },
        {
            title : 'Calories brûlées',
            data : totalCalories,
            unit : 'cal',
        },
                {
            title : 'Distance totale parcourue',
            data : Math.floor(totalDistance),
            unit : 'km',
        },
                {
            title : 'Nombre de jours de repos',
            data : numberOfRestDays,
            unit : 'jours',
        },
                {
            title : 'Nombre de sessions',
            data : totalSessions,
            unit : 'sessions',
        },
    ]

    // recapData.map((obj, index) => {
    // console.log("obj, index :", obj, index);
    // });
    
    return ( 
    <section className={styles.section_recapgrid}>
        <div className={styles.section_recapgrid__header}>
            <h2>Vos Statistiques</h2>
            <p>depuis le {convertDateToString(createdAt)}</p>
        </div>
        <div className={styles.section_recapgrid__card}>
            {recapData.map((obj, index) => {
                return <RecapCard key={index} props={obj} />
            })}
        </div>
    </section>
)
}
