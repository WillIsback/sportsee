'use client';
import SignInForm  from '@/components/SignInForm/SignInForm';
import styles from "./page.module.css";
import ICLogo from '@/components/Logo/Logo';

/**
 * Brief: Page de connexion avec formulaire de login et image de présentation
 * @returns {JSX.Element} Interface de connexion avec panneau gauche (logo + formulaire) et panneau droit (image + slogan)
 */
export default function Login() {
  return (
    <div className={styles.page}>
      <div className={styles.page_left_panel}>
        <div className={styles.logo}>
          <ICLogo />
        </div>
        <SignInForm className={styles.SignInForm}/>
      </div>
      <div className={styles.page_right_panel}>
        <img className={styles.bannerLogin} src="/image/login_img.jpg" alt="Runner in marathon"/>
        <div className={styles.page_right_panel__tagline}>
          <p>Analysez vos performances en un clin d’œil,<br />suivez vos progrès et atteignez vos objectifs.</p>
        </div>
      </div>
    </div>
  );
}
