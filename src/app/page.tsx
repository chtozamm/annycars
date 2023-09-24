import prisma from "../../prisma";
import Cars from "./cars";
import Header from "@/components/header";

export default async function Home() {
  const data = await prisma.cars.findMany();
  return (
    <main className="flex flex-col items-center justify-start px-6 pb-8">
      <Header />
      <Cars data={data} />
    </main>
  );
}
