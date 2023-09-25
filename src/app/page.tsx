import { TriangleIcon } from "@/components/icons";
import prisma from "../../prisma";
import Cars from "./cars";

export default async function Home() {
  async function addCar(car: Car) {
    "use server";
    try {
      await prisma.cars.create({
        data: {
          name: car.name,
          year: car.year,
          image: car.image || "",
          link: car.link || "",
          price: car.price || "",
          mileage: car.mileage || "",
          seller: car.seller,
          advantages: car.advantages || "",
          disadvantages: car.disadvantages || "",
        },
      });
    } catch (error) {
      console.error("Возникла ошибка при попытке создать запись.");
    }
  }

  async function updateCar(id: string, car: Car) {
    "use server";
    try {
      await prisma.cars.update({
        data: {
          name: car.name,
          year: car.year,
          image: car.image || "",
          link: car.link || "",
          price: car.price || "",
          mileage: car.mileage || "",
          seller: car.seller,
          advantages: car.advantages || "",
          disadvantages: car.disadvantages || "",
          isSold: car.isSold,
        },
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("Возникла ошибка при попытке обновить запись.");
    }
  }

  async function deleteCar(car: Car) {
    "use server";
    try {
      await prisma.cars.delete({
        where: {
          id: car.id,
        },
      });
    } catch (error) {
      console.error(
        "Возникла ошибка при попытке удалить запись, возможно запись уже была удалена.",
      );
    }
  }
  return (
    <main className="flex flex-col items-center justify-start px-6 pb-8">
      <header className="flex h-20 cursor-default select-none items-center justify-center gap-1.5 text-2xl font-semibold">
        <TriangleIcon />
        annycars
      </header>
      <Cars addCar={addCar} deleteCar={deleteCar} updateCar={updateCar} />
    </main>
  );
}
