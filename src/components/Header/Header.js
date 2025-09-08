import styles from './Hearder.module.css';

export default function Header() {
    return (
        <header>
            <h1><img src="/image/Logo.png" alt="logo sportsee" className={styles.logo}/></h1>
        </header>
    )
}