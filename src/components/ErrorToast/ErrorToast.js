import styles from './ErrorToast.module.css';

export default function ErrorToast({message}){
  return( 
  <div className={styles.ErrorToast}>
    <p>{message}</p>
  </div>
  );
};