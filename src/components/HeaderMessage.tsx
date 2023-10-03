"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export function HeaderMessage({
  start,
  keyword,
  link,
  end,
}: {
  start?: string;
  keyword?: string;
  link?: string;
  end?: string;
}) {
  return (
    <div className="flex h-8 w-screen select-none items-center justify-center bg-black text-center text-sm font-light text-white">
      <p className="rounded-md ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300">
        {start}
        {keyword === "Выйти" && (
          <button
            className="font-medium hover:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300"
            onClick={async (e) => {
              e.preventDefault();
              const res = await signOut();
            }}
          >
            {keyword}
          </button>
        )}
        {link && (
          <Link href={link} className="font-medium hover:text-gray-200">
            {keyword}
          </Link>
        )}
        {end}
      </p>
    </div>
  );
}
