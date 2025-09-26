'use client';
import styles from './StatsGrid.module.css';
import StatsKm from '@/components/StatsGrid/StatsKm/StatsKm';
import StatsBpm from './StatsBpm/StatsBpm'; 
import PieGraph from '@/components/StatsGrid/PieGraph/PieGraph';
import WeeklyRecap from '@/components/StatsGrid/WeeklyRecap/WeeklyRecap';
import { decrementWeek, convertDateToISO, convertISODateToSlash } from '@/lib/utils';
import { useRef } from 'react';

/**
 * Brief: Composant principal pour afficher la grille de statistiques sportives de l'utilisateur
 * @returns {JSX.Element} Grille avec sections de performances passées et statistiques de la semaine courante
 */
export default function StatsGrid() {
 
    const renderCounter = useRef(0);
    renderCounter.current++;
    
    /**
     * Brief: Calcule les dates de début et fin de la semaine courante
     * @returns {Object} Objet contenant startWeek et endWeek formatées pour l'affichage
     */
    const getCurrentWeekDate= () => {
        const startWeek = convertISODateToSlash(decrementWeek(convertDateToISO(Date.now())));
        const endWeek = convertISODateToSlash(convertDateToISO(Date.now()));
        return { startWeek, endWeek}
    }
    const { startWeek, endWeek } = getCurrentWeekDate();
    console.log("StatGrid Component renderCounter :", renderCounter.current);

    return <div className={styles.StatsGrid}>
        <section className={styles.lastPerformances}>
            <h2>Vos dernières performances</h2>
            <div className={styles.ChartsBox_1}>
                <StatsKm 
                    defStartWeek={(decrementWeek(convertDateToISO(Date.now()),4))}
                    defEndWeek={(convertDateToISO(Date.now()))}
                />
                <StatsBpm 
                    defStartWeek={(decrementWeek(convertDateToISO(Date.now()),6))}
                    defEndWeek={(convertDateToISO(Date.now()))}
                />
            </div>
        </section>
        <section className={styles.thisWeek}>
            <div className={styles.thisWeekTitle}>
                <h2>Cette semaine</h2>
                <p>Du {startWeek} au {endWeek}</p>
            </div>
            <div className={styles.ChartsBox_2}>
                <PieGraph />
                <WeeklyRecap />
            </div>
        </section>
    </div>
}