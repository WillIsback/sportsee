import styles from './Footer.module.css';
import { ICLogoOnly } from '@/components/Logo/Logo';

/**
 * Brief: Composant footer avec informations légales et logo de l'application
 * 
 * @returns {JSX.Element} Footer avec mentions légales et branding
 */
export default function Footer() {
  return (
  <footer className={styles.Footer}>
    <div className={styles.Footer__brand_disclaimer}>
      <p>©Sportsee</p>
      <p>Tous droits réservés</p>
    </div>
    <div className={styles.Footer__contact_cgv}>
      <p>Conditions générales</p>
      <p>Contact</p>
      <ICLogoOnly />
    </div>

  </footer>
  )
}