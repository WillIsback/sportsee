'use client';
import SignInForm  from '@/components/SignInForm/SignInForm';
import styles from "./page.module.css";
import ICLogo from '@/components/Logo/Logo';

export default function Login() {
  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <ICLogo />
      </div>
      <SignInForm className={styles.SignInForm}/>
      <img className={styles.bannerLogin} src="/image/login_img.jpg" alt="Runner in marathon"/>
    </div>
  );
}
