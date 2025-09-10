/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/app/(user)/context/UserContext.js
    objectives: Mettre en place le partage des données au route groupe (user) qui est accessible aux utilisateur authentifié.
    LastUpdate: 09/09/2025
*/
'use client';

import { createContext, useEffect, useState } from 'react'
import { FetchUserInfo } from '@/lib/userData';
export const UserProfileContext = createContext();
export const UserStatsContext = createContext();

export function UserDataProvider({ children }) {
    const [userProfileData, setUserProfileData] = useState(null);
    const [userStatsData, setUserStatsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const userInfo = async () => {
            const res = await FetchUserInfo();
            return res// (res.success ?  res?.data :  res?.error);
        };
        userInfo()
        .then((info) => {
            if (info.success) {
                setUserProfileData(info.data.profile);
                setUserStatsData(info.data.statistics);
            } else {
                setError(info.error);
            }
        })
        .catch((networkError) => {
            // Vraies erreurs JavaScript (réseau, etc.)
            console.error("Network/JS error:", networkError);
            setError("Erreur de connexion");
        })
        .finally(() => {
            setLoading(false);
        })
    }, []);


    return (
        <UserProfileContext.Provider value={{ userProfileData, loading, error }}>
            <UserStatsContext.Provider value={{ userStatsData, loading, error }}>
            {children}
            </UserStatsContext.Provider>
        </UserProfileContext.Provider>
    );
}
