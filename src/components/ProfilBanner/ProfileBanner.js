import styles from './ProfileBanner.module.css';
import { UserProfileContext } from '@context/UserContext';
import { convertDateToString } from '@/lib/utils';
import { use } from 'react';


export default function ProfileBanner() {
    const userData = use(UserProfileContext);
    const { createdAt, lastName, firstName, profilePicture } = userData?.dataProfile;
    // console.log("profile :", userData);

    return (
        <section className={styles.layout}>
            <div className={styles.imgBox}><img src={profilePicture}/></div>
            <div className={styles.content}>
                <h2>{firstName} {lastName}</h2>
                <p>Membre depuis le {convertDateToString(createdAt)}</p>
            </div>
        </section>
    );
}