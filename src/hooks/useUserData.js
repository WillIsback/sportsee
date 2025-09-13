/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/hooks/useUserData.js
    objectives: Hook custom pour le UserContext
    lastUpdate : 09/09/2025
*/

import { UserProfileContext, UserStatsContext } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { convertDateToISO, incrementWeek, decrementWeek } from '@/lib/utils';
import { FetchUserActivity } from '@/lib/userData';

export const useUserProfile = () => {
    const context = useContext(UserProfileContext); 
    if (!context) {
        throw new Error('useUser doit être utilisé dans un UserProvider');
    }
    return context;
};

export const useUserStats = () => {
    const context = useContext(UserStatsContext); 
    if (!context) {
        throw new Error('useUser doit être utilisé dans un UserProvider');
    }
    return context;
};


export const useUserSessions = () => {
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startWeek, setStartWeek] = useState(convertDateToISO(decrementWeek(Date.now())));
    const [endWeek, setEndWeek] = useState(convertDateToISO(Date.now()));

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await FetchUserActivity(startWeek, endWeek);
                if (res.success) {
                    // console.log("Fetching session data from ", startWeek, " to ", endWeek , "donne : ", res.data);
                    setSessionData(res.data);
                } else {
                    setError(res.error);
                }
            } catch (networkError) {
                setError("Erreur de connexion");
            } finally {
                setLoading(false);
            }
        };

        if (startWeek && endWeek) {
            fetchData();
        }
    }, [startWeek, endWeek]);

    return [startWeek, setStartWeek, endWeek, setEndWeek, { error , loading, sessionData } ];
};




export const useCurrentWeek = () => {
    const [currentWeek, setCurrentWeek] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const startWeek = decrementWeek(convertDateToISO(Date.now()));
    const endWeek = convertDateToISO(Date.now());

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await FetchUserActivity(startWeek, endWeek);
                if (res.success) {
                    // console.log("Fetching session data from ", startWeek, " to ", endWeek , "donne : ", res.data);
                    setSessionData(res.data);
                } else {
                    setError(res.error);
                }
            } catch (networkError) {
                setError("Erreur de connexion");
            } finally {
                setLoading(false);
            }
        };

        if (startWeek && endWeek) {
            fetchData();
        }
    }, []);
}

export const useUserAllSessions = () => {
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const startWeek = convertDateToISO('2000-01-01');
    const endWeek = convertDateToISO(Date.now());
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await FetchUserActivity(startWeek, endWeek);
                if (res.success) {
                    // console.log("Fetching session data from ", startWeek, " to ", endWeek , "donne : ", res.data);
                    setSessionData(res.data);
                } else {
                    setError(res.error);
                }
            } catch (networkError) {
                setError("Erreur de connexion");
            } finally {
                setLoading(false);
            }
        };
        if (startWeek && endWeek) {
            fetchData();
        }
    }, []);
    return { error , loading, sessionData } ;

};