//   
/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/app/(user)/api/chat/route.js
    objectives: Route handlers pour la gestion des requetes API mistral via le endpoint /api/chat
    lastUpdate : 15/09/2025
*/
import { askaiChat } from '@/services/askai.services';
import { withAPIMiddleware } from '@/lib/api-mistral-middleware';

/**
 * Brief: Handler POST pour les requêtes de chat IA avec vérification d'authentification et rate limiting
 * @param {Request} request - Objet Request contenant le payload de la requête
 * @returns {Promise<Response>} Réponse HTTP avec le résultat du chat IA ou un message d'erreur
 */
const chatHandler = async (payload, session) => {
    const res = await askaiChat(payload);
    const response = await res.text();
    return new Response(JSON.stringify(response), { status: 200, statusText: "OK!" });
};

export const POST = withAPIMiddleware(chatHandler);