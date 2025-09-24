import LoadingDot from "../LoadingDot/LoadingDot";
import styles from './Loader.module.css';

export default function Loader() {
    return (
    <div className={styles.Loader__layout}>
        <p className={styles.loadingText}>Loading</p><LoadingDot />
    </div>
    );
}