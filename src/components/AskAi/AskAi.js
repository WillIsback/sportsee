'use client';
import styles from './AskAi.module.css';
import { IconAi } from '@/lib/icon';
import ChatModal from '../ChatModal/ChatModal';
import { createPortal } from 'react-dom';
import { useState } from 'react';

/**
 * Brief: Composant d'interface pour lancer des conversations avec l'IA sportive
 * 
 * @returns {JSX.Element} Section avec bouton pour ouvrir la modal de chat IA
 */
export default function AskAi() {
    const [showModal, setShowModal] = useState(false);
    
    return (
         <section className={styles.askai_section}>
            <div className={styles.askai_section__title}>
                <IconAi />
                <h2>Posez vos questions sur votre programme, vos performances ou vos objectifs.</h2>
            </div>
            <button type='button' className={styles.askai__button} onClick={() => setShowModal(true)} >
                <span>Lancer une conversation</span>
                {showModal && createPortal(
                    <ChatModal onClose={() => setShowModal(false)} />,
                    document.body
                )}
            </button>
         </section>
        )

}