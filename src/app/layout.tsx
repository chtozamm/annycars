import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
