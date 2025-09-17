'use client';

import { useRouter } from 'next/navigation';
import { useTransition, useState } from 'react';
import { createPortal } from 'react-dom';

import ChatModal from '../ChatModal/ChatModal';

import ICLogo from '@/components/Logo/Logo';

import styles from './Hearder.module.css';
import Link from 'next/link';
export default function Header() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showModal, setShowModal] = useState(false);

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

    return (
        <header className={styles.Header}>
            <div className={styles.logo}>
                <ICLogo />
            </div>
            <nav className={styles.Menu}>
                <ul>
                    <li>
                        <Link href='/dashboard'>  
                        <p>Dashboard</p>
                        </Link>
                    </li>
                    <li onClick={() => setShowModal(true)} className={styles.chatModal}>
                            <p>Coach AI</p>
                        {showModal && createPortal(
                            <ChatModal onClose={() => setShowModal(false)} />,
                            document.body
                        )}
                    </li>
                    <li>
                        <Link href='/profile'>
                        <p>Mon Profil</p>
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