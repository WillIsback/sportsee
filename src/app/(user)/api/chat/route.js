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

export async function POST(request) {
    const session = await verifySession();  
    if (session?.isAuth){
      try {
        const response = await askai(request);
        return Response.json({ messageAi: response.messageId })
      } catch (reason) {
        const error =
          reason instanceof Error ? reason.message : 'Unexpected exception'
        return new Response(error, { status: 500 })
      }
    }
    return { success: false, error: "erreur user non authentifié"}
}