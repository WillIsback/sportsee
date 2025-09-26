// lib/api-mistral-middleware.js
import { verifySession } from '@/services/session.services';
import { MISTRAL_RATE_LIMIT } from '@/lib/constants';
import { rateLimitByKey } from '@/lib/askai.lib';

/**
 * Brief: Génère des messages d'erreur appropriés selon le code de statut HTTP pour la génération de plan
 * @param {number} statusCode - Code de statut HTTP de l'erreur
 * @returns {Object} Objet contenant messages d'erreur pour utilisateur et développeur
 */
export const ErrorMessage = (statusCode) => {
    switch(statusCode) {
        case 400: return { user: "Non authentifié", dev: "400: auth check pas validé" }
        case 401: return { user: "Identifiants incorrects", dev: "401: userId pas lisible" }
        case 403: return { user: "Limite de requête atteinte", dev: "403: RateLimit exceeded" }
        case 404: return { user: "Service temporairement indisponible", dev: "404: Resource not found" }
        case 405: return { user: "Mauvais format de réponse du model IA", dev: "L'objet JSON reçu par le server est incorrect" }
        case 500: return { user: "Erreur technique, veuillez réessayer", dev: "500: Server error" }
        default: return { user: "Une erreur inattendue s'est produite", dev: `Unknown error code: ${statusCode}` }
    }
};

/**
 * Brief: Wrapper middleware pour simplifier et optimiser les endpoints chat et plan
 * @param {function} handler - route handler/endpoint.
 * @param {param} request parametre requete de la fonction endpoint POST
 * @returns {function} retourne le endpoint wrapper par la gestion des error messages et du rate limit.
 */
export const withAPIMiddleware = (handler) => async (request) => {
    const { limit, timeframe } = MISTRAL_RATE_LIMIT[0];
    const session = await verifySession();
    
    if (!session?.isAuth) {
        return new Response(ErrorMessage(400).user, { status: 400 });
    }
    
    try {
        await rateLimitByKey(session.userId, limit, timeframe);
        const payload = await request.json();
        return await handler(payload, session);
    } catch (error) {
        // Analyse du type d'erreur pour déterminer la réponse appropriée
        if (error.message?.includes('rate limit') || error.name === 'RateLimitError') {
            console.error("Rate limit error:", error);
            return new Response(ErrorMessage(403).user, { status: 403 });
        }
        
        console.error("API middleware error:", error);
        return new Response(ErrorMessage(500).user, { status: 500 });
    }
};