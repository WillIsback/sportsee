import styles from './Achievements.module.css'
import { UserStatsContext } from '@context/UserContext';
import { use } from "react";
import { ICfinishLine } from '@/lib/icon';

export default function Achievements() {
    const userData = use(UserStatsContext);
    const { totalDistance, ...rest} = userData?.dataStats;
    return(
    <div className={styles.achievementBox}>
        <p>Distance totale parcourue</p>
        <div className={styles.achievemenTag}>
            <ICfinishLine />
            <h3>{totalDistance} km</h3>
        </div>
    </div>
    )
}