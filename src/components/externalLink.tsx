"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function ExternalLink({ url }: { url: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="ml-auto w-fit text-zinc-500 transition-colors duration-150 ease-in-out hover:text-zinc-700 focus-visible:text-zinc-700 focus-visible:outline-none">
        <span className="flex items-center gap-1 text-sm text-blue-400">
          {url.includes("auto.ru")
            ? "auto.ru"
            : url.includes("avito.ru" ? "avito.ru" : "ссылка")}
          <ExternalLinkIcon className="h-3 w-3" />
        </span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Перейти к объявлению?</AlertDialogTitle>
          {/* <AlertDialogDescription>
            Страница откроется в новой вкладке.
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={() => window.open(url, "_blank")}>
            Перейти
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
