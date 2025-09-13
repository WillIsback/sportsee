'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import styles from './Hearder.module.css';
import Link from 'next/link';
export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

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
            <h1><img src="/image/Logo.png" alt="logo sportsee" className={styles.logo}/></h1>
            <nav className={styles.Menu}>
                <ul>
                    <li>
                        <Link href='/dashboard'>  
                        <p>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <p>Coach AI</p>
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