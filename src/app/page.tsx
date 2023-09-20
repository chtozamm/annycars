import { revalidatePath } from "next/cache";
import Cars from "./cars";

import { prisma } from "@/lib/prisma";

export default async function Home() {
  const cars = (await prisma.cars.findMany()) || [];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <Cars cars={cars} />
      </div>
    </main>
  );
}
