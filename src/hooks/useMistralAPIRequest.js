// hooks/useMistralAPIRequest.js - Hook générique
import { useState, useTransition } from 'react';

/**
 * Brief: Hook générique pour gérer les requêtes API avec gestion d'erreurs complète
 * @param {string} endpoint - URL de l'endpoint API
 * @returns {Array} [isPending, response, executeRequest]
 */
export function useMistralAPIRequest(endpoint) {
    const [isPending, startTransition] = useTransition();
    const [response, setResponse] = useState({
        success: null,
        data: null,
        error: null,
        errorCode: null,
        pending: false
    });

    function executeRequest(payload) {
        startTransition(async () => {
            try {
                const rep = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!rep.ok) {
                    // Récupération du message d'erreur détaillé du serveur
                    const errorText = await rep.text();
                    setResponse({
                        success: false,
                        data: null,
                        error: errorText, // Message utilisateur du serveur
                        errorCode: rep.status,
                        pending: isPending
                    });
                    return;
                }

                const responseData = await rep.json();
                setResponse({
                    success: true,
                    data: responseData,
                    error: null,
                    errorCode: null,
                    pending: isPending
                });

            } catch (networkError) {
                console.error("Network error:", networkError);
                setResponse({
                    success: false,
                    data: null,
                    error: "Erreur de connexion réseau",
                    errorCode: 0,
                    pending: isPending
                });
            }
        });
    }

    return [isPending, response, executeRequest];
}