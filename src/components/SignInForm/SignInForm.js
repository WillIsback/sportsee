/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/components/SignInForm/SignInForm.js
    objectives: Mettre en place le useForm afin de Login le user sur la WebApp et au Backend API
    LastUpdate: 07/09/2025
*/
'use client';
import { useActionState } from 'react';
import { login } from '@/services/auth.services';
import styles from './SignInForm.module.css';
import Link from 'next/link'

/**
 * Brief: Composant de formulaire de connexion utilisateur avec gestion des états
 * 
 * @returns {JSX.Element} Formulaire de connexion avec champs username/password
 */
export default function SignInForm() {
  const [formState, formAction, isPending] = useActionState(login, null);

  return (
    <div className={styles.body}>
      {/* <h1><img src="/image/Logo.png" alt="logo sportsee" className={styles.logo}/></h1> */}
      <form action={formAction} className={styles.form}>
        <h2>Transformez<br />vos stats en résultats</h2>
        <div className={styles.inputBox}>
          <h3>Se connecter</h3>
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                placeholder="jpascal"
                type="text"
              />
            </div>
            <div>
            <label htmlFor="password">Mot de passe</label>
            <input id="password" type="password" name="password" />
          </div>
        </div>
        <button aria-disabled={isPending} type="submit" className={styles.connectionBtn}>
            <span>{isPending ? 'Connection..' : 'Se Connecter'}</span>
        </button>
          {formState?.success === false &&
            <div><p>{formState?.error}</p></div>
          }
        <Link href="/Register" ><p>Mot de passe oublié ?</p></Link>
      </form>
    </div>
  );
}

