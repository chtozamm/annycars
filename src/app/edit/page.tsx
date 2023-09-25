import { HeaderMessage } from "@/components/HeaderMessage";
import { getServerSession } from "next-auth";
import AuthForm from "./authform";
import Image from "next/image";
import Cars from "./cars";
import prisma from "../../../prisma";

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
    <main>
      <HeaderMessage label="Вернуться на " keyword="главную" link="/" />
      <div className="mt-8 flex flex-col items-center justify-center gap-6 text-sm">
        {/* <Menu /> */}
        {!session && (
          <>
            <Image
              src="/gandalf.png"
              width={160}
              height={160}
              alt=""
              className="pointer-events-none select-none"
            />
            <AuthForm />
          </>
        )}
        {session && <Cars deleteCar={deleteCar} updateCar={updateCar} />}
      </div>
    </main>
  );
}
