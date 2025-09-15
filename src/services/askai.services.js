import { Mistral } from '@mistralai/mistralai';
import { userPrompt } from '@/lib/prompt';

const apiKey = process.env.MISTRAL_API_KEY;

const client = new Mistral({apiKey: apiKey});

export default async function askai(message) {
    const request = message ? message : "Qu'elle est la capitale de la France";
    const chatResponse = await client.chat.complete({
        model: "magistral-medium-latest",
        messages: userPrompt(request)
    });
    const resp = chatResponse.choices?.[0]?.message?.content?.[1]?.text;
    // const jsonResp = JSON.stringify(chatResponse);
    console.log('Chat AI réponse :', resp);
    // console.log('jsonResp  :', jsonResp);
    return resp;
}

