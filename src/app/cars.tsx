"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AddCarForm, UpdateCarForm } from "./forms";
import useSWR from "swr";

import ExternalLink from "@/components/externalLink";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  GridIcon,
  ListIcon,
} from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Switch } from "@/components/ui/switch";

export default function Cars({
  serverCars,
  addCar,
  deleteCar,
  updateCar,
}: {
  serverCars: Car[];
  addCar: Function;
  deleteCar: Function;
  updateCar: Function;
}) {
  const session = useSession();

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
  const display = searchParams.get("display") ?? "";
  // const [showPersonal, setShowPersonal] = useState(false);

  const amountOfShownCars = data
    ?.filter((car) => (filter !== "all" ? car.seller === filter : true))
    ?.filter((car) => (sold === "true" ? true : !car.isSold))
    ?.filter((car) => (sort ? !car.personal : true))
    ?.filter(
      (car) =>
        car.name?.toLocaleLowerCase()?.includes(searchQuery?.toLowerCase()),
    ).length;

  // Creates set and converts to array with unique sellers
  // Used for filtering cars
  const sellersSet = new Set();
  if (sold === "true") {
    // if (!showPersonal) {
    //   data
    //     .filter((car) => !car.personal)
    //     .forEach((car: Car) => sellersSet.add(car.seller));
    // } else {
    data.forEach((car: Car) => sellersSet.add(car.seller));
    // }
  } else {
    // if (!showPersonal) {
    //   data
    //     .filter((car) => !car.personal)
    //     .filter((car) => !car.isSold)
    //     .forEach((car: Car) => sellersSet.add(car.seller));
    // } else {
    data
      .filter((car) => !car.isSold)
      .forEach((car: Car) => sellersSet.add(car.seller));
    // }
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

  useEffect(() => {
    if (searchParams.get("filter") === "🦊🐺" && searchParams.get("sort")) {
      router.push(pathname + "?" + createQueryString("sort", ""), {
        scroll: false,
      });
    }
  }, [filter, router, searchParams, createQueryString, pathname]);
  return (
    <>
      {/* Container for actions */}
      <div className="flex w-full max-w-md flex-col gap-3">
        {/* Fun mode */}
        {/* {session.data && (
          <div className="mx-auto mb-3 flex w-fit select-none items-center gap-1.5">
            <Label htmlFor="show-personal">Fun mode</Label>
            <Switch
              id="show-personal"
              className="accent-black"
              checked={showPersonal}
              onCheckedChange={() => setShowPersonal(!showPersonal)}
            />
          </div>
        )} */}
        {/* Add new car */}
        {session.data && <AddCarForm handleAdd={handleAdd} />}
        {/* Search */}
        <div
          className={`${
            session.data && "mt-3"
          } relative flex h-fit w-full items-center`}
        >
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
          disabled={filter === "🦊🐺"}
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
            disabled={filter === "🦊🐺"}
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
        <p className="mt-3 text-center text-sm">
          {isLoading
            ? "Загружаем автомобили... 🦔"
            : amountOfShownCars === 0
            ? "Нет автомобилей, удовлетворяющих выбранные фильтры"
            : amountOfShownCars === 1
            ? "Показан 1 автомобиль"
            : amountOfShownCars > 1 && amountOfShownCars < 5
            ? `Показано ${amountOfShownCars} автомобиля`
            : `Показано ${amountOfShownCars} автомобилей`}
        </p>
        {/* Display grid/list */}
        <div className="mt-3 hidden w-full sm:block">
          <p className="text-center text-sm font-medium">Вид:</p>
          <div className="mt-3 hidden w-full justify-center gap-3 sm:flex">
            <Button
              variant="outline"
              disabled={display !== "grid"}
              onClick={() =>
                router.push(
                  pathname + "?" + createQueryString("display", "list"),
                  {
                    scroll: false,
                  },
                )
              }
            >
              <ListIcon />
            </Button>
            <Button
              variant="outline"
              disabled={display === "grid"}
              onClick={() =>
                router.push(
                  pathname + "?" + createQueryString("display", "grid"),
                  {
                    scroll: false,
                  },
                )
              }
            >
              <GridIcon />
            </Button>
          </div>
        </div>
      </div>
      {/* List of cars */}
      <ul
        className={`${
          display === "list"
            ? "sm:flex sm:max-w-3xl sm:flex-col"
            : display === "grid"
            ? "justify-items-center sm:grid-cols-2 md:gap-16 lg:max-w-7xl lg:grid-cols-3 xl:grid-cols-4"
            : ""
        } mx-auto mt-8 grid w-full max-w-md grid-flow-row auto-rows-max gap-8 text-sm sm:max-w-3xl`}
      >
        {isLoading &&
          [1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex w-full flex-col rounded-md pb-3 sm:mx-auto sm:max-w-5xl sm:flex-row sm:gap-8 sm:border sm:p-6"
            >
              <Skeleton className="aspect-[4/3] w-full rounded-md shadow-sm sm:h-fit sm:max-w-xs" />
              <div className="w-full">
                <Skeleton className="mt-3 h-5 w-2/3" />
                <span className="mt-3 flex items-center justify-between text-lg">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-20" />
                </span>
                <Skeleton className="mt-3 h-4 w-1/2" />
                <Skeleton className="mt-2 h-3 w-2/3" />
                <Skeleton className="mt-2 h-3 w-2/3" />
              </div>
            </div>
          ))}
        {data
          ?.filter((car) => (filter !== "all" ? car.seller === filter : true))
          ?.filter((car) => (sold === "true" ? true : !car.isSold))
          ?.filter((car) => (sort ? !car.personal : true))
          ?.filter(
            (car) =>
              car.name
                ?.toLocaleLowerCase()
                ?.includes(searchQuery?.toLowerCase()),
          )
          ?.sort((a, b) => sortCars(a, b, sort))
          // ?.filter((car) => (!showPersonal ? !car.personal : true))
          ?.map((car: any) => (
            <motion.li
              key={car.id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                  type: "tween",
                  ease: "easeOut",
                },
              }}
              className={`${
                display === "grid"
                  ? "flex w-full flex-col pb-3 sm:max-w-xs"
                  : "sm:mx-auto sm:max-w-5xl sm:flex-row sm:gap-8 sm:border sm:p-6"
              } flex w-full flex-col rounded-md pb-3`}
            >
              {/* Car image */}
              <div className="flex w-full flex-col justify-between gap-6">
                <div
                  className={`${
                    car.image
                      ? ""
                      : "bg-gradient bg-gradient-to-b from-gray-100 to-gray-200"
                  } relative aspect-[4/3] w-full select-none overflow-hidden rounded-md shadow-sm sm:h-fit sm:max-w-xs`}
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
                  ) : car.name === "Fox" ? (
                    <Image
                      src={"/fox.png"}
                      fill
                      sizes="360px"
                      className="bg-white object-contain transition-all duration-700 ease-in-out"
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
                {car.seller && display !== "grid" && (
                  <button
                    onClick={() => {
                      router.push(
                        pathname +
                          "?" +
                          createQueryString("filter", car.seller),
                        {
                          scroll: false,
                        },
                      );
                    }}
                    className="hidden items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-300 sm:flex"
                  >
                    {car.seller}
                  </button>
                )}
              </div>
              {/* Car info */}
              <div className="sm:flex sm:w-full sm:flex-col sm:justify-between sm:gap-3">
                <div>
                  <div
                    className={`mt-3 flex w-full items-center justify-between sm:mt-0 ${
                      display !== "list" && "sm:mt-3"
                    }`}
                  >
                    {car.link ? (
                      <AlertDialog>
                        <AlertDialogTrigger className="w-fit select-text rounded-sm text-black transition-colors duration-150 ease-in-out  focus-visible:text-zinc-700  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2">
                          <p
                            className={`${
                              car.isSold ? "line-through" : ""
                            } flex items-center justify-between text-xl font-semibold hover:text-gray-600 ${
                              display !== "grid" && "sm:mt-0"
                            }`}
                          >
                            {car.name}, {car.year}
                          </p>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Перейти к объявлению?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => window.open(car.link, "_blank")}
                            >
                              Перейти
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    ) : (
                      <p
                        className={`${
                          car.isSold ? "line-through" : ""
                        } flex items-center justify-between text-xl font-semibold ${
                          display !== "grid" && "sm:mt-0"
                        }`}
                      >
                        {car.name}, {car.year}
                      </p>
                    )}

                    {/* Edit car info */}
                    {session.data && (
                      <p>
                        <UpdateCarForm
                          car={car}
                          handleDelete={handleDelete}
                          handleUpdate={handleUpdate}
                        />
                      </p>
                    )}
                  </div>
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
                </div>
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
                        <span className="text-base font-medium">
                          Недостатки
                        </span>
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
                    <button
                      onClick={() =>
                        router.push(
                          pathname +
                            "?" +
                            createQueryString("filter", car.seller),
                          {
                            scroll: false,
                          },
                        )
                      }
                      className={`${
                        display !== "grid" && "sm:hidden"
                      } flex items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-300`}
                    >
                      {car.seller}
                    </button>
                  )}
                  {/* {car.link && (
                    <span className="ml-auto pl-1.5">
                      <ExternalLink url={car.link} />
                    </span>
                  )} */}
                </div>
              </div>
            </motion.li>
          ))}
      </ul>
    </>
  );
}
