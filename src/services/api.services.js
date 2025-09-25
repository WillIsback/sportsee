/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/services/api.services.js
    objectives: Mettre en place le code nécessaire à l'interface CRUD avec l'API REST backend.
    LastUpdate: 07/09/2025
*/

const backendApiUrl =  "http://localhost:8000/api/"

/*
    Fetch Error Message Handlers
*/
/**
 * Brief: Convertit un code de statut HTTP en message d'erreur utilisateur et développeur
 * 
 * @param {number} statusCode - Code de statut HTTP de la réponse de l'API
 * @returns {Object} Objet contenant {user: string, dev: string} avec messages d'erreur
 */
export const getErrorMessage = (statusCode) => {
    switch(statusCode) {
        case 400: return {
            user: "Login ou mot de passe manquant",
            dev: "Bad Request (missing username/password)"
        }
        case 401: return {
            user: "Identifiants incorrects",
            dev: "401: Unauthorized (missing or invalid token)" 
        } 
        case 403: return {
            user: "Accès refusé",
            dev: "403: Forbidden (invalid token)"
        } 
        case 404: return {
            user: "Service temporairement indisponible",
            dev: "404: Resource not found"
        } 
        case 500: return {
            user: "Erreur technique, veuillez réessayer",
            dev: "500: Server error"
        }
        default: return {
            user: "Une erreur inattendue s'est produite",
            dev: `Unknown error code: ${statusCode}`
        }
    }
}

/*
    fonction générique Request pour les differentes opérations CRUD
*/
/**
 * Brief: Fonction générique pour effectuer des requêtes HTTP vers l'API backend
 * 
 * @param {string} endpoint - Endpoint de l'API à appeler (relatif à l'URL de base)
 * @param {Object} payload - Configuration de la requête {method, headers, body, authorization}
 * @returns {Request} Objet Request configuré pour l'appel à l'API
 */
const request = (endpoint, payload) => {
    const { method, headers, body, authorization } = payload
    const request = new Request(`${backendApiUrl}${endpoint}`, {
        method: method,
        headers: headers,
        body: body,
        Authorization: authorization,
    })
    // console.log('request : ', request)
    return request

}

/*
    POST /login - Authenticates a user and returns a JWT token
    Required body: { "username": "string", "password": "string" }
    Returns: { success: boolean, data?: any, error?: { user: string, dev: string } }
*/
/**
 * Brief: Authentifie un utilisateur auprès de l'API et retourne un token JWT
 * 
 * @param {string} username - Nom d'utilisateur pour l'authentification
 * @param {string} password - Mot de passe pour l'authentification
 * @returns {Object} Objet {success: boolean, data?: any, error?: Object} avec le résultat de l'authentification
 */
export async function postLogin(username, password) {
    const route = "login"
    // Validation des paramètres
    if (typeof username !== "string" || typeof password !== "string") {
        const error = {
            user: "Veuillez remplir tous les champs",
            dev: "Invalid parameters: username and password must be strings"
        }
        console.error("[postLogin]", error.dev)
        return { success: false, error }
    }

    try {
        const response = await fetch(request(route, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: username, 
                password: password,
            })
        }))

        // Gestion des erreurs HTTP
        if (!response.ok) {
            const errorMessages = getErrorMessage(response.status)
            console.error("[postLogin]", errorMessages.dev)
            return { success: false, error: errorMessages }
        }

        // Succès
        const data = await response.json()
        // console.log('data reçu : ', data)
        return { success: true, data }

    } catch (error) {
        // Erreurs réseau ou parsing JSON
        const errorMessages = {
            user: "Problème de connexion, vérifiez votre réseau",
            dev: `Network or parsing error: ${error.message}`
        }
        console.error("[postLogin]", errorMessages.dev)
        return { success: false, error: errorMessages }
    }
}



/*
    GET /user-info - return information about the user
    Required "Authorization: Bearer your-jwt-token"
    Returns user profile information, statistics, and goals.
*/
/**
 * Brief: Récupère les informations complètes du profil utilisateur depuis l'API
 * 
 * @param {string} token - Token JWT d'authentification
 * @returns {Object} Objet {success: boolean, data?: any, error?: Object} avec les informations utilisateur
 */
export async function getUserInfo(token) {
    const route = "user-info"
    // Validation des paramètres
    if (!token) {
        const error = {
            user: "token invalide",
            dev: "token is null of undefined"
        }
        console.error("[getUserInfo]", error.dev)
        return { success: false, error }
    }

    try {
        const response = await fetch(request(route, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` } ,
        }))

        // Gestion des erreurs HTTP
        if (!response.ok) {
            const errorMessages = getErrorMessage(response.status)
            console.error("[getUserInfo]", errorMessages.dev)
            return { success: false, error: errorMessages }
        }

        // Succès
        const data = await response.json()
        // console.log('data reçu : ', data)
        return { success: true, data }

    } catch (error) {
        // Erreurs réseau ou parsing JSON
        const errorMessages = {
            user: "Problème de connexion, vérifiez votre réseau",
            dev: `Network or parsing error: ${error.message}`
        }
        console.error("[getUserInfo]", errorMessages.dev)
        return { success: false, error: errorMessages }
    }
}


/*
    GET /api/user-activity?startWeek=<date>&endWeek=<date>
    Required "Authorization: Bearer your-jwt-token"
    Returns running sessions between two dates.
    Parameters:
        - startWeek: Start date (ISO format)
        - endWeek: End date (ISO format)
*/
/**
 * Brief: Récupère les activités/sessions utilisateur entre deux dates depuis l'API
 * 
 * @param {string} token - Token JWT d'authentification
 * @param {string} startWeek - Date de début au format ISO (YYYY-MM-DD)
 * @param {string} endWeek - Date de fin au format ISO (YYYY-MM-DD)
 * @returns {Object} Objet {success: boolean, data?: any, error?: Object} avec les données d'activité
 */
export async function getUserActivity(token, startWeek, endWeek) {
    const isISODate = (dateString) => {
        const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!isoDateRegex.test(dateString)) return false;
        const date = new Date(dateString);
        return !isNaN(date.getTime()) && date.toISOString().split('T')[0] === dateString;
    }
    if(!(isISODate(startWeek)) || !(isISODate(endWeek))){
        console.log("startWeek :", startWeek, "     endWeek :", endWeek);
        const error = {
            user: "Les dates sont invalides",
            dev: "Invalid parameters: DATE must be in ISO FORMAT"
        }
        console.error("[getUserActivity]", error.dev)
        return { success: false, error }
    }

    const route = `user-activity?startWeek=${startWeek}&endWeek=${endWeek}`
    // console.log("getUserActivity api route : ", route);
    // Validation des paramètres
    if (!token) {
        const error = {
            user: "token invalide",
            dev: "token is null of undefined"
        }
        console.error("[getUserActivity]", error.dev)
        return { success: false, error }
    }

    try {
        const response = await fetch(request(route, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` } ,
        }))

        // Gestion des erreurs HTTP
        if (!response.ok) {
            const errorMessages = getErrorMessage(response.status)
            // console.error("[getUserActivity]", errorMessages.dev)
            return { success: false, error: errorMessages }
        }

        // Succès
        const data = await response.json()
        // console.log('data reçu : ', data)
        return { success: true, data }

    } catch (error) {
        // Erreurs réseau ou parsing JSON
        const errorMessages = {
            user: "Problème de connexion, vérifiez votre réseau",
            dev: `Network or parsing error: ${error.message}`
        }
        console.error("[getUserActivity]", errorMessages.dev)
        return { success: false, error: errorMessages }
    }
}


/*
    GET /api/profile-image
    Required "Authorization: Bearer your-jwt-token"
    Returns the user's profile image path.
    Parameters: None
*/
/**
 * Brief: Récupère le chemin de l'image de profil utilisateur depuis l'API
 * 
 * @param {string} token - Token JWT d'authentification
 * @returns {Object} Objet {success: boolean, data?: any, error?: Object} avec le chemin de l'image
 */
export async function getUserProPic(token) {
    const route = 'profile-image'
    // Validation des paramètres
    if (!token) {
        const error = {
            user: "token invalide",
            dev: "token is null of undefined"
        }
        console.error("[getUserProPic]", error.dev)
        return { success: false, error }
    }

    try {
        const response = await fetch(request(route, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` } ,
        }))

        // Gestion des erreurs HTTP
        if (!response.ok) {
            const errorMessages = getErrorMessage(response.status)
            console.error("[getUserProPic]", errorMessages.dev)
            return { success: false, error: errorMessages }
        }

        // Succès
        const data = await response.json()
        // console.log('data reçu : ', data)
        return { success: true, data }

    } catch (error) {
        // Erreurs réseau ou parsing JSON
        const errorMessages = {
            user: "Problème de connexion, vérifiez votre réseau",
            dev: `Network or parsing error: ${error.message}`
        }
        console.error("[getUserProPic]", errorMessages.dev)
        return { success: false, error: errorMessages }
    }
}


/*
    GET /uploads/<filename>
    Required "Authorization: Bearer your-jwt-token"
    Endpoint to access uploaded files.
    Parameters: <filename>
*/
/**
 * Brief: Récupère un fichier utilisateur spécifique depuis l'API
 * 
 * @param {string} token - Token JWT d'authentification
 * @param {string} filename - Nom du fichier à récupérer
 * @returns {Object} Objet {success: boolean, data?: any, error?: Object} avec le fichier
 */
export async function getUserFile(token, filename) {
    const route = `profile-image/${filename}`
    // Validation des paramètres
    if (!token) {
        const error = {
            user: "token invalide",
            dev: "token is null of undefined"
        }
        console.error("[getUserFile]", error.dev)
        return { success: false, error }
    }
    const authorizedFileExtension = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = filename.slice(filename.lastIndexOf('.')).split('.')[1]; // 'jpeg" extraction
    if(!(authorizedFileExtension.includes(fileExtension))){
        const error = {
            user: "Ce type de fichier n'est pas traité",
            dev: "Supported image formats: jpg, jpeg, png, gif"
        }
        console.error("[getUserFile]", error.dev)
        return { success: false, error }
    }
    if (!token) {
        const error = {
            user: "token invalide",
            dev: "token is null of undefined"
        }
        console.error("[getUserFile]", error.dev)
        return { success: false, error }
    }

    try {
        const response = await fetch(request(route, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` } ,
        }))

        // Gestion des erreurs HTTP
        if (!response.ok) {
            const errorMessages = getErrorMessage(response.status)
            console.error("[getUserFile]", errorMessages.dev)
            return { success: false, error: errorMessages }
        }

        // Succès
        const data = await response.json()
        // console.log('data reçu : ', data)
        return { success: true, data }

    } catch (error) {
        // Erreurs réseau ou parsing JSON
        const errorMessages = {
            user: "Problème de connexion, vérifiez votre réseau",
            dev: `Network or parsing error: ${error.message}`
        }
        console.error("[getUserFile]", errorMessages.dev)
        return { success: false, error: errorMessages }
    }
}

