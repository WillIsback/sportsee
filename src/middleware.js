/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/middleware.js
    objectives: gestion middleware
    lastUpdate: 07/09/2025
*/

import { NextResponse } from 'next/server';
import { verifySession } from '@/services/session.services';

 
export async function middleware(request) {
  console.log("Middleware intercepte:", request.nextUrl.pathname);
  const { isAuth, userId, error } = await verifySession();

    if(isAuth && request.nextUrl.pathname.startsWith('/login')){
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } 
    // Utilisateur authentifié sur / → rediriger vers dashboard
    else if(isAuth && request.nextUrl.pathname === '/'){
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    else if (!isAuth && !(request.nextUrl.pathname.startsWith('/login'))){
      return NextResponse.redirect(new URL('/login', request.url));
    }
    else{
      return NextResponse.next();
    }
    
}
  
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|image).*)',
    '/'
  ],
}
