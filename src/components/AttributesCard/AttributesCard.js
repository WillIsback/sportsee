import styles from './AttributesCard.module.css';
import { useUserProfile } from '@hooks/useUserData';
import { convertCMHeightToMcM, translateGender } from '@/lib/utils';
import Loader from '../Loader/Loader';

export default function AttributesCard() {
    const userData = useUserProfile();
    if(userData?.loading) return <Loader />;
    if(userData?.error) return <div><p> Error : {userData?.error?.user || userData?.error?.dev} </p></div>;
    const { age, gender, height, weight } = userData?.userProfileData;



    return (
    <article className={styles.AttributesCard}>
        <div className={styles.attributes_title}>
            <h2>Votre profil</h2>
            <hr className={styles.divider}></hr>
        </div>
        <section className={styles.attributes_content}>
        <p>Âge :<span> {age}</span></p>
        <p>Genre :<span> {translateGender(gender)}</span></p>
        <p>Taille :<span> {convertCMHeightToMcM(height)}</span></p>
        <p>Poids :<span> {weight}kg</span></p>
        </section>
    </article>
    )
}

