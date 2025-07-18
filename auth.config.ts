// auth.config.ts
import NextAuth from "next-auth";

export const { auth } = NextAuth({
  providers: [],
  callbacks: {
    async jwt({ token }) {
      return token; // return whatever is already in the token
    },
    async session({ session, token }) {
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = (token.role ?? "employee") as "user" | "admin" | "employee";
      session.user.dutyPlace = token.dutyPlace as string;
      return session;
    },
  },
});