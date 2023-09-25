import { HeaderMessage } from "@/components/HeaderMessage";
import { getServerSession } from "next-auth";
import AuthForm from "./authform";
import Image from "next/image";
import Cars from "./cars";
import prisma from "../../../prisma";
import { TriangleIcon } from "@/components/icons";

export default async function EditPage() {
  const session = await getServerSession();

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
    <main className="mx-3 flex flex-col items-center justify-start px-6 pb-8">
      <HeaderMessage label="Вернуться на " keyword="главную" link="/" />
      <header className="flex h-20 cursor-default select-none items-center justify-center gap-1.5 text-2xl font-semibold">
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
      {session && <Cars deleteCar={deleteCar} updateCar={updateCar} />}
    </main>
  );
}