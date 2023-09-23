import Cars from "./cars";
import Header from "@/components/header";

export default async function Home() {
  const res = await fetch("https://annycars.vercel.app/api/cars", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <main className="flex flex-col items-center justify-start px-6 pb-8">
      <Header />
      <Cars data={data} />
    </main>
  );
}
