import { Mistral } from '@mistralai/mistralai';
import { userPrompt } from '@/lib/prompt';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

export default async function askai(message) {
    const request = message ? message : "Qu'elle est la capitale de la France";
    console.log("le message envoyé a mistral est :", request);
    try {
        const chatResponse = await client.chat.complete({
            model: "mistral-small-latest",
            messages: userPrompt(request)
        });
        const resp = (chatResponse?.choices[0]?.message?.content);
        //chatResponse.choices?.[0]?.message?.content?.[1]?.text; // Format pour mode thinking magistral
        // const jsonResp = JSON.stringify(chatResponse);
        console.log('Chat AI réponse :', resp);
        // console.log('jsonResp  :', jsonResp);
        return new Response ((JSON.stringify(resp)), { status: 200, statusText: "OK!" });
    
    } catch (e) {
        console.log("error : ", e);
        return new Response(JSON.stringify({ error: "An error occurred", details: e.message }), { status: 500, statusText: "Internal Server Error" });
    }
}

