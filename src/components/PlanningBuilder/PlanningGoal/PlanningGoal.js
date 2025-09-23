import styles from './PlanningGoal.module.css';
import { ICtarget } from '@/lib/icon';

export default function PlanningGoal ({ handleGoalNextTo, setObjectif }) {
  return (
    <article className={styles.PlanningGoal}>
      <ICtarget />
      <div className={styles.PlanningGoal__header}>
        <h2>Quel est votre objectif principal ?</h2>
        <p>Choisissez l’objectif qui vous motive le plus</p>
      </div>
      <div className={styles.PlanningGoal__input_Box}>
        <label className={styles.PlanningGoal__input_label}>
            Objectif
        </label>
        <input 
          type='text'
          className={styles.PlanningGoal__input_textArea}
          aria-labelledby='objectif'
          name='objectif'
          id='objectif'
          onChange={(e) =>setObjectif(e.target.value)}
        />
      </div>
      <button className={styles.PlanningGoal__button} onClick={handleGoalNextTo}><span>Suivant</span></button>
    </article>
  )
}