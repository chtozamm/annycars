import { getServerSession } from "next-auth";
import AuthForm from "@/components/authform";
import Image from "next/image";
import { TriangleIcon } from "@/components/icons";
import { redirect } from "next/navigation";
import { HeaderMessage } from "@/components/HeaderMessage";

export default async function EditPage() {
  const session = await getServerSession();
  if (session) redirect("/");

  return (
    <main className="mx-3 flex flex-col items-center justify-start px-6 pb-8">
      <HeaderMessage start="Вернуться на " keyword="главную" end="." link="/" />
      <header className="relative flex h-20 cursor-default select-none items-center justify-center gap-1.5 text-2xl font-semibold after:absolute after:left-[103%] after:top-[40%] after:bg-black after:p-0.5 after:text-xs after:font-normal after:text-white after:content-['admin']">
        <TriangleIcon />
        annycars
      </header>
      {!session && (
        <div className="flex flex-col items-center justify-center gap-6 text-sm">
          <Image
            src="/gandalf.png"
            width={160}
            height={160}
            alt=""
            className="pointer-events-none select-none"
          />
          <AuthForm />
        </div>
      )}
    </main>
  );
}
