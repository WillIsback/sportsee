import styles from './StatsKm.module.css';
import ChartsHeader from '../ChartsHeader/ChartsHeader';
import BarGraph from './BarGraph/BarGraph';
import Loader from '@/components/Loader/Loader';
import { useDateState, useUserSessions} from '@hooks/useUserData';
import { useState, useMemo } from 'react';
import { convertDateToISO, incrementWeek, decrementWeek, getDeltaWeek } from '@/lib/utils';

/**
 * Brief: Composant pour afficher les statistiques de distance parcourue avec graphique en barres
 * @param {string} defStartWeek - Date de début de semaine par défaut au format ISO
 * @param {string} defEndWeek - Date de fin de semaine par défaut au format ISO
 * @returns {JSX.Element} Graphique de statistiques de distance avec navigation temporelle et effet de survol
 */
export default function StatsKm({defStartWeek, defEndWeek}) {
    const [isHovered, setIshovered] = useState(false);
    const [startWeek, setStartWeek, endWeek, setEndWeek ] = useDateState(defStartWeek, defEndWeek);
    const { data, isPending } = useUserSessions(startWeek, endWeek);

    /**
     * Brief: calcul la distance moyenne de la session
     * @param {Array} data - data sous forme de tableau
     * @returns {Number} valeur averageDistance 
     */
    const averageDistance = useMemo(() => {
        if (!data?.length) return 0;
        
        const totalDistance = data.reduce((sum, data) => {
            return sum + (data.distance || 0);
        }, 0);
        
        return Math.ceil(totalDistance / data.length);
    }, [data]);

    if(isPending)return <Loader />;
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
    const barFillColor = ( isHovered ? '#0B23F4' : '#B6BDFC' );
    const title = `${averageDistance}km en moyenne`
    const sousTitre = `Total kilomètres ${getDeltaWeek(startWeek,endWeek)+1} dernières semaines.`
    return (
        <div className={styles.StatsKm}
            onMouseEnter={() => setIshovered(true)}
            onMouseLeave={() => setIshovered(false)}>
            <ChartsHeader 
                startWeek={startWeek} 
                endWeek={endWeek}
                handleClickOnSlideLeft={handleClickOnSlideLeft}
                handleClickOnSlideRight ={handleClickOnSlideRight}
                title={title}
                sousTitre={sousTitre}
            />
            <BarGraph barFillColor={barFillColor} sessionData={data} />

        </div>
    )
}