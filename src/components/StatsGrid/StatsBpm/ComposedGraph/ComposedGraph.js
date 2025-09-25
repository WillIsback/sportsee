import { ResponsiveContainer, ComposedChart  , CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, Line } from 'recharts';
import { useCallback, useMemo } from 'react';
import { RoundedBar, getSvgLegend } from '@/lib/utils';
import styles from './ComposedGraph.module.css';
import Loader from '@/components/Loader/Loader';

/**
 * Brief: Composant graphique combiné (barres + ligne) pour afficher les statistiques de fréquence cardiaque
 * @param {string} lineStrokeColor - Couleur de la ligne du graphique
 * @param {Array} sessionData - Données des sessions contenant les informations de fréquence cardiaque
 * @returns {JSX.Element} Graphique combiné avec barres min/max et ligne de tendance
 */
export default function ComposedGraph({ lineStrokeColor, sessionData}) {
    if(sessionData === undefined || !sessionData) return <Loader />;

    /**
     * Brief: Rendu personnalisé de la légende avec ordre spécifique des éléments
     * @param {Object} props - Propriétés de la légende contenant le payload
     * @returns {JSX.Element} Liste HTML personnalisée pour la légende
     */
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
    
    /**
     * Brief: Transforme les données de session en données organisées par jour de la semaine
     * @returns {Array} Données formatées avec jour de semaine et fréquence cardiaque
     */
    const graphData = useMemo(() => {
        // console.log("sessionDatae :", sessionData);
        const WeekHeartRate = sessionData.map((r) => {
            const days = [
                'Dim',
                'Lun',
                'Mar',
                'Mer',
                'Jeu',
                'Ven',
                'Sam',
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
    <ResponsiveContainer width={'110%'} height={300}>      
        <ComposedChart   
            data={graphData}   
            barGap={-25}
            margin={' top: 5, right: 5, bottom: 5, left: 0 '}

            className={styles.ComposedChart} 
        >
            <CartesianGrid strokeDasharray="2" vertical={false}/>
            <XAxis 
                dataKey="jourSemaine" 
                tickLine={false} 
                tickMargin={15}
                padding={{ right: 10 }}
                className={styles.Axis}
            />
            <YAxis 
                tickCount={4} 
                tickLine={false} 
                padding={{ bottom: 5 }}
                className={styles.Axis} 
                domain={['dataMin - 10', 'dataMax + 10']}
                interval={"preserveStartEnd"}
            />
            <Legend 
                align='left' 
                verticalAlign='bottom'
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
    </ResponsiveContainer> 
    )
}