import styles from './ChatForm.module.css';
import { Istar, ArrowDownload } from '@/lib/icon';

export default function ChatForm({ isPending, addNewRequest }) {

  return (
    <form className={styles.ChatForm} action={addNewRequest}>
      <section className={styles.ChatForm__header}>
        <span><Istar /></span><p>Comment puis-je vous aider ?</p>
      </section>
      <div className={styles.ChatForm__textarea}>
        <input 
        className={styles.ChatForm__textarea_input}
        type='textarea' 
        disabled={(isPending)}
        id='message'
        name='message'
        />
        {(isPending) && "Chargement en cours..."}
        <button 
        className={styles.ChatForm__textarea_button}
        type='submit'
        disabled={(isPending)}
        ><span><ArrowDownload /></span></button>
      </div>
    </form>
  )
}