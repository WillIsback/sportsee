import { useUserSessions } from '@hooks/useUserData';
import { useMemo } from 'react';
import { decrementWeek, convertDateToISO } from '@/lib/utils';
import styles from './WeeklyRecap.module.css';


export default function WeeklyRecap() {
    const startWeek = decrementWeek(convertDateToISO(Date.now()));
    const endWeek = convertDateToISO(Date.now());
    const { isPending, data } = useUserSessions(startWeek, endWeek);

    const getCurrentWeekRecap = useMemo(() => {
        if(!data) return null;
        let totalDis = 0;
        let totalDur = 0;
        Object.values(data).forEach((item) => {
                totalDis = totalDis + item.distance;
                totalDur = totalDur + item.duration;
            });
        return {totalDis, totalDur};
    }, [isPending]);

    // console.log('getCurrentWeekRecap :', getCurrentWeekRecap);

    return ( 
    <section className={styles.weekRecap}>
        <article className={styles.article}>
            <h3 className={styles.article__title}>Durée d'activité</h3>
            <h4 className={`${styles.article__meta_data} ${styles.blue_bold}`}>{getCurrentWeekRecap?.totalDur}<span className={styles.blue_light}> minutes</span></h4>
        </article>
        <article className={styles.article}>
            <h3 className={styles.article__title}>Distance</h3>
            <h4 className={`${styles.article__meta_data} ${styles.red_bold}`}>{getCurrentWeekRecap?.totalDis}<span className={styles.red_light}> kilomètres</span></h4>
        </article>
    </section>
)}