import { prisma } from "@/lib/prisma";
import Form from "./form";
import { revalidatePath } from "next/cache";
import Cars from "./cars";

export default async function Home() {
  const cars = (await prisma.cars.findMany()) || [];

  async function addCar(
    carName: string,
    year: number,
    place: string,
    image: string
  ) {
    "use server";
    await prisma.cars.create({
      data: {
        name: carName,
        year: year,
        place: place,
        image: image,
      },
    });
    revalidatePath("/");
  }

  async function deleteCar(id: number) {
    "use server";
    await prisma.cars.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
        <Cars cars={cars} deleteCar={deleteCar} />
        <Form addCar={addCar} />
      </div>
    </main>
  );
}
