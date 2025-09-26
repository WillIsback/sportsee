import { Mistral } from '@mistralai/mistralai';
import { coachNuserPrompt, PlannerPrompt } from '@/lib/prompt';
import { validateNGenerateResponse } from '@/lib/askai.lib';
import { withTimeout } from '@/lib/server.lib';
import { workoutProgramMockData, DEMO, MISTRAL_CONFIG } from '@/lib/constants';
import { withModelConfig } from '@/lib/modelconfig';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

/**
 * Brief: Communique avec l'IA Mistral pour obtenir des réponses de coaching sportif
 *
 * @param {Object} request - Requête utilisateur contenant le message et le contexte
 * @returns {Response} Réponse HTTP avec le contenu généré par l'IA
 */
async function rawAskaiChat(request) {
    // console.log("la request envoyé a mistral est :", request);
    const message = coachNuserPrompt(request);
    console.log("la request envoyé a mistral est :", message);
    try {
        const chatResponse = await withTimeout(
            client.chat.complete({
                model: MISTRAL_CONFIG.model,
                messages: coachNuserPrompt(request),
                maxTokens: 1024,
            }),
            20000 // 20s
        );
        const resp = (chatResponse?.choices[0]?.message?.content);
        // console.log('Chat AI réponse :', resp);
        return new Response ((JSON.stringify(resp)), { status: 200, statusText: "OK!" });

    } catch (e) {
        console.log("error catch in Chat  askai.services : ", e.statusCode, e.rawResponse.Response.statusText);
        throw new Response(JSON.stringify({ error: "An error occurred", details: e.message }), { status: e.statusCode, statusText: e.message });
    }
}

export const askaiChat = withModelConfig(rawAskaiChat);

/**
 * Brief: Génère un planning d'entraînement personnalisé via l'IA Mistral
 *
 * @param {Object} request - Requête contenant profil utilisateur, données et objectifs
 * @returns {Response} Planning d'entraînement validé au format JSON
 */
async function rawAskaiPlan(request) {
    try {
        if (!DEMO){
            const chatResponse = await withTimeout(
                    client.chat.complete({
                    model: MISTRAL_CONFIG.model,
                    messages: PlannerPrompt(request),
                    maxTokens: 4096,
                    responseFormat: {type: 'json_object'},
                }),
                20000 // 20s
            );
            const resp = JSON.parse(chatResponse?.choices[0]?.message?.content);

            console.log("Type de la réponse de l'api mistral :", typeof(resp));
            // console.log("Premier exercice semaine 1:", resp['semaine 1'].content[0]);
            console.log("Structure complète:", JSON.stringify(resp['semaine 1'].content[0], null, 2));
            return validateNGenerateResponse(resp);
        } else {
            const resp = await workoutProgramMockData(); // demo
            return validateNGenerateResponse(resp);
        }
    } catch (e) {
        console.log("error catch in Plan  askai.services : ", e.statusCode);
        throw new Response(JSON.stringify({ error: "An error occurred", details: e.message }), { status: e.statusCode, statusText: e.message });
    }
}

export const askaiPlan = withModelConfig(rawAskaiPlan);
