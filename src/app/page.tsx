import { TriangleIcon } from "@/components/icons";
import prisma from "../../prisma";
import Cars from "./cars";
import { HeaderMessage } from "@/components/HeaderMessage";
import { getServerSession } from "next-auth";

export default async function Home() {
  const serverCars = await prisma.cars.findMany();
  const session = await getServerSession();
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
          isSold: false,
          personal: false,
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
          image: car.image?.startsWith("https://") ? car.image : "",
          link: car.link?.startsWith("https://") ? car.link : "",
          price: car.price || "",
          mileage: car.mileage || "",
          seller: car.seller,
          advantages: car.advantages || "",
          disadvantages: car.disadvantages || "",
          isSold: car.isSold,
          personal: car.personal,
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
    <main className="mx-3 flex flex-col items-center justify-start px-6 pb-8">
      {session ? (
        <HeaderMessage
          start=""
          keyword="Выйти"
          link=""
          end=" из режима редактирования."
        />
      ) : (
        <HeaderMessage
          start=""
          keyword="Войдите"
          link="/login"
          end=", чтобы управлять объявлениями."
        />
      )}
      {/* <header
        className={`flex h-20 w-full cursor-default select-none items-center justify-center gap-1.5 text-2xl font-semibold`}
      >
        <TriangleIcon />
        annycars
      </header> */}
      <Cars
        addCar={addCar}
        deleteCar={deleteCar}
        updateCar={updateCar}
        serverCars={serverCars}
      />
    </main>
  );
}
