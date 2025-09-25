import styles from './ErrorToast.module.css';

/**
 * Brief: Composant toast pour afficher des messages d'erreur temporaires
 * 
 * @param {Object} props - Propriétés du composant
 * @param {string} props.message - Message d'erreur à afficher dans le toast
 * @returns {JSX.Element} Toast d'erreur stylisé
 */
export default function ErrorToast({message}){
  return( 
  <div className={styles.ErrorToast}>
    <p>{message}</p>
  </div>
  );
};