import styles from './StatsKm.module.css';
import ChartsHeader from '../ChartsHeader/ChartsHeader';
import BarGraph from './BarGraph/BarGraph';
import Loader from '@/components/Loader/Loader';
import { useDateState, useUserSessions} from '@hooks/useUserData';
import { useState } from 'react';
import { convertDateToISO, incrementWeek, decrementWeek } from '@/lib/utils';


export default function StatsKm({defStartWeek, defEndWeek}) {
    const [isHovered, setIshovered] = useState(false);
    const [startWeek, setStartWeek, endWeek, setEndWeek ] = useDateState(defStartWeek, defEndWeek);
    const { data, isPending } = useUserSessions(startWeek, endWeek);

    if(isPending)return <Loader />;
    
    // console.log("data", data)
    

    const handleClickOnSlideLeft = async () => {
        (startWeek < endWeek 
            ? setStartWeek(decrementWeek(startWeek))
            : setStartWeek(decrementWeek(endWeek))
        );
    }

    const handleClickOnSlideRight = async () => {
        const upperLimit = Date.now();
        (endWeek < (convertDateToISO(upperLimit)) 
            ? setEndWeek(incrementWeek(endWeek))
            : setEndWeek(incrementWeek(startWeek))
        );
    }

 
    // console.log("is it re-rendered during hover ?");
    const barFillColor = ( isHovered ? '#0B23F4' : '#B6BDFC' );
    return (
        <div className={styles.StatsKm}
            onMouseEnter={() => setIshovered(true)}
            onMouseLeave={() => setIshovered(false)}>
            <ChartsHeader 
                startWeek={startWeek} 
                endWeek={endWeek}
                handleClickOnSlideLeft={handleClickOnSlideLeft}
                handleClickOnSlideRight ={handleClickOnSlideRight}
            />
            <BarGraph barFillColor={barFillColor} sessionData={data} />

        </div>
    )
}