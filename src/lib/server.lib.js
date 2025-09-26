/**
 * Brief: Ajoute un timeout à une promesse existante
 * @param {Promise} promise - La promesse à chronométrer
 * @param {number} ms - Temps limite en millisecondes (défaut: 30000)
 * @returns {Promise} Promesse qui se résout ou rejette selon le timeout
 */
export function withTimeout(promise, ms = 30000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ms);

    return Promise.race([
        promise,
        new Promise((_, reject) => {
            controller.signal.addEventListener('abort', () => {
                reject(new Error(`Timeout après ${ms}ms`));
            });
        })
    ]).finally(() => clearTimeout(timeoutId));
}