import styles from './PlanningWeekCard.module.css';
import { useState } from 'react';
import PlanningDayCard from './PlanningDayCard/PlanningDayCard';

export default function PlanningWeekCard({  titre, data }) {
    const [collapse, setCollapse] = useState(true);
    const capitalizeFirst = str => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

    function toggleCollapse(){
        setCollapse(!collapse);
    }

    
    // Extraction des entrées pour éviter de recalculer à chaque render
    const weeklyEntries = data?.content || [];
    // console.log("Weekly data Object?.values(data): ", weeklyEntries);

    return (
        <div className={styles.weekcard}>
            <div className={styles.weekcard__header}>
                <h2>{capitalizeFirst(titre)}</h2>
                { collapse 
                    ? <button className={styles.weekcard__btn_collapsed} onClick={toggleCollapse}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                <circle cx="13.5" cy="13.5" r="13.5" fill="#F2F3FF"/>
                                <line x1="7.53491" y1="13.5" x2="20.0931" y2="13.5" stroke="#0B23F4" strokeWidth="0.627907"/>
                                <line x1="13.5" y1="19.4651" x2="13.5" y2="6.90695" stroke="#0B23F4" strokeWidth="0.627907"/>
                            </svg>
                        </span>
                    </button>
                :  
                <button className={styles.weekcard__btn_unfold} onClick={toggleCollapse} >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                <circle cx="13.5" cy="13.5" r="13.5" fill="#F2F3FF"/>
                                <line x1="7.53491" y1="13.5" x2="20.0931" y2="13.5" stroke="#0B23F4" strokeWidth="0.627907"/>
                            </svg>
                        </span>
                </button>
                }
            </div>
            { !collapse  &&
                <div className={styles.weekcard__day_list}>
                    {weeklyEntries.map(({titre, jour, temps, description}) => (
                        <PlanningDayCard 
                            key={jour} 
                            jour={jour}
                            titre={titre} 
                            description={description}
                            temps={temps}
                        />
                    ))}
                </div>
            }  
        </div>
    )
}