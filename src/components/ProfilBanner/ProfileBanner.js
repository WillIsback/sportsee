import styles from './ProfileBanner.module.css';
import Loader from '@/components/Loader/Loader';
import { usePathname } from 'next/navigation';
import { useUserProfile } from '@hooks/useUserData';
import { convertDateToString } from '@/lib/utils';

export default function ProfileBanner() {
    const userData = useUserProfile();
    const pathname = usePathname();
    console.log(pathname);


    if(userData?.loading) return <Loader />;
    if(userData?.error) return <div><p> Error : {userData?.error?.user || userData?.error?.dev} </p></div>;
    const { createdAt, lastName, firstName, profilePicture } = userData?.userProfileData;
    console.log("profile :", userData);

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