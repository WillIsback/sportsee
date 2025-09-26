'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useTransition, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import ChatModal from '../ChatModal/ChatModal';

import ICLogo from '@/components/Logo/Logo';

import styles from './Hearder.module.css';
import Link from 'next/link';

/**
 * Brief: Composant header de navigation avec logo, liens et bouton de déconnexion
 * 
 * @returns {JSX.Element} Header complet avec navigation et fonctionnalités utilisateur
 */
export default function Header() {
    const router = useRouter();
    const path = usePathname();
    const [isPending, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);
    const [activePage, setActivePage] = useState({
        dashboard: false,
        modal: false,
        profile: false,
    });

    // console.log("path hearder", path);
    /**
     * Brief: Gère l'etat actif de la page actuel pour le style
     */
    useEffect(()=>{
        if (path==='/profile' && !showModal){
            setActivePage({
                dashboard: false,
                modal: false,
                profile: true,
            });
        }
        else if (path==='/dashboard' && !showModal){
            setActivePage({
                dashboard: true,
                modal: false,
                profile: false,
            });
        }
        else if (showModal){
            setActivePage({
                dashboard: false,
                modal: true,
                profile: false,
            });
        }
        else {
            setActivePage({
                dashboard: false,
                modal: false,
                profile: false,
            });
        }
    },[path, showModal]);

    /**
     * Brief: Gère la déconnexion utilisateur et redirection vers login
     */
    const onClick = () => {
        startTransition(async () => {
            const logout = await fetch('/logout', {
            method: "GET",
        });
        if(logout.ok){
            router.push('/login');
        }
        })
    }

    // console.log("activePage : ", activePage);
    return (
        <header className={styles.Header}>
            <div className={styles.logo}>
                <ICLogo />
            </div>
            <nav className={styles.Menu}>
                <ul>
                    <li>
                        <Link href='/dashboard'>  
                        <p className={activePage.dashboard ? `${styles.activePage}` : ''}>Dashboard</p>
                        </Link>
                    </li>
                    <li onClick={() => setShowModal(true)} className={styles.chatModal}>
                            <p className={activePage.modal ? `${styles.activePage}` : ''}>Coach AI</p>
                        {showModal && createPortal(
                            <ChatModal onClose={() => setShowModal(false)} />,
                            document.body
                        )}
                    </li>
                    <li>
                        <Link href='/profile'>
                        <p className={activePage.profile ? `${styles.activePage}` : ''}>Mon Profil</p>
                        </Link>
                    </li>
                    <div className={styles.divider}></div>
                    <button type='button' onClick={onClick} disabled={isPending}>
                        <span>Se déconnecter</span>
                    </button>
                </ul>
            </nav>
        </header>
    )
}