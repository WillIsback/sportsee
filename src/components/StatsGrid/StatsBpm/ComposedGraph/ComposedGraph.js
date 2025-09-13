import { ComposedChart  , CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, Line } from 'recharts';
import { useCallback, useMemo } from 'react';
import { RoundedBar, getSvgLegend } from '@/lib/utils';
import styles from './ComposedGraph.module.css';
import Loader from '@/components/Loader/Loader';

export default function ComposedGraph({ lineStrokeColor, sessionData}) {
    if(sessionData === undefined || !sessionData) return <Loader />;

    const renderLegend = useCallback((props) => {
        const { payload } = props;
        const orderedPayload = [
            payload.find(item => item.dataKey === 'heartRate.min'),
            payload.find(item => item.dataKey === 'heartRate.max'),
            payload.find(item => item.dataKey === 'heartRate.max') // line en dernier
        ].filter(Boolean);
        return (
            <ul className={styles.Legend}>
            {
                orderedPayload.map((entry, index) => (
                <li key={`item-${index}`}>
                    {getSvgLegend(index)}
                    {entry.value}
                </li>
                ))
            }
            </ul>
        );
    })
    const graphData = useMemo(() => {
        // console.log("sessionDatae :", sessionData);
        const WeekHeartRate = sessionData.map((r) => {
            const days = [
                'Dimanche',
                'Lundi',
                'Mardi',
                'Mercredi',
                'Jeudi',
                'Vendredi',
                'Samedi',
            ];
            const date = new Date(r.date);
            const dayIdx = date.getDay();
            const heartRate = r.heartRate;
            const jourSemaine = days[dayIdx];
            return {jourSemaine, heartRate}
        });
        // console.log("WeekHeartRate :", WeekHeartRate);
        return WeekHeartRate;
    }, [sessionData]);


    return (        
        <ComposedChart  width={330} height={262} 
            data={graphData}   
            className={styles.ComposedChart} 
        >
            <CartesianGrid strokeDasharray="2" vertical={false}/>
            <XAxis dataKey="jourSemaine" tickLine={false} className={styles.Axis}/>
            <YAxis 
                tickCount={4} 
                tickLine={false} 
                className={styles.Axis} 
                domain={['dataMin - 10', 'dataMax + 10']}
                interval={"preserveStartEnd"}
            />
            <Legend 
                align='left' 
                iconSize={8}
                fill='#0B23F4'
                content={renderLegend}
                />
            <Bar dataKey="heartRate.min" 
                fill="#FCC1B6"
                legendType='circle' 
                name='Min' 
                maxBarSize={14}
                shape={<RoundedBar/>}
            />
            <Bar dataKey="heartRate.max" 
                fill="#F4320B"
                legendType='circle' 
                name='Max BPM' 
                maxBarSize={14}
                shape={<RoundedBar/>}
            />
            <Line 
                dataKey="heartRate.max" 
                stroke={lineStrokeColor}
                strokeWidth={3}
                dot={{ stroke: '#0B23F4', strokeWidth: 2, fill: '#0B23F4' }}
                activeDot={false}
                legendType='line'
                name='Max BPM'
                type={'natural'}
            />

        </ComposedChart >
    )
}