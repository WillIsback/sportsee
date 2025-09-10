import styles from './StatsBpm.module.css';
import ChartsHeader from '../ChartsHeader/ChartsHeader';
import ComposedChart from './ComposedGraph/ComposedGraph';
import Loader from '@/components/Loader/Loader';
import { useUserSessions } from '@hooks/useUserData';


import { Suspense, useState } from 'react';


export default function StatsBpm(props) {
    const [isHovered, setIshovered] = useState(false);
    const [startWeek, setStartWeek, endWeek, setEndWeek, { error , loading, sessionData }] = useUserSessions();

    const barFillColor = ( isHovered ? '#0B23F4' : '#B6BDFC' );
    return (
        <div className={styles.StatsBpm}
            onMouseEnter={() => setIshovered(true)}
            onMouseLeave={() => setIshovered(false)}>
            <ChartsHeader startWeek={startWeek} 
                setStartWeek={setStartWeek}
                endWeek={endWeek}
                setEndWeek={setEndWeek}
                error ={error}
                loading={loading}
            />
            <Suspense fallback={<Loader />}>
                <ComposedChart  barFillColor={barFillColor} sessionData={sessionData} />
            </Suspense>
        </div>
    )
}