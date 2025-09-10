/*
    auteur: William Derue
    Projet P6 - SportSee
    file : src/middleware.js
    objectives: gestion middleware
    lastUpdate: 09/09/2025
*/

import { NextResponse } from "next/server";
import { verifySession } from '@/services/session.services';

export async function middleware(request) {
  console.log("Middleware intercepte:", request.nextUrl.pathname);
  // console.debug("REQUEST HEADERS:::: ", request.headers.get('Origin'));
  const session = await verifySession();
  console.log("is session auth ? : ", session?.isAuth)
  if(session?.isAuth && request.nextUrl.pathname.startsWith('/login')){
    return NextResponse.redirect(new URL('/dashboard', request.url));
  } 
  // Utilisateur authentifié sur / → rediriger vers dashboard
  else if(session?.isAuth && request.nextUrl.pathname === '/'){
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  else if (!session?.isAuth && !(request.nextUrl.pathname.startsWith('/login'))){
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


