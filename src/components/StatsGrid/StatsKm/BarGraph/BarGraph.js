import { ResponsiveContainer, BarChart , CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip } from 'recharts';
import { incrementWeek, RoundedBar, regexDateISO, convertDateToDDMM } from '@/lib/utils';
import styles from './BarGraph.module.css';
import Loader from '@/components/Loader/Loader';
import { useCallback, useMemo } from 'react';

/**
 * Brief: Composant graphique en barres pour afficher les statistiques de distance parcourue
 * @param {string} barFillColor - Couleur de remplissage des barres du graphique
 * @param {Array} sessionData - Données des sessions d'entraînement contenant dates et distances
 * @returns {JSX.Element} Graphique en barres avec tooltip personnalisé et navigation temporelle
 */
export default function BarGraph({ barFillColor, sessionData}) {

    if(sessionData === undefined || !sessionData) return <Loader />;

    /*
     * Brief: Transforme les données de session en ajoutant des indices pour l'affichage
     * @returns {Array} Données transformées avec indices S0, S1, etc. pour les semaines
     */
    const updateSession = useMemo(() => {
            return sessionData.map(({ date, ...rest }, index) => {
                const IndiceDate = date.replace(regexDateISO, `S${index}`)
                return{ ...rest, IndiceDate};
            });
    }, [sessionData]);


    /**
     * Brief: Convertit un indice de semaine en période de dates formatée
     * @param {string} IndiceDate - Indice de la forme "S0", "S1", etc.
     * @returns {Function} Fonction qui retourne la période formatée ou null
     */
    const getDateFromIndice = useCallback((IndiceDate) => sessionData.map(({ date, ...rest }, index) => {
            if(String(index) === IndiceDate.slice(1).trim()){
                const startPeriod = convertDateToDDMM(date).replace('/', '.');
                const endPeriod = convertDateToDDMM(incrementWeek(date)).replace('/','.');
                return `${startPeriod} au ${endPeriod}` ;
            }
            else return null;
    }), [sessionData]);

    /**
     * Brief: Tooltip personnalisé pour afficher les détails d'une barre au survol
     * @param {boolean} active - État d'activation du tooltip
     * @param {Array} payload - Données de la barre survolée
     * @param {string} label - Label de la barre (indice de semaine)
     * @returns {JSX.Element} Tooltip avec période et distance formatées
     */
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
        <ResponsiveContainer width={'100%'} height={325}>    
            <BarChart  
                data={updateSession}   
                className={styles.BarGraph} 
            >
                <CartesianGrid strokeDasharray="2" vertical={false}/>
                <XAxis 
                    dataKey={"IndiceDate"} 
                    tickLine={false} 
                    tickMargin={15}
                    className={styles.Axis}
                />
                <YAxis 
                    tickCount={4} 
                    tickLine={false} 
                    padding={{ bottom: 5 }}
                    className={styles.Axis}
                />
                <Legend 
                    align='left' 
                    verticalAlign='bottom'
                    iconSize={8}
                />
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