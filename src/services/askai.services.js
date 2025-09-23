import { Mistral } from '@mistralai/mistralai';
import { userPrompt, coachNuserPrompt, PlannerPrompt } from '@/lib/prompt';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

export async function askaiChat(request) {
    // console.log("la request envoyé a mistral est :", request);
    const message = coachNuserPrompt(request);
    console.log("la request envoyé a mistral est :", message);
    try {
        const chatResponse = await client.chat.complete({
            model: "mistral-small-2402",
            messages: coachNuserPrompt(request),
            maxTokens: 1024,
        });
        const resp = (chatResponse?.choices[0]?.message?.content);
        //chatResponse.choices?.[0]?.message?.content?.[1]?.text; // Format pour mode thinking magistral
        // const jsonResp = JSON.stringify(chatResponse);
        // console.log('Chat AI réponse :', resp);
        // console.log('jsonResp  :', jsonResp);
        return new Response ((JSON.stringify(resp)), { status: 200, statusText: "OK!" });
    
    } catch (e) {
        console.log("error catch in Chat  askai.services : ", e.statusCode, e.rawResponse.Response.statusText);
        throw new Response(JSON.stringify({ error: "An error occurred", details: e.message }), { status: e.statusCode, statusText: e.message });
    }
}


export async function askaiPlan(request) {
    // console.log("la request envoyé a mistral est :", request);
    const message = PlannerPrompt(request);
    // console.log("la request envoyé a mistral est :", message);
    try {
        const chatResponse = await client.chat.complete({
            model: "mistral-small-2402",
            messages: PlannerPrompt(request),
            maxTokens: 4096,
            responseFormat: {type: 'json_object'},
        });

        console.log('Contenu parsé:', chatResponse?.choices[0]?.message?.content);
        const resp = (chatResponse?.choices[0]?.message?.content);
        // console.log('jsonResp  :', jsonResp);
        return new Response ((JSON.stringify(resp)), { status: 200, statusText: "OK!" });
    
    } catch (e) {
        console.log("error catch in Plan  askai.services : ", e.statusCode);
        throw new Response(JSON.stringify({ error: "An error occurred", details: e.message }), { status: e.statusCode, statusText: e.message });
    }
}

