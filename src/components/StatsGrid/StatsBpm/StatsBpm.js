import styles from './StatsBpm.module.css';
import ChartsHeader from '../ChartsHeader/ChartsHeader';
import ComposedChart from './ComposedGraph/ComposedGraph';
import Loader from '@/components/Loader/Loader';
import { useDateState, useUserSessions } from '@hooks/useUserData';
import { convertDateToISO, incrementWeek, decrementWeek } from '@/lib/utils';
import { useState } from 'react';


export default function StatsBpm({defStartWeek, defEndWeek}) {
    const [isHovered, setIshovered] = useState(false);
    const [startWeek, setStartWeek, endWeek, setEndWeek ] = useDateState(defStartWeek, defEndWeek);
    const { data, isPending } = useUserSessions(startWeek, endWeek);

    if(isPending)return <Loader />;
    
    
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
    const lineStrokeColor = ( isHovered ? '#0B23F4' : '#F2F3FF' );
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
            />
            <ComposedChart  lineStrokeColor={lineStrokeColor} sessionData={data} />
        </div>
    )
}