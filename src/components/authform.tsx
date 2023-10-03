"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function AuthForm() {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ password: "" });
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisabled(true);
    const res = await signIn("credentials", {
      password: userInfo.password,
      redirect: false,
    });
    setUserInfo({ password: "" });
    setDisabled(false);
    if (res?.error) {
      setError(true);
    }
    if (!res?.error) {
      setError(false);
      router.refresh();
    }

    // if (res?.ok) router.replace("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-3"
    >
      <Label>Ты не пройдешь!</Label>
      <Input
        ref={ref}
        autoFocus
        className="mt-3 w-[90vw] max-w-md text-center"
        value={userInfo.password}
        onChange={(e) => setUserInfo({ password: e.target.value })}
        placeholder="Пароль"
        type="password"
        disabled={disabled}
      />
      <Button
        type="submit"
        onClick={() => ref.current?.focus()}
        className="w-full"
        disabled={!userInfo.password}
      >
        Войти
      </Button>
      {error && !userInfo.password && <p>Неверный пароль</p>}
    </form>
  );
}
