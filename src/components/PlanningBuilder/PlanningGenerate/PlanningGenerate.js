import styles from './PlanningGenerate.module.css';
import PlanningWeekCard from './PlanningWeekCard/PlanningWeekCard';
import generateICSFromPlanning from '@/lib/ics';

export default function PlanningGenerate({ planning, startDate, handleRestartClick }) {
    
    function handleDownload() {
        const icsContent = generateICSFromPlanning(planning, startDate);
        
        const blob = new Blob([icsContent], { 
            type: 'text/calendar;charset=utf-8' 
        });
        
        // Debug : lire le contenu du blob pour vérifier
        blob.text().then(content => {
            console.log("Contenu du blob:", content.substring(0, 200));
            console.log("Premier caractère hex:", content.charCodeAt(0).toString(16));
        });
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'planning-entrainement.ics';
        link.click();
        URL.revokeObjectURL(url);
    }

    // Extraction des entrées pour éviter de recalculer à chaque render
    const planningEntries = Object.entries(planning);

    return (
        <section className={styles.Planning}>
            <div className={styles.Planning__header}>
                <h2>Votre planning de la semaine</h2>
                <p>Important pour définir un programme adapté</p>
            </div>
            
            <div className={styles.Planning__weekList}>
                {planningEntries.map(([weekKey, weekData]) => (
                    <PlanningWeekCard 
                        key={weekKey} 
                        titre={weekKey} 
                        data={weekData}
                    />
                ))}
            </div>
            
            <div className={styles.Planning__action}> 
                <button onClick={handleDownload} type="button">
                    <span>Télécharger</span>
                </button>
                <button onClick={handleRestartClick} type="button">
                    <span>Regénérer un programme</span>
                </button>
            </div>
        </section>
    );
}