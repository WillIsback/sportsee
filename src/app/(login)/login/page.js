import SignInForm  from '@/components/SignInForm/SignInForm';
import styles from "./page.module.css";

export default function Login() {
  return (
    <div className={styles.page}>
      <SignInForm className={styles.SignInForm}/>
      <img className={styles.bannerLogin} src="/image/login_img.jpg" alt="Runner in marathon"/>
    </div>
  );
}
