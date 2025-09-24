import { useState, useTransition } from 'react';

export default function usePlanRequest () {
    const [isPending, startTransition] = useTransition(false);
    const [error, setError] = useState(false);
    const [response, setResponse] = useState({});

    function executePostFetch(payload) {
        startTransition(async () => {
            try{ // bloc try/catch fetch route api/chat
                const rep =  await fetch('/api/training-plan/generate', {
                method: "POST",
                body: JSON.stringify(payload)
                });
                // Gestion des erreurs HTTP
                console.log ("rep status code : ", rep.status);
                if (!rep.ok) {
                    console.error("executPostFetch usePlanRequest errror status code :", rep.status, rep.statusText)
                    setError(true);
                    setResponse({
                        success: false,
                        planning: null,
                        error: rep.status,
                        pending: isPending
                    });
                }
                if(rep.ok){
                    const response = await rep.json();
                    console.log("usePlanRequest response : ", response);
                    setError(false);
                    setResponse({
                        success: true,
                        planning: response,
                        error: null,
                        pending: isPending
                    });
                }
            }catch(e){
                console.error("Error : ", e)
                setError(true);
                setResponse({
                    success: false,
                    planning: null,
                    error: e,
                    pending: isPending
                });
            }    
        });
    }
    return [isPending, error, response, executePostFetch]
}