import styles from './RefreshButton.module.css';

/**
 * Brief: Composant bouton pour rafraîchir la page courante
 * @returns {JSX.Element} Bouton de rafraîchissement avec gestionnaire de rechargement de page
 */
export default function RefreshButton() {
    
    /**
     * Brief: Gère le rafraîchissement de la page en rechargeant la fenêtre
     * @returns {void}
     */
    function handleRefresh(){
    window.location.reload();
    }
    return (
    <div className={styles.RefreshButton_layout}>
        <button 
            onClick={handleRefresh} 
            className={styles.RefreshButton_button}
        >
            <span>Rafrachir la page</span>
        </button>
    </div>
    )
};