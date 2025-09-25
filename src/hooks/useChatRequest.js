import { useState, useTransition } from 'react';

/**
 * Brief: Hook personnalisé pour gérer les requêtes de chat avec l'IA
 * 
 * @returns {Array} Tableau contenant [isPending, response, executePostFetch] pour gérer l'état du chat
 */
export default function useChatRequest () {
    const [isPending, startTransition] = useTransition(false);
    const [response, setResponse] = useState({});

    /**
     * Brief: Fonction interne pour exécuter la requête POST vers l'API de chat
     * 
     * @param {Object} payload - Données à envoyer contenant le message utilisateur et le contexte
     */
    function executePostFetch(payload) {
        startTransition(async () => {
            try{ // bloc try/catch fetch route api/chat
                const rep =  await fetch('/api/chat', {
                method: "POST",
                body: JSON.stringify(payload)
                });
                // Gestion des erreurs HTTP
                if (!rep.ok) {
                    setResponse({
                        success: false,
                        aiMessage: null,
                        error: rep.status,
                        pending: isPending
                    });

                }
                if(rep.ok){
                    const response = await rep.json();
                    // console.log("useChatRequest response : ", response);
                    setResponse({
                        success: true,
                        aiMessage: response,
                        error: null,
                        pending: isPending
                    });
                }
            }catch(e){
                console.error("Error : ", e)
                setResponse({
                    success: false,
                    aiMessage: null,
                    error: e,
                    pending: isPending
                });
            }    
        });
    }
    return [isPending, response, executePostFetch]
}