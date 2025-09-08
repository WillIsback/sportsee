/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/lib/action.js
    objectives: Mettre en place les servers action qui utilises les cookies, features seulement server side
    lastUpdate : 07/09/2025
*/
'use server';

import { login } from "@/services/auth.services";
import { getUserInfo } from "@/services/api.services";
import { cookies } from 'next/headers';

// export async function SubmitLogin(formData) {
//     const username = formData.get('username');
//     const password =formData.get('password');
//     const res = await login(username,password);
//     if (res.success){
//         const cookieStore = await cookies();
//         const value = JSON.stringify(res.credentials);
//         cookieStore.set({
//             name: 'auth-token',
//             value: value,
//             httpOnly: true,
//             secure: true 
//         });
//         return { success: true }
//     }
//     return { success: false, error: res?.error }
// }


// export async function FetchUserInfo() {
//     if (isLogedIn('auth-token')){
//         const cookieStore = await cookies();
//         const { token, userId } = JSON.parse(cookieStore.get('auth-token').value);
//         try {
//             const res = await getUserInfo(token);
//             if (res.success)
//             {
//                 const value = JSON.stringify(res.data);
//                 cookieStore.set({
//                     name: `${userId}-info`,
//                     value: value,
//                     httpOnly: true,
//                     secure: true 
//                 });
//                 return { success: true, data: res.data}
//             }
//             return { success: false, error: res?.error }
//         } catch(e){
//             console.error("Failed FetchUserInfo : ", e)
//             return { success: false, error: `Failed FetchUserInfo : , ${e}` }
//         }
        
//     }
//     return { success: false, error: "erreur user non authentifié"}
// }