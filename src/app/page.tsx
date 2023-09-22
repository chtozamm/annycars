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
        image: car.image || "",
        link: car.link || "",
        price: car.price || "",
        mileage: car.mileage || "",
        seller: car.seller || "",
        advantages: car.advantages || "",
        disadvantages: car.disadvantages || "",
      },
    });
    revalidatePath("/");
  }

  async function deleteCar(car: Car) {
    "use server";
    await prisma.cars.delete({
      where: {
        id: car.id,
      },
    });
    revalidatePath("/");
  }

  async function updateCar(car: Car) {
    "use server";
    await prisma.cars.update({
      data: {
        name: car.name,
        year: car.year || "",
        image: car.image || "",
        link: car.link || "",
        price: car.price || "",
        mileage: car.mileage || "",
        seller: car.seller || "",
        advantages: car.advantages || "",
        disadvantages: car.disadvantages || "",
      },
      where: {
        id: car.id,
      },
    });
    revalidatePath("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-6 pb-8">
      <Cars
        data={cars}
        addCar={addCar}
        updateCar={updateCar}
        deleteCar={deleteCar}
      />
    </main>
  );
}
