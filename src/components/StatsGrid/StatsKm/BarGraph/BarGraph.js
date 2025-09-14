import { ResponsiveContainer, BarChart , CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip } from 'recharts';
import { incrementWeek, RoundedBar, regexDateISO, convertDateToDDMM } from '@/lib/utils';
import styles from './BarGraph.module.css';
import Loader from '@/components/Loader/Loader';
import { useCallback, useMemo } from 'react';

export default function BarGraph({ barFillColor, sessionData}) {

    if(sessionData === undefined || !sessionData) return <Loader />;


    const updateSession = useMemo(() => {
            return sessionData.map(({ date, ...rest }, index) => {
                const IndiceDate = date.replace(regexDateISO, `S${index}`)
                return{ ...rest, IndiceDate};
            });
    }, [sessionData]);


    const getDateFromIndice = useCallback((IndiceDate) => sessionData.map(({ date, ...rest }, index) => {
            if(String(index) === IndiceDate.slice(1).trim()){
                const startPeriod = convertDateToDDMM(date).replace('/', '.');
                const endPeriod = convertDateToDDMM(incrementWeek(date)).replace('/','.');
                return `${startPeriod} au ${endPeriod}` ;
            }
            else return null;
    }), [sessionData]);

    const CustomTooltip = useCallback(({ active, payload, label }) => {
        const isVisible = active && payload && payload.length && getDateFromIndice(label);
        return (
            <div className="custom-tooltip" 
            style={{ visibility: isVisible ? 'visible' : 'hidden',
                background: 'black',
                width: 'auto',
                borderRadius: '10px',
                opacity: '0.94',
                display: 'flex',
                padding: '23px 23px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '2px',
                boxShadow: '0 4px 54px -18px rgba(157, 167, 251, 0.60)',
             }} >
            {isVisible && (
                <>
                    <p className={styles.TooltipDate}>{getDateFromIndice(label)}</p>
                    <p className={styles.TooltipKm}>{String(payload[0].value).replace('.',',')} km</p>
                </>
            )}
            </div>
        );
    }, [sessionData]);

   
    return (
        <ResponsiveContainer width={'100%'} height={262}>    
            <BarChart  
                data={updateSession}   
                className={styles.BarGraph} 
            >
                <CartesianGrid strokeDasharray="2" vertical={false}/>
                <XAxis dataKey={"IndiceDate"} tickLine={false} className={styles.Axis}/>
                <YAxis tickCount={4} tickLine={false} className={styles.Axis}/>
                <Legend align='left' iconSize={8}/>
                <Tooltip wrapperStyle={{ zIndex: 1 }} 
                    cursor={false}  
                    content={CustomTooltip}
                />
                <Bar dataKey="distance" 
                type='monotone'
                fill={barFillColor} 
                legendType='circle' 
                name='Km' 
                maxBarSize={14}
                shape={<RoundedBar/>}/>
            </BarChart> 
    </ResponsiveContainer>    
    )
}