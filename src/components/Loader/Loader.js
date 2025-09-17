import LoadingDot from "../LoadingDot/LoadingDot";
import styles from './Loader.module.css';

export default function Loader() {
    return (
    <>
        <p className={styles.loadingText}>Loading</p><LoadingDot />
    </>
    );
}