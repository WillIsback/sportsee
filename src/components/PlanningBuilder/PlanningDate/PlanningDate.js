import styles from './PlanningDate.module.css';
import { ICalendar } from '@/lib/icon';
import DefaultButton from '@/components/Button/DefaultButton/DefaultButton';
/**
 * Brief: Composant pour sélectionner la date de début d'un programme sportif
 * @param {Function} handleBackWardClick - Fonction pour revenir à l'étape précédente
 * @param {Function} handleGenerateClick - Fonction pour générer le planning avec la date sélectionnée
 * @param {Function} setDate - Fonction pour mettre à jour la date sélectionnée
 * @returns {JSX.Element} Interface de sélection de date avec calendrier et boutons de navigation
 */
export default function PlanningDate ({ handleBackWardClick, handleGenerateClick, setDate }) {

    return (
    <article className={styles.PlanningDate}>
      <ICalendar />
      <div className={styles.PlanningDate_header}>
        <h2>Quand souhaitez vous commencer votre programme ?</h2>
        <p>Générer un programme d’une semaine à partir de la date de votre choix</p>
      </div>
      <div className={styles.PlanningDate__input_Box}>
        <label className={styles.PlanningDate__input_label}>
            Date de début
        </label>
        <input
          type='date'
          className={styles.PlanningDate__input_dateArea}
          aria-labelledby='startDate'
          name='startDate'
          id='startDate'
          onChange={(e) =>setDate(e.target.value)}
        />
      </div>
      <div className={styles.PlanningDate__button_box}>
        <button className={styles.PlanningDate__button_back} onClick={handleBackWardClick}>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5.80239 2.64317C5.99742 2.84019 5.99792 3.16021 5.80239 3.35723L1.70546 7.49519L15.5 7.49519C15.776 7.49519 16 7.72123 16 8.00026C16 8.2793 15.776 8.50533 15.5 8.50533L1.70546 8.50533L5.8019 12.6433C5.99742 12.8403 5.99742 13.1603 5.8019 13.3574C5.60637 13.5544 5.28984 13.5544 5.09481 13.3574L0.144774 8.35732C-0.0482597 8.16229 -0.0482597 7.83778 0.144774 7.64275L5.09481 2.64271C5.29034 2.44565 5.60687 2.44565 5.80239 2.64317C5.60687 2.44565 5.99742 2.84019 5.80239 2.64317Z" fill="black"/>
                </svg>
            </span>
        </button>
        <DefaultButton 
          type='button'
          isDisabled={false}
          onClick={handleGenerateClick}
          content={'Générer mon Planning'}
        />
      </div>
    </article>
    )
}
