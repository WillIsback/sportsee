//   
/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/app/(user)/api/training-plan/generate/route.js
    objectives: Route handlers pour la gestion des requetes API mistral via le endpoint /api/training-plan/generate
    lastUpdate : 23/09/2025
*/
import { askaiPlan } from '@/services/askai.services';
import { verifySession } from '@/services/session.services';
import { MISTRAL_RATE_LIMIT } from '@/lib/constants';
import { rateLimitByKey } from '@/lib/askai.lib';

/*
    Fetch Error Message Handlers
*/

/**
 * Brief: Génère des messages d'erreur appropriés selon le code de statut HTTP pour la génération de plan
 * @param {number} statusCode - Code de statut HTTP de l'erreur
 * @returns {Object} Objet contenant messages d'erreur pour utilisateur et développeur
 */
export const ErrorMessage = (statusCode) => {
    switch(statusCode) {
        case 400: return {
            user: "Non authentifié",
            dev: "400: auth check pas validé"
        }
        case 401: return {
            user: "Identifiants incorrects",
            dev: "401: userId pas lisible" 
        } 
        case 403: return {
            user: "Limite de requête atteinte",
            dev: "403: RateLimit exceeded"
        } 
        case 404: return {
            user: "Service temporairement indisponible",
            dev: "404: Resource not found"
        } 
        case 405: return {
          user: "Mauvais format de réponse du model IA",
          dev: "L'objet JSON reçu par le server est incorrect"
        }
        case 500: return {
            user: "Erreur technique, veuillez réessayer",
            dev: "500: Server error"
        }
        default: return {
            user: "Une erreur inattendue s'est produite",
            dev: `Unknown error code: ${statusCode}`
        }
    }
}

/**
 * Brief: Handler POST pour la génération de plans d'entraînement IA avec authentification et rate limiting
 * @param {Request} request - Objet Request contenant les paramètres du plan d'entraînement
 * @returns {Promise<Response>} Réponse HTTP avec le plan d'entraînement généré ou un message d'erreur
 */
export async function POST(request) {
  const { limit, timeframe } = MISTRAL_RATE_LIMIT[0];
  console.log("limit, timeframe : ", limit, timeframe);
  const session = await verifySession();  
  if (session?.isAuth){
    try{
      await rateLimitByKey(session?.userId, limit, timeframe);
      try {
        const payload = await request.json();
        // console.log("/api/training-plan/generate message : ", message);
        const res = await askaiPlan(payload);
        console.log("reponse brut dans /api/training-plan/generate : ", res);
        // console.log("réponse reçu par /api/chat : ", JSON.parse(response));
        if(res.status === 200){
          const response = await res.json()
          return new Response ((JSON.stringify(response)), { status: 200, statusText: "OK!" });
        }
        else{
          if (res.status === 405){
            const { error, details } = await res.json();
            console.error(" status: ", res.status, "statusText: ", res.statusText, "details :", details);
            return new Response ((ErrorMessage(405).user+details), { status: res.status, statusText: res.statusText });
          }
          console.error(" status: ", res.status, "statusText: ", res.statusText);
          return new Response ((res.statusText), { status: res.status, statusText: res.statusText });
        }
      } catch (reason) {
        console.log("/api/training-plan/generate catch reason :", reason);
        return new Response(ErrorMessage(500).user, { status: 500 })
      }
    } catch(e){
      console.error("ErrorMessage :", e);
      return new Response(ErrorMessage(403).user, { status: 403 })
    }
  }
  return new Response(ErrorMessage(400).user, { status: 400 })
}