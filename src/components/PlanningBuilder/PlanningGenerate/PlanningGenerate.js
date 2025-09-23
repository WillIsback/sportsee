import styles from './PlanningGenerate.module.css';
import PlanningWeekCard from './PlanningWeekCard/PlanningWeekCard';

export default function PlanningGenerate({ planning, restart }) {
    
    function handleDownload() {
        // TODO: Implémenter la logique de téléchargement
        console.log('Téléchargement du planning...');
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
                <button onClick={restart} type="button">
                    <span>Regénérer un programme</span>
                </button>
            </div>
        </section>
    );
}