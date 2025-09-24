'use server';
import * as z from "zod";

// Détection de prompt injection
function detectPromptInjection(input) {
  const suspiciousPatterns = [
    /ignore\s+previous\s+instructions/i,
    /forget\s+everything/i,
    /system\s*:/i,
    /\[INST\]/i,
    /assistant\s*:/i,
    /you\s+are\s+now/i,
    /pretend\s+to\s+be/i,
    /act\s+as\s+if/i,
    /role\s*:\s*system/i,
    /new\s+instructions/i,
    /override\s+previous/i,
    /disregard\s+all/i,
    /cancel\s+previous/i,
    /stop\s+being/i,
    /instead\s+of/i,
    /but\s+actually/i,
    /however\s*,\s*ignore/i
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
}

// Sanitisation des données
function sanitizeInput(input) {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Supprime < et >
    .replace(/javascript:/gi, '') // Supprime les liens javascript
    .replace(/data:/gi, '') // Supprime les data URIs
    .replace(/vbscript:/gi, '') // Supprime vbscript
    .normalize('NFC'); // Normalise les caractères Unicode
}

// Sanitisation spécifique pour l'IA
function sanitizeForAI(text) {
  return text
    .slice(0, 10000) // Limite la longueur à 10k caractères
    .replace(/\b(?:password|token|secret|key|api_key|apikey)\s*[:\=]\s*\S+/gi, '[REDACTED]') // Masque les secrets
    .replace(/\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, '[CARD]') // Masque les numéros de carte
    .replace(/\b\d{3}-\d{2}-\d{4}\b/g, '[SSN]') // Masque les SSN américains
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]'); // Optionnel: masque les emails
}



// Version sans Zod - validation manuelle
function validateInput(input) {
  const errors = [];
  
  // Vérification du type
  if (typeof input !== 'string') {
    errors.push("Le message doit être une chaîne de caractères");
    return { isValid: false, errors, data: null };
  }
  
  // Vérification de la longueur minimale
  if (input.trim().length < 1) {
    errors.push("Message requis");
  }
  
  // Vérification de la longueur maximale
  if (input.length > 5000) {
    errors.push("Message trop long (maximum 5000 caractères)");
  }
  
  // Vérification de prompt injection
  if (detectPromptInjection(input)) {
    errors.push("Contenu suspect détecté - possible tentative d'injection");
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    data: errors.length === 0 ? input : null
  };
}

// Fonction principale de traitement
export async function sanitizeRequest(rawInput) {
  try {
    // 1. Validation
    console.log("rawInput : ", rawInput);
    const validation = validateInput(rawInput);


    if (!validation.isValid) {
      throw new Error(`Erreurs de validation: ${validation.errors.join(', ')}`);
    }
    console.log("validation : ", validation?.data);
    // 2. Sanitisation basique
    const cleaned = sanitizeInput(validation.data);
    console.log("cleaned : ", cleaned);
    // 3. Sanitisation pour l'IA
    const sanitized = sanitizeForAI(cleaned);
    console.log("sanitized : ", sanitized);
    // 4. Vérification finale
    if (sanitized.length < cleaned.length * 0.3) {
      throw new Error("Trop de contenu supprimé lors de la sanitisation");
    }
    
    return {
      success: true,
      data: sanitized,
      originalLength: rawInput.length,
      finalLength: sanitized.length
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
}

const trackers = {};
// from this tutorial -> https://www.youtube.com/watch?v=D770heiyxdc&t=143s
export async function rateLimitByKey(key, limit, window){
  if (!key) {
    throw new Error ("key not found");
  } 
  const tracker = trackers[key] || { count: 0, expiresAt: 0};
  console.log("tracker de rateLimit: ", tracker);

  if (!trackers[key]){
    trackers[key] = tracker;
  }
   
  if (tracker.expiresAt < Date.now()){
    tracker.count=0;
    tracker.expiresAt = Date.now() + window;

  }

  tracker.count++;

  if (tracker.count > limit){
    throw new Error("Rate limit exceeded");
  }

}


export async function validationPlanningFormat (objet) {
  const day = z.strictObject({
    jour: z.string(),
    titre: z.string(),
    description: z.string(),
    temps: z.union([
      z.number(),
      z.string().transform(str => {
        const match = str.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      })
    ])
  });
  const week = z.strictObject({
    content: z.array(day),
  });
  const planning = z.record(z.string(), week);
  try {
    return planning.parse(objet); // Retourne l'objet validé
  } catch(error){
    if(error instanceof z.ZodError){
      throw new Error(JSON.stringify(error.issues)); 
    }
    throw error;
  }
}


export async function validateNGenerateResponse(resp){
  try {
      await validationPlanningFormat(resp);
  } catch(error) {
      return new Response(JSON.stringify({ error: "Validation failed", details: error.message }), { 
          status: 405, 
          statusText: "Validation Error" 
      });
  };
  return new Response ((JSON.stringify(resp)), { status: 200, statusText: "OK!" });
}
