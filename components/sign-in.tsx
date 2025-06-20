'use client';

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <>
      <button onClick={() => signIn('google')} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
        Sign in with Google
      </button>
    </>
  );
}
