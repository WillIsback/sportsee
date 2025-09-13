import styles from './RecapCard.module.css';


export default function RecapCard({ props }) {
    const { title, data, unit } = props;

    return (
        <article className={styles.article}>
            <h3>{title}</h3>
            <div className={styles.article__content}>
                <h4>{data}</h4>
                <span>{unit}</span>
            </div>
        </article>
    )
}