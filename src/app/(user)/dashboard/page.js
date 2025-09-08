
import styles from "./page.module.css";
import StatsGrid from '@/components/StatsGrid/StatsGrid';

export default function Dashboard() {
  return (
    <div className={styles.page}>
      <main>
        <section className={styles.AskAIbox}>
        </section>
        <section className={styles.MyProfile}>
        </section>
        <article className={styles.StatsPerformances}>
          <StatsGrid />
        </article>
      </main>
    </div>
  );
}
