import { ComposedChart  , CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, Line } from 'recharts';
import { incrementWeek } from '@/lib/utils';
import styles from './ComposedGraph.module.css';
import Loader from '@/components/Loader/Loader';

export default function ComposedGraph({ barFillColor, sessionData}) {

    if(sessionData === undefined || !sessionData) return <Loader />;

    const RoundedBar = (props) => {
        const { fill, x, y, width, height } = props;
        const radius = Math.min(width / 2, 7); // Limite le rayon à 7px max
        
        return (
            <rect 
                x={x} 
                y={y} 
                width={width} 
                height={height} 
                rx={radius} 
                ry={radius} 
                fill={fill} 
            />
        );
    };

    console.log("sessionDatae :", sessionData);
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
    console.log("WeekHeartRate :", WeekHeartRate);

    return (        
        <ComposedChart  width={330} height={262} 
            data={WeekHeartRate}   
            className={styles.ComposedChart} 
        >
            <CartesianGrid strokeDasharray="2" vertical={false}/>
            <XAxis dataKey={WeekHeartRate.jourSemaine} tickLine={false} className={styles.Axis}/>
            <YAxis 
                tickCount={4} 
                tickLine={false} 
                className={styles.Axis} 
                domain={['dataMin - 10', 'dataMax + 10']}
                interval={"preserveStartEnd"}
            />
            <Legend align='left' iconSize={8}/>
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
                name='Max' 
                maxBarSize={14}
                shape={<RoundedBar/>}
            />
            <Line 
                dataKey="heartRate.average" 
                stroke="#ff7300" 
            />
        </ComposedChart >
    )
}