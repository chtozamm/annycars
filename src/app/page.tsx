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

  async function addCar(car: Car) {
    "use server";
    await prisma.cars.create({
      data: {
        name: car.name,
        year: car.year || "",
        seller: car.seller || "",
        image: car.image || "",
        link: car.link || "",
        advantages: car.advantages || "",
        disadvantages: car.disadvantages || "",
        price: car.price || "",
        mileage: car.mileage || "",
      },
    });
    revalidatePath("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-6 pb-8">
      <Cars data={cars} addCar={addCar} />
    </main>
  );
}
