import styles from './Footer.module.css';
import { ICLogoOnly } from '@/components/Logo/Logo';

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