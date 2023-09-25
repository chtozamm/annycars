"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ password: "" });
  const [error, setError] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Validate inputs
    const res = await signIn("credentials", {
      password: userInfo.password,
      redirect: false,
    });
    setUserInfo({ password: "" });
    if (res?.error) setError(true);
    if (!res?.error) {
      setError(false);
      router.refresh();
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-6"
    >
      <Label>Ты не пройдешь!</Label>
      <Input
        className="w-[90vw] max-w-md text-center"
        value={userInfo.password}
        onChange={(e) => setUserInfo({ password: e.target.value })}
        placeholder="Пароль"
        type="password"
      />
      <Button type="submit" disabled={!userInfo.password}>
        Пройти
      </Button>
      {error && !userInfo.password && <p>Неверный пароль</p>}
    </form>
  );
}
