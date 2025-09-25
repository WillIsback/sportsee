import styles from './ErrorMessage.module.css';

/**
 * Brief: Composant d'affichage des messages d'erreur avec style uniforme
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.message - Message d'erreur à afficher
 * @returns {JSX.Element} Interface d'affichage d'erreur stylisée
 */
export default function ErrorMessage ({message}) {
    return (
        <div className={styles.ErrorMessage__layout}>
            <h2>Oups nous avons une erreur 🤭</h2>
            <p>{message}</p>
        </div>
    )
}