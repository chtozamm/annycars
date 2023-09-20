import { revalidatePath } from "next/cache";
import Cars from "./cars";

import { prisma } from "../../prisma";
export const revalidate = 1;

export default async function Home() {
  const cars: Car[] =
    (await prisma.cars.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
    })) || [];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-8">
      <Cars cars={cars} />
    </main>
  );
}
