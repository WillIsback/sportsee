/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/services/auth.services.js
    objectives: Mettre en place le code nécessaire à l'authenfication avec l'API REST backend.
    lastUpdate : 07/09/2025
*/
'use server';

import { postLogin } from '@/services/api.services';
import { createSession, deleteSession } from '@/services/session.services';

/*
    Fonction de base de gestion du l'authentifacation a l'API
*/
export const login = async (prevState, queryData) => {
    if(!queryData){ return { success: false, error: "Echec de la récupération du Formadata" }};
    const username = queryData?.get("username");
    const password = queryData?.get("password",);
    // console.log("username : ", username);
    // console.log("password : ", password);
    const { success, data, error } = await postLogin(username, password);
    // console.log("postLogin success :", success);
    if (success) {
        // Redirection ou mise à jour de l'état
        const token = data?.token;
        const userId = data?.userId;
        await createSession({ token: token, userId: userId });
        return { success: true, message: `Bienvenue ${username}` }
    } else {
        // Affichage du message d'erreur à l'utilisateur
        console.error("Erreur:", error?.dev)
        return { success: false, error: "Echec de l'authentification" }
    }
}

export const logout = async () => {
  await deleteSession();
}