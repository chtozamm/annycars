import { HeaderMessage } from "@/components/HeaderMessage";
import { getServerSession } from "next-auth";
import AuthForm from "./authform";
import Image from "next/image";
import Cars from "./cars";
import prisma from "../../../prisma";
import { TriangleIcon } from "@/components/icons";

export default async function EditPage() {
  const serverCars = await prisma.cars.findMany();

  const session = await getServerSession();

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
      <HeaderMessage label="Вернуться на " keyword="главную" link="/" />
      <header className="relative flex h-20 cursor-default select-none items-center justify-center gap-1.5 text-2xl font-semibold after:absolute after:left-[103%] after:top-[40%] after:bg-black after:p-0.5 after:text-xs after:font-normal after:text-white after:content-['admin']">
        <TriangleIcon />
        annycars
      </header>
      {!session && (
        <div className="flex flex-col items-center justify-center gap-6 text-sm">
          <Image
            src="/gandalf.png"
            width={160}
            height={160}
            alt=""
            className="pointer-events-none select-none"
          />
          <AuthForm />
        </div>
      )}

      {session && (
        <Cars
          deleteCar={deleteCar}
          updateCar={updateCar}
          serverCars={serverCars}
        />
      )}
    </main>
  );
}
