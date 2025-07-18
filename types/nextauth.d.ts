// types/nextauth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    role?: "user" | "admin" | "employee" | "editor" | "manager";
    dutyPlace: string;
  }

  interface Session {
    user: User;
  }
}