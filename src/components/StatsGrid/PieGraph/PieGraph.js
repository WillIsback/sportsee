import styles from './PieGraph.module.css';
import Loader from '@/components/Loader/Loader';
import { useUserSessions } from '@hooks/useUserData';
import { Cell, PieChart, Pie } from 'recharts';
import { decrementWeek, convertDateToISO } from '@/lib/utils';
import { useMemo } from 'react';
import { useEffect } from 'react';

export default function PieGraph() {
    const [startWeek, setStartWeek, endWeek, setEndWeek, { error , loading, sessionData }] = useUserSessions();
    if(useUserSessions?.loading) return <Loader />;
    if(useUserSessions?.error) return <div><p> Error : {useUserSessions?.error?.user || useUserSessions?.error?.dev} </p></div>;
    useEffect(() => {
        setStartWeek(decrementWeek(convertDateToISO(Date.now())));
        setEndWeek(convertDateToISO(Date.now()));
    }, []);
    
    const weeklyGoal = 3;

    const getWeekNbSession = useMemo(() => {
        if(sessionData) return Object.keys(sessionData).length;
    },[sessionData]);


    const pieObjData = [
        {name: 'réalisées', value: getWeekNbSession},
        {name: 'restants', value: (weeklyGoal - getWeekNbSession)},
    ]


    const COLORS = ['#0B23F4', '#B6BDFC'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index, value }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
        const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
        const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
        const offset = ((x < cx )? 35 : 0 );
        const x_adjusted = x - offset;
        const customLable = () => {
            if(index === 1){

                return {
                    iconColor: '#B6BDFC',
                    label: `${weeklyGoal - getWeekNbSession} restants`,
                }
            }
            else{
                return {
                    iconColor: '#0B23F4',
                    label: `${getWeekNbSession} réalisées`,
                }
            }
        }
        const { label, iconColor } = customLable();
        // console.log("label, iconColor :", label, iconColor);
        return (
                <g visibility={(value>0) ? 'visible' : 'hidden' }>
                    <text  x={x_adjusted} y={y} fill='#707070' fontSize={10} fontFamily='var(--font-Inter-Regular)'>{label}</text>
                    <svg  x={x_adjusted-12} y={y-9}  xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <circle cx="6.45" cy="6.45" r="4" fill={iconColor}/>
                    </svg>

                </g>
        )
    }
    // console.log("pieObjData :" , pieObjData);

    return (
        <div className={styles.PieGraph}>
            <section className={styles.header}>
                <h3>x{getWeekNbSession}<span> sur objectif de {weeklyGoal}</span></h3>
                <p>Courses hebdomadaire réalisées</p>
            </section>
            <section className={styles.PieChart}>
                <PieChart width={306} height={190} margin={ 'left: 25' }>
                    <Pie
                    data={pieObjData}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    startAngle={120}
                    endAngle={480}
                    innerRadius={40}
                    outerRadius={80}
                    fill="#0B23F4"
                    dataKey="value"          >
                    {pieObjData.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                </PieChart>
            </section>
        </div>
    )
}