import { BarChart , CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip } from 'recharts';
import { incrementWeek } from '@/lib/utils';
import styles from './BarGraph.module.css';
import Loader from '@/components/Loader/Loader';

export default function BarGraph({ barFillColor, sessionData}) {

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
    const regex = /(\w+)(\W)(\w+)(\W)(\w+)/;
    const updateSession = sessionData.map(({ date, ...rest }, index) => {
            const IndiceDate = date.replace(regex, `S${index}`)
            return{ ...rest, IndiceDate};
        });
    const convertDateToString = (date) => {
        const fdate = new Date(date);
        return fdate.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
        });
    };
    const getDateFromIndice = (IndiceDate) => sessionData.map(({ date, ...rest }, index) => {
            if(String(index) === IndiceDate.slice(1).trim()){
                const startPeriod = convertDateToString(date).replace('/', '.');
                const endPeriod = convertDateToString(incrementWeek(date)).replace('/','.');
                return `${startPeriod} au ${endPeriod}` ;
            }
            else return null;
    });

    const CustomTooltip = ({ active, payload, label }) => {
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
    };

   
    return (        
        <BarChart width={330} height={262} 
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
    )
}