import styles from './FormPlanningGoal.module.css';
import DefaultButton from '@/components/Button/DefaultButton/DefaultButton';

export default function FormPlanningGoal({ handleGoalNextTo, setObjectif }) {

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const objectif = formData.get('objectif');
    // Validation côté client
    if (!objectif || objectif.trim().length < 3) {
      alert('Décrivez votre objectif en au moins 3 caractères');
      return;
    }

    setObjectif(objectif.trim());
    handleGoalNextTo();
  }

  return (
    <form
        onSubmit={handleSubmit}
        className={styles.form}
    >
      <label className={styles.label}>
          Objectif
        <input
            name='objectif'
            required
            minLength="3"
            maxLength="200"
            placeholder="Ex: Perdre 5kg en 3 mois"
            className={styles.input}
        />
        <DefaultButton type="submit" content="Suivant" />
      </label>
    </form>
  )
}