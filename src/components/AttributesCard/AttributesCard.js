import styles from './AttributesCard.module.css';
import { UserProfileContext } from '@context/UserContext';
import { convertCMHeightToMcM, translateGender } from '@/lib/utils';
import { use } from 'react';


export default function AttributesCard() {
    const userData = use(UserProfileContext);
    const { age, gender, height, weight } = userData?.dataProfile;



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

