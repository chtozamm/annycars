"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session?.user?.name} <br />
        <button onClick={() => signOut()}>Выйти</button>
      </>
    );
  }
  return <button onClick={() => signIn()}>Войти</button>;
}

export default function Menu() {
  return <AuthButton />;
}
