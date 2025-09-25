import styles from './PieGraph.module.css';
import { useUserSessions } from '@hooks/useUserData';
import { Cell, PieChart, Pie, ResponsiveContainer } from 'recharts';
import { decrementWeek, convertDateToISO } from '@/lib/utils';
import { useMemo } from 'react';

/**
 * Brief: Composant graphique en secteurs pour afficher le progrès des sessions d'entraînement hebdomadaires
 * @returns {JSX.Element} Graphique circulaire avec labels personnalisés montrant les sessions réalisées vs objectif
 */
export default function PieGraph() {
    const startWeek = decrementWeek(convertDateToISO(Date.now()));
    const endWeek = convertDateToISO(Date.now());
    const { data, isPending } = useUserSessions(startWeek, endWeek)
    
    const weeklyGoal = 9;

    /**
     * Brief: Calcule le nombre de sessions réalisées dans la semaine courante
     * @returns {number} Nombre de sessions d'entraînement effectuées
     */
    const getWeekNbSession = useMemo(() => {
        if(data) return Object.keys(data).length;
        return 0;
    }, [data, isPending]);

    const sessionRestantes = (((weeklyGoal - getWeekNbSession) > 0) ? (weeklyGoal - getWeekNbSession) : 0);

    const pieObjData = [
        {name: 'réalisées', value: getWeekNbSession},
        {name: 'restants', value: sessionRestantes},
    ]


    const COLORS = ['#0B23F4', '#B6BDFC'];
    const RADIAN = Math.PI / 180;
    
    /**
     * Brief: Rendu personnalisé des labels avec positionnement intelligent pour éviter les zones mortes
     * @param {Object} props - Propriétés du label incluant position, angles et valeurs
     * @returns {JSX.Element} Label SVG personnalisé avec icône et texte positionnés
     */
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index, value }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
        // console.log("midAngle :", midAngle, "cx :", cx, "cy :", cy);
        
        /**
         * Brief: Calcule les coordonnées x,y à partir d'un angle pour le positionnement des labels
         * @param {number} midAngle - Angle médian du secteur en degrés
         * @returns {Object} Coordonnées {x, y} calculées
         */
        const computeXY = (midAngle) => {
            const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
            const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
            return {x, y};
        };
        
        /**
         * Brief: Ajuste la position des labels pour éviter les zones mortes (nord/sud) du graphique
         * @returns {Object} Coordonnées ajustées {x, y} évitant les zones de conflit
         */
        const computeXY_deadzone = () => {
            const { x, y } = computeXY(midAngle);
            if(y > (cy * 2)){ // is in north dead zone
                const midAngle_offset = ((x < cx )? midAngle-30 : midAngle+30 );
                return computeXY(midAngle_offset)
            }
            else if((y < 0 )){// is in south dead zone
                const midAngle_offset = ((x > cx )? midAngle-30 : midAngle+30 );
                return computeXY(midAngle_offset)
            }
            else return { x, y }// no dead zone
        };
        const { x , y } = computeXY_deadzone();
        const x_offset = ((x < cx )? 35 : 0 );
        const x_adjusted = x - x_offset;
        
        /**
         * Brief: Génère le contenu personnalisé du label selon l'index du secteur
         * @returns {Object} Objet contenant iconColor et label formatés
         */
        const customLable = () => {
            if(index === 1){

                return {
                    iconColor: '#B6BDFC',
                    label: `${sessionRestantes} restants`,
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
                    <text  x={x_adjusted} y={y} fill='#707070' fontSize={10} fontFamily='var(--font-Inter-Regular)' >{label}</text>
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
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={ 'left: 25' }>
                    <Pie
                    data={pieObjData}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    startAngle={120}
                    endAngle={480}
                    innerRadius={40}
                    outerRadius={80}
                    cx={'54%'}
                    cy={'54%'}
                    fill="#0B23F4"
                    dataKey="value"          >
                    {pieObjData.map((entry, index) => (
                        <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            </section>
        </div>
    )
}