import { TriangleIcon } from "@/components/icons";
import prisma from "../../prisma";
import Cars from "./cars";
import { HeaderMessage } from "@/components/HeaderMessage";

export default async function Home() {
  const serverCars = await prisma.cars.findMany();
  async function addCar(car: Car) {
    "use server";
    try {
      await prisma.cars.create({
        data: {
          name: car.name,
          year: car.year,
          image: car.image?.startsWith("https://") ? car.image : "",
          link: car.link?.startsWith("https://") ? car.link : "",
          price:
            Number(car.price?.replaceAll(" ", ""))
              .toLocaleString()
              .replace(/,/g, " ") || "",
          mileage:
            Number(car.mileage?.replaceAll(" ", ""))
              .toLocaleString()
              .replace(/,/g, " ") || "",
          seller: car.seller,
          advantages: car.advantages || "",
          disadvantages: car.disadvantages || "",
        },
      });
    } catch (error) {
      console.error("Возникла ошибка при попытке создать запись.");
    }
  }

  return (
    <main className="mx-3 flex flex-col items-center justify-start px-6 pb-8">
      <HeaderMessage
        label="Редактировать объявления можно "
        keyword="здесь"
        link="/edit"
      />
      <header className="flex h-20 cursor-default select-none items-center justify-center gap-1.5 text-2xl font-semibold">
        <TriangleIcon />
        annycars
      </header>
      <Cars addCar={addCar} serverCars={serverCars} />
    </main>
  );
}
