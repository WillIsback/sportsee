'use client';
import styles from "./page.module.css";
import Image from "next/image";
import StatsGrid from '@/components/StatsGrid/StatsGrid';
import ProfileBanner from "@/components/ProfilBanner/ProfileBanner";
import Loader from '@/components/Loader/Loader';
import { useUserStats } from '@hooks/useUserData';
import { Suspense } from "react";

export default function Dashboard() {
  const userData = useUserStats();

  if(userData?.loading) return <Loader />;
  if(userData?.error) return <div><p> Error : {userData?.error?.user || userData?.error?.dev} </p></div>;
  const { totalDistance, totalSessions, totalDuration } = userData?.userStatsData;


  // console.log("statistics :", userData);
  return (
    <div className={styles.page}>
      <main>
        <section className={styles.AskAIbox}>
        </section>
        <section className={styles.MyProfile}>
          <ProfileBanner/>
          <div className={styles.achievementBox}>
            <p>Distance totale parcourue</p>
            <div className={styles.achievemenTag}>
              <Image
                  src="/finishLine.svg"
                  alt="achievement"
                  width={34}
                  height={34}
                  />
                <h3>{totalDistance} km</h3>
              </div>
            </div>
        </section>
        <article className={styles.StatsPerformances}>
          <Suspense>
            <StatsGrid />
          </Suspense>
        </article>
      </main>
    </div>
  );
}
