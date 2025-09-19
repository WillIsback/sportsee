import { Mistral } from '@mistralai/mistralai';
import { userPrompt, coachNuserPrompt } from '@/lib/prompt';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

export default async function askai(request, session, objectif) {
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
        if (typeof(resp) !== 'string') return (JSON.stringify({ error: "An error Information", details: e.message }), { status: 403, statusText: "Internal Server Error" }) ;
        console.log('Chat AI réponse :', resp);
        // console.log('jsonResp  :', jsonResp);
        return new Response ((JSON.stringify(resp)), { status: 200, statusText: "OK!" });
    
    } catch (e) {
        console.log("error : ", e);
        return new Response(JSON.stringify({ error: "An error occurred", details: e.message }), { status: 500, statusText: "Internal Server Error" });
    }
}

