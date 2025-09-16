import styles from './ChatForm.module.css';
import { Istar, ArrowDownload } from '@/lib/icon';

export default function ChatForm({ isPending, addNewRequest }) {

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