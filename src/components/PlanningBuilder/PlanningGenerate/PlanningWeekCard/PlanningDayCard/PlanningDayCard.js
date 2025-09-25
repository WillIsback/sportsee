import styles from './PlanningDayCard.module.css';

/**
 * Brief: Composant d'affichage d'une journée d'entraînement dans le planning
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.jour - Jour de la semaine
 * @param {string} props.titre - Titre de l'exercice
 * @param {string} props.description - Description détaillée de l'exercice
 * @param {number} props.temps - Durée en minutes
 * @returns {JSX.Element} Carte d'affichage d'une journée d'entraînement
 */
export default function PlanningDayCard ({ jour, titre, description, temps }) {
    return (
        <article className={styles.PlanningDayCard__article}>
            <h4>{jour}</h4>
            <div className={styles.PlanningDayCard__article__content}>
                <div className={styles.PlanningDayCard__article__content_text}>
                    <h3>{titre}</h3>
                    <p>{description}</p>
                </div>
                <span>{temps}min</span>
            </div>
        </article>
    )
}