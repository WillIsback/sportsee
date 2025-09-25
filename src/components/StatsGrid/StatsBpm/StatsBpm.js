import styles from './StatsBpm.module.css';
import ChartsHeader from '../ChartsHeader/ChartsHeader';
import ComposedChart from './ComposedGraph/ComposedGraph';
import Loader from '@/components/Loader/Loader';
import { useDateState, useUserSessions } from '@hooks/useUserData';
import { convertDateToISO, incrementWeek, decrementWeek } from '@/lib/utils';
import { useState, useMemo } from 'react';

/**
 * Brief: Composant pour afficher les statistiques de battements par minute avec graphique combiné
 * @param {string} defStartWeek - Date de début de semaine par défaut au format ISO
 * @param {string} defEndWeek - Date de fin de semaine par défaut au format ISO
 * @returns {JSX.Element} Graphique de statistiques BPM avec navigation temporelle et effet de survol
 */
export default function StatsBpm({defStartWeek, defEndWeek}) {
    const [isHovered, setIshovered] = useState(false);
    const [startWeek, setStartWeek, endWeek, setEndWeek ] = useDateState(defStartWeek, defEndWeek);
    const { data, isPending } = useUserSessions(startWeek, endWeek);
    
    /**
     * Brief: calcul le battement par minute moyen
     * @param {Array} data.heartRate - data sous forme de tableau
     * @returns {Number} valeur averageBPM
     */
    const averageBPM = useMemo(() => {
        if (!isPending && !data?.length) return 0;
            const totalAverageBPM = data?.reduce((sum, data) => {
                // console.log("sum :", sum, "heartRate average :", item.heartRate.average);
                return sum + (data?.heartRate?.average || 0);
            }, 0);
            // console.log("totalAverageBPM :", totalAverageBPM, "data.length :", data?.length);
            return Math.ceil(totalAverageBPM / data?.length);
    }, [data]);

    if(isPending)return <Loader />;
    
    // console.log("data :", data)
    /**
     * Brief: Gère le clic pour naviguer vers la semaine précédente
     * @returns {Promise<void>}
     */
    /**
     * Brief: Gère le clic pour naviguer vers la semaine précédente
     * @returns {Promise<void>}
     */
    const handleClickOnSlideLeft = async () => {
        (startWeek < endWeek 
            ? setStartWeek(decrementWeek(startWeek))
            : setStartWeek(decrementWeek(endWeek))
        );
    }

    /**
     * Brief: Gère le clic pour naviguer vers la semaine suivante (limitée à la date actuelle)
     * @returns {Promise<void>}
     */
    const handleClickOnSlideRight = async () => {
        const upperLimit = Date.now();
        (endWeek < (convertDateToISO(upperLimit)) 
            ? setEndWeek(incrementWeek(endWeek))
            : setEndWeek(incrementWeek(startWeek))
        );
    }


    // console.log("is it re-rendered during hover ?");
    const lineStrokeColor = ( isHovered ? '#0B23F4' : '#F2F3FF' );
    const title = `${averageBPM} BPM`;
    const sousTitre = "Fréquence cardiaque moyenne";
    return (
        <div className={styles.StatsBpm}
            onMouseEnter={() => setIshovered(true)}
            onMouseLeave={() => setIshovered(false)}
            >
            <ChartsHeader 
                startWeek={startWeek} 
                endWeek={endWeek}
                handleClickOnSlideLeft={handleClickOnSlideLeft}
                handleClickOnSlideRight ={handleClickOnSlideRight}
                title={title}
                sousTitre={sousTitre}
            />
            <ComposedChart  lineStrokeColor={lineStrokeColor} sessionData={data} />
        </div>
    )
}