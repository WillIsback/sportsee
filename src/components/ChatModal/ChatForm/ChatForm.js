import styles from './ChatForm.module.css';
import { Istar, ArrowDownload } from '@/lib/icon';

/**
 * Brief: Composant formulaire de chat pour envoyer des messages à l'IA
 * 
 * @param {Object} props - Propriétés du composant
 * @param {boolean} props.isPending - État de chargement de la requête
 * @param {Function} props.addNewRequest - Fonction appelée lors de l'envoi du formulaire
 * @returns {JSX.Element} Formulaire avec champ de saisie et bouton d'envoi
 */
export default function ChatForm({ isPending, addNewRequest }) {

  /**
   * Brief: Gère la soumission du formulaire de chat
   * 
   * @param {Event} e - Événement de soumission du formulaire
   */
  function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    // const message = formData.get('message');
    // console.log("form message :", message);
    addNewRequest(formData);
  }
  return (
    <form className={styles.ChatForm}
      onSubmit={(e)=>{handleOnSubmit(e)}}>
      <section className={styles.ChatForm__header}>
        <span><Istar /></span><p>Comment puis-je vous aider ?</p>
      </section>
      <div className={styles.ChatForm__textarea}>
        <input 
          className={styles.ChatForm__textarea_input}
          type='text'
          id='message'
          name='message'
          autoComplete='off'
        />
        {/* {(isPending) && "Chargement en cours..."} */}
        <button 
        className={styles.ChatForm__textarea_button}
        type='submit'
        // disabled={(isPending)}
        ><span><ArrowDownload /></span></button>
      </div>
    </form>
  )
}