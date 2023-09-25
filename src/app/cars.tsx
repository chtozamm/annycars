"use client";

import Image from "next/image";
import { useState, experimental_useOptimistic as useOptimistic } from "react";
import { motion } from "framer-motion";
import { AddCarForm, UpdateCarForm } from "./forms";

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
import { useRouter } from "next/navigation";

export default function Cars({
  data,
  addCar,
  deleteCar,
  updateCar,
}: {
  data: Car[];
  addCar: Function;
  deleteCar: Function;
  updateCar: Function;
}) {
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
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("created_at");
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
        return 1;
    }
  }

  function resetFilters() {
    setSearchQuery("");
    setFilter("");
    setSort("created_at");
    setShowSoldCars(false);
  }

  const router = useRouter();

  async function handleAdd(car: Car) {
    await addCar(car).then(() => router.refresh());
  }

  async function handleDelete(car: Car) {
    await deleteCar(car).then(() => router.refresh());
  }

  async function handleUpdate(car: Car, values: Car) {
    await updateCar(car, values).then(() => router.refresh());
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
          value={filter}
          defaultValue=""
          onValueChange={(value) => setFilter(value)}
        >
          <SelectTrigger className="relative w-full pl-9">
            <FilterIcon />
            <SelectValue
              placeholder="Выбрать магазин"
              className="placeholder:text-gray-400"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Все продавцы</SelectItem>
            {sellers.map((seller) => (
              <SelectItem key={seller} value={seller}>
                {seller}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Sort cars */}
        <Select
          value={sort}
          defaultValue="created_at"
          onValueChange={(value) => {
            switch (value) {
              case "year":
                setSort("year");
                break;
              case "mileage":
                setSort("mileage");
                break;
              case "price":
                setSort("price");
                break;
              default:
                setSort("created_at");
                break;
            }
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
        <div className="mx-auto mb-3 mt-3 flex w-fit items-center gap-1.5">
          <Input
            id="show-sold"
            className="w-fit accent-black"
            type="checkbox"
            checked={showSoldCars}
            onChange={() => setShowSoldCars(!showSoldCars)}
          />
          <Label htmlFor="show-sold">Показать проданные автомобили</Label>
        </div>
        {/* Reset filters */}
        <Button
          onDoubleClickCapture={(e) => {
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
      <ul className="mx-auto mt-8 grid w-full max-w-7xl grid-flow-row auto-rows-max gap-8 text-sm md:mt-16 md:grid-cols-2 md:gap-16 lg:grid-cols-3">
        {data
          ?.filter((car) => (filter ? car.seller === filter : true))
          ?.filter((car) => (showSoldCars ? true : !car.isSold))
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
              <div className="relative aspect-[8/5] w-full select-none overflow-hidden rounded-md bg-gray-100 shadow-md">
                {car.image && (
                  <Image
                    src={car.image}
                    fill
                    sizes="384px"
                    className={`${
                      car.isSold ? "brightness-90 saturate-0" : ""
                    } bg-gray-200 object-cover transition-all duration-700 ease-in-out
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
              <div className="mt-3 grid grid-cols-1 gap-6">
                {/* Advantages */}
                {car.advantages && (
                  <div>
                    <span className="text-base font-medium">Преимущества</span>
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
