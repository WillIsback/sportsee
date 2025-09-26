//   
/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/app/(user)/api/training-plan/generate/route.js
    objectives: Route handlers pour la gestion des requetes API mistral via le endpoint /api/training-plan/generate
    lastUpdate : 23/09/2025
*/
import { askaiPlan } from '@/services/askai.services';
import { withAPIMiddleware, ErrorMessage } from '@/lib/api-mistral-middleware';


/**
 * Brief: Handler POST pour la génération de plans d'entraînement IA avec authentification et rate limiting
 * @param {Request} request - Objet Request contenant les paramètres du plan d'entraînement
 * @returns {Promise<Response>} Réponse HTTP avec le plan d'entraînement généré ou un message d'erreur
 */
const planHandler = async (payload) => {
    const res = await askaiPlan(payload);
    
    if (res.status === 200) {
        const response = await res.json();
        return new Response(JSON.stringify(response), { status: 200, statusText: "OK!" });
    }
    
    if (res.status === 405) {
        const { error, details } = await res.json();
        console.error("Validation error:", details);
        return new Response(ErrorMessage(405).user + details, { status: 405 });
    }
    
    return new Response(res.statusText, { status: res.status });
};

export const POST = withAPIMiddleware(planHandler);