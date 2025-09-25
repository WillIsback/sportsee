'use client';
import styles from "./page.module.css";
import ProfileBanner from "@/components/ProfilBanner/ProfileBanner";
import AttributesCard from '@/components/AttributesCard/AttributesCard';
import UserRecapGrid from '@/components/UserRecapGrid/UserRecapGrid';

/**
 * Brief: Page de profil utilisateur avec informations personnelles et récapitulatif des statistiques
 * @returns {JSX.Element} Interface de profil avec bannière, attributs et grille de statistiques
 */
export default function Profile() {
  // console.log("statistics :", userData);
  return (
    <div className={styles.page}>
        <article className={styles.MyProfile}>
            <section className={styles.section_profilebanner}>
              <ProfileBanner/>
            </section>
            <section className={styles.section_attributescard}>
              <AttributesCard />
            </section>
        </article>
        <div className={styles.UserRecapGrid}>
            <UserRecapGrid />
        </div>
    </div>
  );
}
