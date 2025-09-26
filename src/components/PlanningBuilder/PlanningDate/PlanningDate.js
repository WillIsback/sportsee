import styles from './PlanningDate.module.css';
import { ICalendar } from '@/lib/icon';
import FormPlanningDate from './FormPlanningDate/FormPlanningDate';

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
      <FormPlanningDate
        handleBackWardClick={handleBackWardClick}
        handleGenerateClick={handleGenerateClick}
        setDate={setDate}
      />
    </article>
    )
}
