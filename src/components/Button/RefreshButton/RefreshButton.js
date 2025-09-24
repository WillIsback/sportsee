import styles from './RefreshButton.module.css';
export default function RefreshButton() {
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