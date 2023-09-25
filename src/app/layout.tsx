import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Annycars - помощник в выборе автомобиля",
  description:
    "Удобная доска объявлений для сохранения, поиска и сортировки автомобилей.",
  viewport: {
    maximumScale: 1.0,
    initialScale: 1.0,
    width: "device-width",
  },
  openGraph: {
    title: "Annycars - помощник в выборе автомобиля",
    description:
      "Удобная доска объявлений для сохранения, поиска и сортировки автомобилей.",
    url: "https://www.annycars.online",
  },
  twitter: {
    title: "Annycars - помощник в выборе автомобиля",
    description:
      "Удобная доска объявлений для сохранения, поиска и сортировки автомобилей.",
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
