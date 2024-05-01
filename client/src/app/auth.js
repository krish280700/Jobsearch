import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authConfig } from "@/app/authConfig";
import { fetchUsers } from "./Utilities/utils";

const login = async (credentials) => {
  try {
    let isVerified, user;
    const {email, password} = credentials
    await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        body:JSON.stringify({email, password}),
        headers:{
            'Content-Type': 'application/json',
        }
    })
        .then(res => res.json())
        .then(res => {
            isVerified = res.isValid
            user = res.data
        })
   
    if (!isVerified) throw new Error("Wrong credentials!");
 
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
      CredentialsProvider({
        async authorize(credentials) {
          try {
            const user = await login(credentials);
            return user;
          } catch (err) {
            return null;
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    // ADD ADDITIONAL INFORMATION TO SESSION
    callbacks: { 
      async jwt({ token, user }) {
        if (user) {
          token.email = user.email;
          token.name = `${user.firstName} ${user.lastName}`;
          token.role = user.role;
          token.id = user._id; 
        }
        return token;
      },
      async session({ session, token }) {
        if (token.sub && session.user) {
          session.user.id = token.sub;
        }
  
        if (token.role && session.user) {
          session.user.role = token.role;
        }
  
        if (session.user) {
          session.user.name = token.name;
          session.user.email = token.email;
        }
  
        return session;
      },
      session: { strategy: "jwt" },
  },
});
  