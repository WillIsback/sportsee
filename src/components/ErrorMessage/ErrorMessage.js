import styles from './ErrorMessage.module.css';

export default function ErrorMessage ({message}) {
    return (
        <div className={styles.ErrorMessage__layout}>
            <h2>Oups nous avons une erreur 🤭</h2>
            <p>{message}</p>
        </div>
    )
}