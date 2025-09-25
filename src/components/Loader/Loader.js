import LoadingDot from "../LoadingDot/LoadingDot";
import styles from './Loader.module.css';

/**
 * Brief: Composant de chargement avec texte et animation de points
 * 
 * @returns {JSX.Element} Interface de chargement avec animation
 */
export default function Loader() {
    return (
    <div className={styles.Loader__layout}>
        <p className={styles.loadingText}>Loading</p><LoadingDot />
    </div>
    );
}