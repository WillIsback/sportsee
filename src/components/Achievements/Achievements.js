'use client';
import styles from './Achievements.module.css'
import { UserStatsContext } from '@context/UserContext';
import { use } from "react";
import { ICfinishLine } from '@/lib/icon';

/**
 * Brief: Composant d'affichage des achievements utilisateur (distance totale)
 * 
 * @returns {JSX.Element} Section affichant la distance totale parcourue par l'utilisateur
 */
export default function Achievements() {
    const userData = use(UserStatsContext);
    const { totalDistance, ...rest} = userData?.dataStats;
    const roundedTotalDistance = Math.floor(totalDistance);
    return(
    <div className={styles.achievementBox}>
        <p>Distance totale parcourue</p>
        <div className={styles.achievemenTag}>
            <ICfinishLine />
            <h3>{roundedTotalDistance} km</h3>
        </div>
    </div>
    )
}