/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/lib/userData.js
    objectives: Mettre en place les servers action qui verifie les permisions et appel les services
    lastUpdate : 09/09/2025
*/
'use server';

import { verifySession } from '@/services/session.services';
import { getUserInfo, getUserActivity } from '@/services/api.services';
import { cache } from 'react';


function userDataFilter(userData) {
    return JSON.parse(userData)
}

export const FetchUserInfo = cache(async () => {
    // 1. Auth Check
    const session = await verifySession();  

    // 2. Fetch Data
    if (session?.isAuth){
        try {
            const res = await getUserInfo(session?.token);
            
            if (res.success)
            {
                const rawData = JSON.stringify(res.data);
                // Filter useInfo for client application
                const filteredUserInfo = userDataFilter(rawData);
                // console.log("filteredUserInfo : ", filteredUserInfo)
                return { success: true, data: filteredUserInfo}
            }
            return { success: false, error: res?.error }
        } catch(e){
            console.error("Failed FetchUserInfo : ", e)
            return { success: false, error: `Failed FetchUserInfo : , ${e}` }
        }
    }
    return { success: false, error: "erreur user non authentifié"}
});

export const FetchUserActivity = cache(async (startWeek, endWeek) => {
    // 1. Auth Check
    const session = await verifySession();  

    // 2. Fetch Data
    if (session?.isAuth){
        try {
            const res = await getUserActivity(session?.token, startWeek, endWeek);
            if (res.success)
            {
                const rawData = JSON.stringify(res.data);
                // Filter useInfo for client application
                const filteredUserInfo = userDataFilter(rawData);
                // console.log("filteredUserInfo : ", filteredUserInfo)
                return { success: true, data: filteredUserInfo}
            }
            return { success: false, error: res?.error }
        } catch(e){
            console.error("Failed FetchUserInfo : ", e)
            return { success: false, error: `Failed FetchUserInfo : , ${e}` }
        }
    }
    return { success: false, error: "erreur user non authentifié"}
});

