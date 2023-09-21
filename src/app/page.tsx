import { revalidatePath } from "next/cache";
import Cars from "./cars";

import { prisma } from "../../prisma";
import Sort from "@/components/sort";
import Search from "@/components/search";
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

  // async function addCar(
  //   carName: string,
  //   year: number,
  //   place: string,
  //   image: string
  // ) {
  //   "use server";
  //   await prisma.cars.create({
  //     data: {
  //       name: carName,
  //       year: year,
  //       place: place,
  //       image: image,
  //     },
  //   });
  //   revalidatePath("/");
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-3 pb-8">
      {/* <Search /> */}
      {/* <Sort /> */}
      <Cars data={cars} />
    </main>
  );
}
