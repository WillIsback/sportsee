import styles from './PlanningDefault.module.css';
import { ICalendar } from '@/lib/icon';

/**
 * Brief: Composant d'accueil pour la création de planning d'entraînement
 * 
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.handleStartClick - Fonction appelée pour démarrer la création
 * @returns {JSX.Element} Interface d'introduction avec bouton de démarrage
 */
export default function PlanningDefault ({ handleStartClick }) {
  return (
    <article className={styles.PlanningDefault}>
      <ICalendar />
      <h2>Créez votre planning d'entraînement intelligent</h2>
      <p>Notre IA vous aide à bâtir un planning 100 % personnalisé selon vos objectifs, votre niveau et votre emploi du temps.</p>
      <button className={styles.PlanningDefault__button} onClick={handleStartClick}><span>Commencer</span></button>
    </article>
  )
}