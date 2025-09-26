import styles from './FormPlanningDate.module.css';
import DefaultButton from '@/components/Button/DefaultButton/DefaultButton';

export default function FormPlanningDate({ handleBackWardClick, handleGenerateClick, setDate }) {

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const startDate = formData.get('startDate');

    // Validation métier
    const selectedDate = new Date(startDate);
    const today = new Date();

    if (selectedDate < today) {
      alert('La date ne peut pas être dans le passé');
      return;
    }

    setDate(startDate);
    handleGenerateClick();
  }

  return (
    <form
        onSubmit={handleSubmit}
        className={styles.form}
    >
      <label className={styles.label}>
        Date de début
        <input
          type='date'
          name='startDate'
          id='startDate'
          required
          min={new Date().toISOString().split('T')[0]}
          className={styles.input}
        />
      </label>
      <div className={styles.action}>
        <button type="button" onClick={handleBackWardClick} className={styles.action__btn_back}>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5.80239 2.64317C5.99742 2.84019 5.99792 3.16021 5.80239 3.35723L1.70546 7.49519L15.5 7.49519C15.776 7.49519 16 7.72123 16 8.00026C16 8.2793 15.776 8.50533 15.5 8.50533L1.70546 8.50533L5.8019 12.6433C5.99742 12.8403 5.99742 13.1603 5.8019 13.3574C5.60637 13.5544 5.28984 13.5544 5.09481 13.3574L0.144774 8.35732C-0.0482597 8.16229 -0.0482597 7.83778 0.144774 7.64275L5.09481 2.64271C5.29034 2.44565 5.60687 2.44565 5.80239 2.64317C5.60687 2.44565 5.99742 2.84019 5.80239 2.64317Z" fill="black"/>
            </svg>
          </span>
        </button>
        <DefaultButton type="submit" content="Générer mon Planning" />
      </div>
    </form>
  )
}