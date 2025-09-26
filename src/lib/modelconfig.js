import { MISTRAL_CONFIG } from "./constants";

/**
 * Brief: Wrap la fonction d'appel à l'API mistral /
 * pour appliquer une configuration des tokens en fonction du modele
 * 
 * @param {function} apiCall - function d'appel API mistrall
 * @param {params} params les paramètres propres de la fonction dans le wrapper
 * @returns {function} retourne la fonction wrappé
 */
export const withModelConfig = (apiCall) => (params) => {
  return apiCall({
    ...params,
    model: MISTRAL_CONFIG.model,
    maxTokens: MISTRAL_CONFIG.maxTokens
  });
};