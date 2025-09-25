import styles from './not-found.module.css';
import ICLogo from '@/components/Logo/Logo';
import Link from 'next/link';

/**
 * Brief: Page d'erreur 404 personnalisée pour les URLs non trouvées
 * @returns {JSX.Element} Page d'erreur avec logo, message 404 et image de fond
 */
export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.page__div}>
        <div className={styles.logo}>
          <Link href="/">
            <ICLogo />
          </Link>
        </div>
        <div>
          <h1>404 - Page Not Found</h1>
        </div>
      </div>
      <img className={styles.bannerLogin} src="/image/login_img.jpg" alt="Runner in marathon"/>
    </div>
  );
}
