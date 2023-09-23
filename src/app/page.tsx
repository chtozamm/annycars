import { revalidatePath } from "next/cache";
import prisma from "../../prisma";
import Cars from "./cars";
import Header from "@/components/header";

export default async function Home() {
  async function getData() {
    const res = await prisma.cars.findMany();
    revalidatePath("/");
    return res;
  }
  const data = await getData();
  return (
    <main className="flex flex-col items-center justify-start px-6 pb-8">
      <Header />
      <Cars data={data} />
    </main>
  );
}
