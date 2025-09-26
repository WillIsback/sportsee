/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/services/session.services.js
    objectives: Mettre en place la gestion des session utilisateurs avec un wrapper du token externe dans un token interne
    lastUpdate : 09/09/2025
*/
'use server'
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DEMO } from '@/lib/constants';

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

/**
 * Brief: Chiffre un payload en token JWT avec expiration d'une heure
 * 
 * @param {Object} payload - Données à chiffrer dans le token
 * @returns {string} Token JWT chiffré
 */
export const encrypt = async (payload) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1hr')
        .sign(key)
}

/**
 * Brief: Déchiffre et vérifie un token de session JWT
 * 
 * @param {string} session - Token JWT chiffré à déchiffrer
 * @returns {Object|null} Payload déchiffré ou null si invalide
 */
export const decrypt = async (session) => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Brief: Crée une session utilisateur sécurisée et redirige vers le dashboard
 * 
 * @param {Object} params - Paramètres de session contenant {token, userId}
 * @param {string} params.token - Token JWT de l'API externe
 * @param {string} params.userId - Identifiant utilisateur
 */
export const createSession = async ({ token, userId }) => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ token, userId, expiresAt });
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  redirect('/dashboard');
}

/**
 * Brief: Vérifie la validité de la session utilisateur actuelle
 * 
 * @returns {Object} Objet {isAuth: boolean, userId?: string, token?: string, error?: string}
 */
export const verifySession = async () => {
  // Mode DEMO : on simule une session valide
  if (DEMO) {
    console.log("🎭 MODE DEMO : Session simulée pour user123");
    return { 
      isAuth: true, 
      userId: 'user123', 
      token: 'demo_token_not_needed' 
    };
  }

  // Mode PRODUCTION : logique existante
  const cookieStore = await cookies()
  const cookie = cookieStore.get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return { isAuth: false, error: "The user is not Authenticated" };
  }

  return { isAuth: true, userId: session.userId, token: session.token };
}

/**
 * Brief: Met à jour la durée de vie d'une session existante
 * 
 * @returns {null} Fonction de maintenance de session
 */
export const updateSession = async () => {
  const session = cookies().get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Brief: Supprime la session utilisateur (déconnexion)
 */
export const deleteSession = async () => {
  (await cookies()).delete('session');
}