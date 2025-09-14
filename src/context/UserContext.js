/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/app/(user)/context/UserContext.js
    objectives: Mettre en place le partage des données au route groupe (user) qui est accessible aux utilisateur authentifié.
    LastUpdate: 09/09/2025
*/
'use client';

import { createContext } from 'react'
import { FetchUserInfo } from '@/lib/userData';
import { useQuery } from '@tanstack/react-query'



export const UserProfileContext = createContext();
export const UserStatsContext = createContext();



export function UserDataProvider({ children }) {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const response = await FetchUserInfo();
            return response;
        },
    });
    if (isPending) return 'Loading...'
    if (error) return 'An error has occurred: ' + error?.message;

    const dataProfile = data?.data.profile;
    const dataStats = data?.data.statistics;
    // console.log("data : ", data);
    // console.log("dataProfile : ", dataProfile, "dataStats :", dataStats);
    return (
        <UserProfileContext.Provider value={{ isPending, error, dataProfile, isFetching }}>
            <UserStatsContext.Provider value={{ isPending, error, dataStats, isFetching }}>
            {children}
            </UserStatsContext.Provider>
        </UserProfileContext.Provider>
    );
}
