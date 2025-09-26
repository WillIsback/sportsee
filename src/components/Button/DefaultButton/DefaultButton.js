import styles from './DefaultButton.module.css';

export default function DefaultButton ({ type = "button", isDisabled, onClick, content }) {
    if (type === "submit") {
        return (
            <button 
                className={styles.DefaultButton}
                type="submit"
                disabled={isDisabled}
            >
                <span>{content || "Soumettre"}</span>
            </button>
        );
    }
    
    // Si c'est un bouton normal, onClick est requis
    return (
        <button 
            className={styles.DefaultButton}
            type="button"
            disabled={isDisabled}
            onClick={onClick}
        >
            <span>{content || "Cliquer"}</span>
        </button>
    );
}

