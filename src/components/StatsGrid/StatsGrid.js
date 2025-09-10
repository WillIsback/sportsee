'use client';
import styles from './StatsGrid.module.css';
import StatsKm from '@/components/StatsGrid/StatsKm/StatsKm';
import StatsBpm from './StatsBpm/StatsBpm'; 

export default function StatsGrid() {
    return <div className={styles.StatsGrid}>
        <section className={styles.lastPerformances}>
            <h2>Vos dernières performances</h2>
            <div className={styles.ChartsBox}>
                <StatsKm />
                <StatsBpm />
            </div>
        </section>
        <section className={styles.thisWeek}>
            <h2>Cette semaine</h2>
            <p>Du 23/06/2025 au 30/06/2025</p>
            <div className={styles.ChartsBox}></div>
        </section>
    </div>
}