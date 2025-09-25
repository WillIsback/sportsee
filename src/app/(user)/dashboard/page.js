import styles from "./page.module.css";
import StatsGrid from '@/components/StatsGrid/StatsGrid';
import ProfileBanner from "@/components/ProfilBanner/ProfileBanner";
import Achievements from "@/components/Achievements/Achievements";
import AskAi from "@/components/AskAi/AskAi";
import PlanningBuilder from "@/components/PlanningBuilder/PlanningBuilder";

/**
 * Brief: Page principale du dashboard utilisateur avec toutes les sections principales
 * 
 * @returns {JSX.Element} Interface complète du dashboard avec sections IA, profil et stats
 */
export default function Dashboard() {
  return (
    <div className={styles.page}>
        <section className={styles.AskAIbox}>
          <AskAi />
        </section>
        <section className={styles.MyProfile}>
            <ProfileBanner/>
            <Achievements />
        </section>
        <article className={styles.StatsPerformances}>
            <StatsGrid />
            <PlanningBuilder />
        </article>
    </div>
  );
}
