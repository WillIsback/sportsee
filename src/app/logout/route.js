/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/app/logout/route.js
    objectives: Route handlers pour la gestion de la suppresion du cookie de session pour le logout.
    lastUpdate : 07/09/2025
*/
import { logout } from '@/services/auth.services';

/**
 * Brief: Handler GET pour la déconnexion utilisateur en supprimant le cookie de session
 * @param {Request} request - Objet Request (non utilisé dans cette fonction)
 * @returns {Promise<Response>} Réponse HTTP confirmant la déconnexion
 */
export async function GET(request) {
    await logout();
    return new Response('Logout done', {
        status: 200,
    })
}