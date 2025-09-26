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
import { DEMO } from '@/lib/constants';
import mockData from '@/data/mockData.json';
import { cache } from 'react';

/**
 * Brief: Fonction helper pour simuler les données utilisateur en mode DEMO
 * @param {string} userId - ID utilisateur (optionnel en mode demo)
 * @returns {Object} Données utilisateur simulées
 */
function getMockUserInfo(userId = 'user123') {
    const user = mockData.find(user => user.id === userId) || mockData[0];
    
    // ✅ Traitement identique au backend pour les statistiques
    const runningData = user.runningData || [];
    const totalDistance = runningData.reduce(
        (sum, session) => sum + session.distance,
        0
    ).toFixed(1);
    const totalSessions = runningData.length;
    const totalDuration = runningData.reduce(
        (sum, session) => sum + session.duration,
        0
    );

    // ✅ Format du profil utilisateur identique
    const userProfile = {
        firstName: user.userInfos.firstName,
        lastName: user.userInfos.lastName,
        createdAt: user.userInfos.createdAt,
        age: user.userInfos.age,
        weight: user.userInfos.weight,
        height: user.userInfos.height,
        profilePicture: user.userInfos.profilePicture,
        gender: user.userInfos.gender,
    };

    return {
        success: true,
        data: {
            profile: userProfile,
            statistics: {
                totalDistance,
                totalSessions,
                totalDuration,
            },
            // ✅ Ajoutez le weeklyGoal si nécessaire
            weeklyGoal: user.weeklyGoal || user.goal || 2
        }
    };
}

/**
 * Brief: Fonction helper pour simuler les activités en mode DEMO
 * @param {string} userId - ID utilisateur
 * @param {string} startWeek - Date de début (format ISO)
 * @param {string} endWeek - Date de fin (format ISO)
 * @returns {Object} Données d'activité simulées
 */
function getMockUserActivity(userId = 'user123', startWeek, endWeek) {
    const user = mockData.find(user => user.id === userId) || mockData[0];
    const runningData = user.runningData || [];
    
    // ✅ Traitement identique au backend pour le filtrage
    if (startWeek && endWeek) {
        // Convertir les chaînes de semaine en objets Date
        const startDate = new Date(startWeek);
        const endDate = new Date(endWeek);
        const now = new Date();
        
        // Filtrer les sessions entre startWeek et endWeek, en excluant les dates futures
        const filteredSessions = runningData.filter((session) => {
            const sessionDate = new Date(session.date);
            return sessionDate >= startDate && sessionDate <= endDate && sessionDate <= now;
        });

        // Trier par date croissante
        const sortedSessions = filteredSessions.sort((a, b) => 
            new Date(a.date) - new Date(b.date)
        );

        return {
            success: true,
            data: sortedSessions  // ✅ Retour direct du tableau comme le backend
        };
    }
    
    return {
        success: true,
        data: runningData
    };
}

/**
 * Brief: Filtre et parse les données utilisateur reçues de l'API
 * 
 * @param {string} userData - Données utilisateur au format JSON string
 * @returns {Object} Données utilisateur parsées
 */
function userDataFilter(userData) {
    return JSON.parse(userData)
}

/**
 * Brief: Server Action pour récupérer les informations utilisateur avec vérification de session
 * 
 * @returns {Object} Objet {success: boolean, data?: Object, error?: string} avec les informations utilisateur
 */
export const FetchUserInfo = cache(async () => {
    // Mode DEMO : pas besoin d'authentification, retourne directement les mock data
    if (DEMO) {
        console.log("🎭 MODE DEMO : Utilisation des données mockées");
        const mockResult = getMockUserInfo();
        return {
            success: true,
            data: JSON.parse(JSON.stringify(mockResult.data))
        };
    }
    
    // Mode PRODUCTION : logique existante
    const session = await verifySession();
    if (session?.isAuth) {
        try {
            const res = await getUserInfo(session?.token);
            if (res.success) {
                const rawData = JSON.stringify(res.data);
                const filteredUserInfo = userDataFilter(rawData);
                return { success: true, data: filteredUserInfo };
            }
            return { success: false, error: res?.error };
        } catch(e) {
            console.error("Failed FetchUserInfo : ", e);
            return { success: false, error: `Failed FetchUserInfo : ${e}` };
        }
    }
    return { success: false, error: "erreur user non authentifié" };
});

/**
 * Brief: Server Action pour récupérer les activités utilisateur sur une période avec vérification de session
 * 
 * @param {string} startWeek - Date de début de période au format ISO
 * @param {string} endWeek - Date de fin de période au format ISO
 * @returns {Object} Objet {success: boolean, data?: Object, error?: string} avec les activités utilisateur
 */
export const FetchUserActivity = cache(async (startWeek, endWeek) => {
    // Mode DEMO : pas besoin d'authentification
    if (DEMO) {
        console.log("🎭 MODE DEMO : Utilisation des données d'activité mockées");
        const mockResult = getMockUserActivity('user123', startWeek, endWeek);
        return {
            success: true,
            data: JSON.parse(JSON.stringify(mockResult.data))
        };
    }
    
    // Mode PRODUCTION : logique existante
    const session = await verifySession();
    if (session?.isAuth) {
        try {
            const res = await getUserActivity(session?.token, startWeek, endWeek);
            if (res.success) {
                const rawData = JSON.stringify(res.data);
                const filteredUserInfo = userDataFilter(rawData);
                return { success: true, data: filteredUserInfo };
            }
            return { success: false, error: res?.error };
        } catch(e) {
            console.error("Failed FetchUserActivity : ", e);
            return { success: false, error: `Failed FetchUserActivity : ${e}` };
        }
    }
    return { success: false, error: "erreur user non authentifié" };
});
