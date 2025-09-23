import styles from './PlanningDayCard.module.css';

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