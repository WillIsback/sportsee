import styles from './ChatDisplay.module.css';

export default function ChatDisplay({ userMessage, aiMessage }) {
  return(
    <div className={styles.chat}>
      <div className={styles.chat__user}>
        <div className={styles.chat__user_buble}>
          <p>{userMessage}</p>
        </div>
      </div>
      <div className={styles.chat__ai}>
        <span>Coach AI</span>
        <div className={styles.chat__ai_buble}>
          <p>{aiMessage}</p>
        </div>
      </div>
    </div>
  )
}