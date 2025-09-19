//   
/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/app/(user)/api/chat/route.js
    objectives: Route handlers pour la gestion des requetes API mistral via le endpoint /api/chat
    lastUpdate : 15/09/2025
*/
import askai from '@/services/askai.services';
import { verifySession } from '@/services/session.services';
import { MISTRAL_RATE_LIMIT } from '@/lib/constants';
import { rateLimitByKey } from '@/lib/askai.lib';

/*
    Fetch Error Message Handlers
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


export async function POST(request) {
  const { tier, limit, timeframe } = MISTRAL_RATE_LIMIT[0];
  console.log("limit, timeframe : ", limit, timeframe);
  const session = await verifySession();  
  if (session?.isAuth){
    try{
      await rateLimitByKey(session?.userId, limit, timeframe);
      try {
        const payload = await request.json();
        // console.log("/api/chat message : ", message);
        const res = await askai(payload);
        const response = await res.text()
        console.log("réponse reçu par /api/chat : ", JSON.parse(response));
        return new Response ((JSON.stringify(response)), { status: 200, statusText: "OK!" });
      } catch (reason) {
        return new Response(ErrorMessage(500).user, { status: 500 })
      }
    } catch(e){
      console.error("ErrorMessage :", e);
      return new Response(ErrorMessage(403).user, { status: 403 })
    }
  }
  return new Response(ErrorMessage(400).user, { status: 400 })
}