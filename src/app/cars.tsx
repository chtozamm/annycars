"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { AddCarForm } from "./forms";
import useSWR from "swr";

import ExternalLink from "@/components/externalLink";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  FilterIcon,
  PlusIcon,
  MinusIcon,
  SearchIcon,
  SortIcon,
  XIcon,
} from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Cars({
  serverCars,
  addCar,
}: {
  serverCars: Car[];
  addCar: Function;
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

  const router = useRouter();
  const pathname = usePathname();
  // Filters and sort key
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") ?? "all";
  const sort = searchParams.get("sort") ?? "";
  const [searchQuery, setSearchQuery] = useState("");
  const sold = searchParams.get("sold") ?? "";

  // Creates set and converts to array with unique sellers
  // Used for filtering cars
  const sellersSet = new Set();
  if (sold === "true") {
    data.forEach((car: Car) => sellersSet.add(car.seller));
  } else {
    data
      .filter((car) => !car.isSold)
      .forEach((car: Car) => sellersSet.add(car.seller));
  }
  const sellers: string[] = [];
  sellersSet.forEach((seller) => sellers.push(seller as string));
  sellers.sort();
  sellersSet.clear();

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

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function resetFilters() {
    setSearchQuery("");
    router.push("/", { scroll: false });
  }

  async function handleAdd(car: Car) {
    await mutate(addCar(car), {
      optimisticData: [...data, { ...car, id: Math.random() }],
    });
  }
  return (
    <>
      {/* Container for actions */}
      <div className="flex w-full max-w-md flex-col gap-3">
        {/* Add new car */}
        <AddCarForm handleAdd={handleAdd} />
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
        {/* Filter by seller */}
        <Select
          value={filter || "all"}
          onValueChange={(value) =>
            router.push(pathname + "?" + createQueryString("filter", value), {
              scroll: false,
            })
          }
        >
          <SelectTrigger className="relative w-full pl-9">
            <FilterIcon />
            <SelectValue
              placeholder="Выбрать магазин"
              className="placeholder:text-gray-400"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все продавцы</SelectItem>
            {sellers.map((seller) => (
              <SelectItem key={seller} value={seller}>
                {seller}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Sort cars */}
        <Select
          value={sort || "created_at"}
          onValueChange={(value) => {
            router.push(pathname + "?" + createQueryString("sort", value), {
              scroll: false,
            });
          }}
        >
          <SelectTrigger className="relative w-full pl-9">
            <SortIcon />
            <SelectValue placeholder="по дате добавления" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem defaultChecked value="created_at">
              по дате добавления
            </SelectItem>
            <SelectItem value="year">по году выпуска</SelectItem>
            <SelectItem value="mileage">по пробегу</SelectItem>
            <SelectItem value="price">по цене</SelectItem>
          </SelectContent>
        </Select>
        {/* Toggle sold cars */}
        <div className="mx-auto mb-3 mt-3 flex w-fit select-none items-center gap-1.5">
          <Input
            id="show-sold"
            className="w-fit accent-black"
            type="checkbox"
            checked={sold === "true"}
            onChange={() =>
              router.push(
                pathname +
                  "?" +
                  createQueryString("sold", sold === "true" ? "false" : "true"),
                {
                  scroll: false,
                },
              )
            }
          />
          <Label htmlFor="show-sold">Показать проданные автомобили</Label>
        </div>
        {/* Reset filters */}
        <Button
          onClick={(e) => {
            resetFilters();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              resetFilters();
            }
          }}
        >
          Сбросить фильтры
        </Button>
      </div>
      {/* List of cars */}
      <ul className="xs:grid-cols-2 mx-auto mt-8 grid w-full max-w-7xl grid-flow-row auto-rows-max gap-8 text-sm md:mt-16 md:grid-cols-3 md:gap-16 xl:grid-cols-4">
        {isLoading &&
          [1, 2, 3].map((item) => (
            <div key={item} className="flex w-full flex-col pb-3">
              <Skeleton className="aspect-[8/5] w-full rounded-md" />
              <Skeleton className="mt-3 h-7 w-full" />
              <p className="w-full border-b pb-1"></p>
              <span className="mt-1.5 flex items-center justify-between text-lg">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-20" />
              </span>
            </div>
          ))}
        {data
          ?.filter((car) => (filter !== "all" ? car.seller === filter : true))
          ?.filter((car) => (sold === "true" ? true : !car.isSold))
          ?.filter(
            (car) =>
              car.name
                ?.toLocaleLowerCase()
                ?.includes(searchQuery?.toLowerCase()),
          )
          ?.sort((a, b) => sortCars(a, b, sort))
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
                    : "bg-gradient bg-gradient-to-b from-gray-50 to-gray-100"
                } relative aspect-[8/5] w-full select-none overflow-hidden rounded-md shadow-sm`}
              >
                {car.image && (
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
                )}
              </div>
              <p
                className={`${
                  car.isSold ? "line-through" : ""
                } mt-3 flex items-center justify-between text-xl font-semibold`}
              >
                {car.name}, {car.year}
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
