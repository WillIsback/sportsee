import styles from './RecapCard.module.css';

/**
 * Brief: Composant de carte pour afficher une statistique individuelle avec titre, donnée et unité
 * @param {Object} props - Objet contenant les propriétés de la statistique
 * @param {string} props.title - Titre de la statistique
 * @param {number|string} props.data - Valeur numérique de la statistique
 * @param {string} props.unit - Unité de mesure de la statistique
 * @returns {JSX.Element} Article avec titre et contenu formaté de la statistique
 */
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