"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { UpdateCarForm } from "../forms";
import useSWR from "swr";

import ExternalLink from "@/components/externalLink";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon, MinusIcon, SearchIcon, XIcon } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Cars({
  serverCars,
  deleteCar,
  updateCar,
}: {
  serverCars: Car[];
  deleteCar: Function;
  updateCar: Function;
}) {
  let data: Car[] = [];
  const fetcher = (url: string) =>
    fetch(url, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
    }).then((res) => res.json());
  const {
    data: cars,
    isLoading,
    error,
    mutate,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/cars?select=*&order=created_at.desc`,
    fetcher,
  );
  if (cars) data = [...cars];
  if (error || (cars && cars.length === 0)) data = serverCars;

  // Creates set and converts to array with unique sellers
  // Used for filtering cars
  const sellersSet = new Set();
  data.forEach((car: Car) => sellersSet.add(car.seller));
  const sellers: string[] = [];
  sellersSet.forEach((seller) => sellers.push(seller as string));
  sellers.sort();
  sellersSet.clear();

  // Filters and sort key
  const [searchQuery, setSearchQuery] = useState("");
  const [showSoldCars, setShowSoldCars] = useState(false);

  function sortCars(a: Car, b: Car, key: string) {
    switch (key) {
      case "created_at":
        return Number(b.created_at) - Number(a.created_at);
      case "year":
        return Number(b.year) - Number(a.year);
      case "price":
        if (!a.price) return 1;
        if (!b.price) return -1;
        return (
          Number(a.price?.replace(" ", "")) - Number(b.price?.replace(" ", ""))
        );
      case "mileage":
        if (!a.mileage) return 1;
        if (!b.mileage) return -1;
        return (
          Number(a.mileage?.replace(" ", "")) -
          Number(b.mileage?.replace(" ", ""))
        );
      default:
        return Number(b.created_at) - Number(a.created_at);
    }
  }

  async function handleDelete(car: Car) {
    await mutate(deleteCar(car), {
      optimisticData: [...data].filter((c) => c.id !== car.id),
    });
  }

  async function handleUpdate(car: Car, values: Car) {
    await mutate(updateCar(car, values), {
      optimisticData: [
        ...data,
        { ...data.find((c) => c.id === car.id), values },
      ],
    });
  }

  return (
    <>
      {/* Container for actions */}
      <div className="flex w-full max-w-md flex-col gap-3">
        {/* Search */}
        <div className="relative mt-3 flex h-fit w-full items-center">
          <Input
            type="text"
            value={searchQuery}
            placeholder="Поиск по названию"
            className="w-full pl-9"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <SearchIcon />
          {searchQuery && (
            <button
              className="absolute right-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300"
              onClick={() => setSearchQuery("")}
            >
              <XIcon />
            </button>
          )}
        </div>
        {/* Toggle sold cars */}
        <div className="mx-auto mt-2 flex w-fit select-none items-center gap-1.5">
          <Input
            id="show-sold"
            className="w-fit accent-black"
            type="checkbox"
            checked={showSoldCars}
            onChange={() => setShowSoldCars(!showSoldCars)}
          />
          <Label htmlFor="show-sold">Показать проданные автомобили</Label>
        </div>
      </div>
      {/* List of cars */}
      <ul className="xs:grid-cols-2 mx-auto mt-8 grid w-full max-w-7xl grid-flow-row auto-rows-max gap-8 text-sm md:grid-cols-3 md:gap-16 xl:grid-cols-4">
        {isLoading &&
          [1, 2, 3, 4].map((item) => (
            <div key={item} className="flex w-full flex-col pb-3">
              <Skeleton className="aspect-[8/5] w-full rounded-md" />
              <Skeleton className="mt-3 h-5 w-2/3" />
              <span className="mt-3 flex items-center justify-between text-lg">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-20" />
              </span>
              <Skeleton className="mt-3 h-4 w-1/2" />
              <Skeleton className="mt-2 h-3 w-2/3" />
              <Skeleton className="mt-2 h-3 w-2/3" />
            </div>
          ))}
        {data
          ?.filter((car) => (showSoldCars ? true : !car.isSold))
          ?.filter(
            (car) =>
              car.name
                ?.toLocaleLowerCase()
                ?.includes(searchQuery?.toLowerCase()),
          )
          ?.map((car: any) => (
            <motion.li
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                  type: "tween",
                  ease: "easeOut",
                },
              }}
              key={car.id}
              className="flex w-full flex-col pb-3"
            >
              <div
                className={`${
                  car.image
                    ? ""
                    : "bg-gradient bg-gradient-to-b from-gray-100 to-gray-200"
                } relative aspect-[8/5] w-full select-none overflow-hidden rounded-md shadow-sm`}
              >
                {car.image ? (
                  <Image
                    src={car.image}
                    fill
                    sizes="384px"
                    className={`${
                      car.isSold ? "brightness-90 saturate-0" : ""
                    } object-cover transition-all duration-700 ease-in-out
                    `}
                    alt=""
                  />
                ) : (
                  <Image
                    src={"/car-placeholder.png"}
                    fill
                    sizes="384px"
                    className={`${
                      car.isSold ? "brightness-90 saturate-0" : ""
                    } object-cover transition-all duration-700 ease-in-out 
                  `}
                    alt=""
                  />
                )}
              </div>
              <p
                className={`${
                  car.isSold ? "line-through" : ""
                } mt-3 flex items-center justify-between text-xl font-semibold`}
              >
                {car.name}, {car.year}
                {/* Edit car info */}
                <UpdateCarForm
                  car={car}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              </p>
              <p className="w-full border-b pb-1"></p>
              <p className="mt-1.5 flex items-center justify-between text-lg">
                {car.price &&
                  (isNaN(car.price.replace(" ", ""))
                    ? car.price
                    : car.price + " ₽")}
                {car.mileage && (
                  <span className="ml-auto text-sm text-gray-600">
                    {car.mileage} км
                  </span>
                )}
              </p>
              {(car.advantages || car.disadvantages) && (
                <div className="mt-3 grid grid-cols-1 gap-6">
                  {/* Advantages */}
                  {car.advantages && (
                    <div>
                      <span className="text-base font-medium">
                        Преимущества
                      </span>
                      <p className="flex flex-col">
                        {car.advantages &&
                          car.advantages.split(",").map((item: string) => (
                            <span key={item} className="flex gap-1.5">
                              <PlusIcon />
                              {item.trim()}
                            </span>
                          ))}
                      </p>
                    </div>
                  )}
                  {/* Disadvantages */}
                  {car.disadvantages && (
                    <div>
                      <span className="text-base font-medium">Недостатки</span>
                      <p className="flex flex-col">
                        {car.disadvantages &&
                          car.disadvantages.split(",").map((item: string) => (
                            <span key={item} className="flex gap-1.5">
                              <MinusIcon />
                              {item.trim()}
                            </span>
                          ))}
                      </p>
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-between pt-6">
                {car.seller && (
                  <span className="flex items-center gap-1 text-sm font-medium text-gray-400">
                    {car.seller}
                  </span>
                )}
                {car.link && (
                  <span className="ml-auto">
                    <ExternalLink url={car.link} />
                  </span>
                )}
              </div>
            </motion.li>
          ))}
      </ul>
    </>
  );
}
