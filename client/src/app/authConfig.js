import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "../../routes";

export const authConfig = {
    providers:[],
    pages: {
      signIn: "/login",
      signUp: "/signUp",
    },
    callbacks: {
      authorized({ auth, request }) {
        const isLoggedIn = auth?.user;
        const { nextUrl } = request;
        const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
        const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
        const isAuthRoute = authRoutes.includes(nextUrl.pathname);

        if (isApiAuthRoute) {
            return null;
        }

        if (isAuthRoute) {
            console.log(nextUrl.pathname, 'next')
            if (isLoggedIn) {
              return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
            }
            return true;
        }

        if (!isLoggedIn && !isPublicRoute) {
            let callbackUrl = nextUrl.pathname;
            if (nextUrl.search) {
              callbackUrl += nextUrl.search;
            }
            
            const encodedCallbackUrl = encodeURIComponent(callbackUrl);2+9
            return Response.redirect(new URL(
              `/login?callbackUrl=${encodedCallbackUrl}`,
              nextUrl
            ));
        }
    
        return true;
      },
    },
  };
  