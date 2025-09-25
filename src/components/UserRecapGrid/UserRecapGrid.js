import styles from './UserRecapGrid.module.css';
import { UserProfileContext, UserStatsContext } from '@context/UserContext';
import { useUserAllSessions } from '@hooks/useUserData';
import { convertDateToISO, convertDateToString, getDeltaDays, convertMMTimeToHHMM } from '@/lib/utils';
import RecapCard from './RecapCard/RecapCard';
import { use, useMemo } from 'react';
import Loader from '../Loader/Loader';

/**
 * Brief: Composant de grille de récapitulatif des statistiques utilisateur globales
 * @returns {JSX.Element} Grille de cartes avec statistiques de temps, calories, distance, repos et sessions
 */
export default function UserRecapGrid() {
    const userDataProfile = use(UserProfileContext);
    const userDataStats = use(UserStatsContext); 
    const { data, isPending } = useUserAllSessions(); 

    if(isPending)return <Loader />
    
    const { createdAt, ...rest } = userDataProfile?.dataProfile;
    const { totalDistance, totalSessions, totalDuration } = userDataStats?.dataStats;

    // console.log("data", data);
    // Calculate totalRunningDate
    
    /**
     * Brief: Extrait et trie les dates uniques de toutes les sessions de course
     * @returns {Array} Liste triée des dates uniques de course
     */
    const listUniqueRunningDate = () => {
        return data.flatMap((item) => item.date).sort();
    };
    const uniqueRunningDates = listUniqueRunningDate();
    // console.log('listUniqueRunningDate length :', uniqueRunningDates.length);
    const totalPeriodDays = getDeltaDays(createdAt, convertDateToISO((new Date (Date.now()))));
    // console.log('totalPeriodDays :', totalPeriodDays);
    const numberOfRestDays = totalPeriodDays - uniqueRunningDates.length;
    // console.log('numberOfRestDays :', numberOfRestDays);

    const { hourQ, minuteR } = convertMMTimeToHHMM(totalDuration);

    // Calculate totalCalories
    const totalCalories = Math.round(data.reduce(
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
