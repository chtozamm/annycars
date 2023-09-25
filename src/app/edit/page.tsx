"use client";

import { ConstructionIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditPage() {
  const router = useRouter();
  return (
    <main>
      <div className="flex h-8 w-screen items-center justify-center bg-black text-center text-sm font-light text-white">
        <button onClick={() => router.back()}>
          Вернуться на{" "}
          <span className="font-medium underline underline-offset-4">
            главную
          </span>
          .
        </button>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-6 text-sm">
        <ConstructionIcon className="h-32 w-32" />
        <p>Раздел в разработке</p>
      </div>
    </main>
  );
}
