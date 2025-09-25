import styles from './ProfileBanner.module.css';
import Image from 'next/image'

import { UserProfileContext } from '@context/UserContext';
import { convertDateToString } from '@/lib/utils';
import { use } from 'react';

/**
 * Brief: Composant d'affichage de la bannière de profil utilisateur
 * 
 * @returns {JSX.Element} Bannière avec photo, nom et date d'inscription de l'utilisateur
 */
export default function ProfileBanner() {
    const userData = use(UserProfileContext);
    const { createdAt, lastName, firstName, profilePicture } = userData?.dataProfile;
    // console.log("profile :", userData);
    // throw new Error("oops, I made a mistake!");
    return (
        <section className={styles.layout}>
            <div className={styles.imgBox}>
                <Image src={profilePicture} 
                    alt="image de profil de l'utilisateur"
                    className={styles.img}
                    fill={true} 
                />
            </div>
            <div className={styles.content}>
                <h2>{firstName} {lastName}</h2>
                <p>Membre depuis le {convertDateToString(createdAt)}</p>
            </div>
        </section>
    );
}