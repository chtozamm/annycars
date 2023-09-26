"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function HeaderMessage({
  label,
  keyword,
  link,
}: {
  label: string;
  keyword: string;
  link: string;
}) {
  const router = useRouter();
  return (
    <div className="flex h-8 w-screen select-none items-center justify-center bg-black text-center text-sm font-light text-white">
      <p className="rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300">
        {label}
        <Link href={link} className="font-medium underline underline-offset-4">
          {keyword}
        </Link>
        .
      </p>
    </div>
  );
}
