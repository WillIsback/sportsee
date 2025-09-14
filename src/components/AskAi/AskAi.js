import styles from './AskAi.module.css';
import { IconAi } from '@/lib/icon';

export default function AskAi() {
    return (
         <section className={styles.askai_section}>
            <div className={styles.askai_section__title}>
                <IconAi />
                <h2>Posez vos questions sur votre programme, vos performances ou vos objectifs.</h2>
            </div>
            <button type='button' className={styles.askai__button}>
                <span>Lancer une conversation</span>
            </button>
         </section>
        )

}