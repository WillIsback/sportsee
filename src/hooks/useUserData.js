/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/hooks/useUserData.js
    objectives: Hook custom pour le UserContext
    lastUpdate : 09/09/2025
*/

import { useState } from 'react';
import { convertDateToISO } from '@/lib/utils';
import { FetchUserActivity } from '@/lib/userData';
import { useQuery } from '@tanstack/react-query';

/**
 * Brief: Hook personnalisé pour gérer l'état des dates de début et fin de semaine
 * 
 * @param {string} defStartWeek - Date de début de semaine par défaut au format ISO
 * @param {string} defEndWeek - Date de fin de semaine par défaut au format ISO
 * @returns {Array} Tableau contenant [startWeek, setStartWeek, endWeek, setEndWeek]
 */
export const useDateState = (defStartWeek, defEndWeek) => {
    const [startWeek, setStartWeek] = useState(defStartWeek);
    const [endWeek, setEndWeek] = useState(defEndWeek);
    return [ startWeek, setStartWeek, endWeek, setEndWeek ];
}

/**
 * Brief: Hook personnalisé pour récupérer les sessions utilisateur sur une période donnée
 * 
 * @param {string} startWeek - Date de début de période au format ISO
 * @param {string} endWeek - Date de fin de période au format ISO
 * @returns {Object} Objet contenant {isPending, error, data, isFetching} de la requête TanStack Query
 */
export const useUserSessions = (startWeek, endWeek) => {
    // console.log("useUserSessions startWeek, endWeek :",startWeek, endWeek );
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: [`${startWeek}-${endWeek}`],
        queryFn : async () => {
            const response = await FetchUserActivity(startWeek, endWeek);
            return response.data; 
        },
    });
    if (isPending) return { isPending, error: null, data: null, isFetching };
    if (error) return { isPending: false, error, data: null, isFetching: false };
    // console.log("useUserSessions data :", data);
    return { isPending, error, data, isFetching };
};


/**
 * Brief: Hook personnalisé pour récupérer toutes les sessions utilisateur depuis l'année 2000
 * 
 * @returns {Object} Objet contenant {isPending, error, data, isFetching} de la requête TanStack Query
 */
export const useUserAllSessions = () => {
    const startWeek = convertDateToISO('2000-01-01');
    const endWeek = convertDateToISO(Date.now());
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['allSessionData'],
        queryFn : async () => {
            const response = await FetchUserActivity(startWeek, endWeek);
            return response.data; 
        },
    });
    if (isPending) return { isPending, error: null, data: null, isFetching };
    if (error) return { isPending: false, error, data: null, isFetching: false };
    return { isPending, error, data, isFetching };

};