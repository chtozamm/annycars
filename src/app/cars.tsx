"use client";

import Image from "next/image";
import {
  useState,
  useRef,
  useEffect,
  experimental_useOptimistic as useOptimistic,
} from "react";
import { motion } from "framer-motion";

// UI
import ExternalLink from "@/components/externalLink";
import { PlusIcon, MinusIcon, PersonIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Cars({
  data,
  addCar,
  updateCar,
  deleteCar,
}: {
  data: Car[];
  addCar: Function;
  updateCar: Function;
  deleteCar: Function;
}) {
  // Creates set and converts to array with unique sellers
  // Used for filtering cars
  const sellersSet = new Set();
  data.forEach((car: Car) => sellersSet.add(car.seller));
  const sellers: string[] = [];
  sellersSet.forEach((seller) => sellers.push(seller as string));
  sellers.sort();
  sellersSet.clear();

  const [inputState, setInputState] = useState("");
  const [filterState, setFilterState] = useState("Все продавцы");
  const [sortState, setSortState] = useState("created_at");
  const [isLoading, setLoading] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  const [optimisticCars, addOptimisticCars] = useOptimistic<Car[]>(data);

  const [formName, setFormName] = useState("");
  const [formYear, setFormYear] = useState("");
  const [formLink, setFormLink] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formMileage, setFormMileage] = useState("");
  const [formSeller, setFormSeller] = useState("");
  const [formAdvantages, setFormAdvantages] = useState("");
  const [formDisadvantages, setFormDisadvantages] = useState("");

  function sortCars(optimisticCars: Car[], value: string) {
    switch (value) {
      case "year":
        addOptimisticCars(
          [...optimisticCars].sort((a, b) => Number(b.year) - Number(a.year)),
        );
        break;
      case "mileage":
        addOptimisticCars(
          [...optimisticCars].sort(
            (a, b) =>
              Number(a.mileage?.replace(" ", "")) -
              Number(b.mileage?.replace(" ", "")),
          ),
        );
        break;
      case "price":
        addOptimisticCars(
          [...optimisticCars].sort((a, b) => {
            if (isNaN(Number(a.price?.replace(" ", "")))) return 1;
            if (isNaN(Number(b.price?.replace(" ", "")))) return -1;
            return (
              Number(a.price?.replace(" ", "")) -
              Number(b.price?.replace(" ", ""))
            );
          }),
        );
        break;
      case "created_at":
        addOptimisticCars(
          [...optimisticCars].sort(
            (a, b) => b.created_at!.valueOf() - a.created_at!.valueOf(),
          ),
        );
        break;
      default:
        break;
    }
  }

  function resetFilters() {
    setInputState("");
    searchRef!.current!.value = "";
    setFilterState("Все продавцы");
    setSortState("created_at");
    addOptimisticCars(data);
  }

  async function handleAddCar() {
    await addCar({
      name: formName,
      year: formYear,
      link: formLink,
      image: formImage,
      price: formPrice,
      mileage: formMileage,
      advantages: formAdvantages,
      disadvantages: formDisadvantages,
    });
    setFormName("");
    setFormYear("");
    setFormLink("");
    setFormImage("");
    setFormPrice("");
    setFormMileage("");
    setFormAdvantages("");
    setFormDisadvantages("");
  }

  async function handleUpdateCar(car: Car) {
    await updateCar({
      ...car,
      name: formName || car.name,
      year: formYear,
      link: formLink,
      image: formImage,
      price: formPrice,
      mileage: formMileage,
      seller: formSeller,
      advantages: formAdvantages,
      disadvantages: formDisadvantages,
    });
    setFormName("");
    setFormYear("");
    setFormLink("");
    setFormImage("");
    setFormPrice("");
    setFormMileage("");
    setFormAdvantages("");
    setFormDisadvantages("");
  }

  useEffect(() => {
    sortCars(optimisticCars, sortState);
    // // eslint-disable-next-line
  }, [sortState, inputState, filterState]);

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.8,
            type: "tween",
            ease: "easeOut",
          },
        }}
        className="pointer-events-none flex h-20 w-full max-w-md cursor-default select-none items-center justify-center gap-1.5 text-2xl font-semibold"
      >
        <svg
          className="h-8 w-8"
          fill="none"
          height="24"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2L2 19.7778H22L12 2Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        annycars
      </motion.header>
      {/* Container for actions */}
      <motion.div
        className="mx-auto flex w-full max-w-md flex-col justify-center"
        initial={{ opacity: 0, y: "10px" }}
        animate={{
          opacity: 1,
          y: "0px",
          transition: {
            duration: 0.8,
            type: "tween",
            ease: "easeOut",
            delay: 0.5,
          },
        }}
      >
        {/* Add new car */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="mb-6 flex items-center gap-1.5"
              variant="outline"
              onClick={() => {}}
            >
              <svg
                className="mt-0.5 h-4 w-4"
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <path d="M12 8v8" />
                <path d="M8 12h8" />
              </svg>
              Добавить автомобиль
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить автомобиль</DialogTitle>
              <DialogDescription>
                Необходимо добавить название и ссылку на объявление.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="name"
                  className="break-words text-right"
                >
                  Название
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="year"
                  className="break-words text-right"
                >
                  Год выпуска
                </Label>
                <Input
                  id="year"
                  className="col-span-3"
                  value={formYear}
                  onChange={(e) => setFormYear(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="link"
                  className="break-words text-right"
                >
                  Объявление
                </Label>
                <Input
                  id="link"
                  className="col-span-3"
                  placeholder="https://"
                  required
                  value={formLink}
                  onChange={(e) => setFormLink(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="image"
                  className="break-words text-right"
                >
                  Фото
                </Label>
                <Input
                  id="image"
                  className="col-span-3"
                  placeholder="https://"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                />
              </div>
              <div className="relative grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="price"
                  className="break-words text-right"
                >
                  Цена
                </Label>
                <Input
                  id="price"
                  className="col-span-3 pr-10"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                />
                <span className="absolute right-4 top-2">₽</span>
              </div>
              <div className="relative grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="mileage"
                  className="break-words text-right"
                >
                  Пробег
                </Label>
                <Input
                  id="mileage"
                  className="col-span-3 pr-10"
                  value={formMileage}
                  onChange={(e) => setFormMileage(e.target.value)}
                />
                <span className="absolute right-3 top-2">км</span>
              </div>
              <div className="relative grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="seller"
                  className="break-words text-right"
                >
                  Продавец
                </Label>
                <Input
                  id="seller"
                  className="col-span-3"
                  value={formSeller}
                  onChange={(e) => setFormSeller(e.target.value)}
                />
              </div>
              <div className="relative grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="advantages"
                  className="break-words text-right"
                >
                  Преимущества
                </Label>
                <Input
                  id="advantages"
                  className="col-span-3"
                  value={formAdvantages}
                  onChange={(e) => setFormAdvantages(e.target.value)}
                  placeholder="через запятую"
                />
              </div>
              <div className="relative grid grid-cols-4 items-center gap-4">
                <Label
                  // htmlFor="disadvantages"

                  className="break-words text-right"
                >
                  Недостатки
                </Label>
                <Input
                  id="disadvantages"
                  className="col-span-3"
                  value={formDisadvantages}
                  onChange={(e) => setFormDisadvantages(e.target.value)}
                  placeholder="через запятую"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => handleAddCar()}>
                Добавить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* Search */}
        <div className="relative h-fit w-full max-w-md">
          <Input
            type="text"
            value={inputState}
            placeholder="Поиск по названию"
            className="mb-3 w-full max-w-md pl-9"
            ref={searchRef}
            onChange={(e) => {
              setInputState(e.target.value);
              if (filterState === "Все продавцы") {
                const filtered = [...data].filter((car: Car) =>
                  car.name.toLowerCase().includes(e.target.value.toLowerCase()),
                );
                addOptimisticCars(filtered);
              } else {
                const filtered = [...data].filter(
                  (car: Car) =>
                    car.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()) &&
                    car.seller === filterState,
                );
                addOptimisticCars(filtered);
              }
            }}
          />
          <svg
            fill="none"
            height="24"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            viewBox="0 0 24 24"
            width="24"
            className="pointer-events-none absolute left-3 top-3 h-4 w-4 select-none text-gray-500"
          >
            <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z" />
            <path d="M16 16l4.5 4.5" />
          </svg>
          {searchRef?.current?.value && (
            <button
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => {
                searchRef!.current!.value = "";
                setInputState("");
                if (filterState === "Все продавцы") {
                  addOptimisticCars(data);
                } else {
                  addOptimisticCars(
                    [...data].filter((car: Car) => car.seller === filterState),
                  );
                }
              }}
            >
              <svg
                className="h-4 w-4"
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {/* Filter */}
        <Select
          value={filterState}
          defaultValue="Все продавцы"
          onValueChange={(value) => {
            if (value === "Все продавцы") {
              setFilterState("Все продавцы");
              const filtered = [...data].filter((car: Car) =>
                car.name.toLowerCase().includes(inputState.toLowerCase()),
              );
              addOptimisticCars(filtered);
            } else {
              setFilterState(value);
              const filtered = [...data].filter(
                (car: Car) =>
                  car.seller === value &&
                  car.name.toLowerCase().includes(inputState.toLowerCase()),
              );
              addOptimisticCars(filtered);
            }
          }}
        >
          <SelectTrigger className="relative mb-3 w-full max-w-md pl-9">
            <svg
              className="pointer-events-none absolute left-3 top-3 h-4 w-4 select-none text-gray-500"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            <SelectValue
              placeholder="Выбрать магазин"
              className="placeholder:text-gray-400"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Все продавцы">Все продавцы</SelectItem>
            {sellers.map((seller) => (
              <SelectItem key={seller} value={seller}>
                {seller}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Sort */}
        <Select
          value={sortState}
          defaultValue="created_at"
          onValueChange={(value) => {
            switch (value) {
              case "created_at":
                setSortState("created_at");
                break;
              case "year":
                setSortState("year");
                break;
              case "mileage":
                setSortState("mileage");
                break;
              case "price":
                setSortState("price");
                break;
              default:
                break;
            }
          }}
        >
          <SelectTrigger className="relative mb-6 w-full max-w-md pl-9">
            <svg
              className="pointer-events-none absolute left-3 top-3 h-4 w-4 select-none text-gray-500"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M15 18H3M21 6H3M17 12H3" />
            </svg>
            <SelectValue
              placeholder="по дате добавления"
              className="placeholder:text-gray-400"
            />
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
        {/* Reset filters */}
        <Button
          className="mb-6 w-full max-w-md"
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
      </motion.div>
      {/* List of cars */}
      <motion.ul
        initial={{ opacity: 0, y: "10px" }}
        animate={{
          opacity: 1,
          y: "0px",
          transition: {
            duration: 0.8,
            type: "tween",
            ease: "easeOut",
            delay: 1,
          },
        }}
        className="mx-auto mt-8 grid w-full max-w-7xl grid-flow-row auto-rows-max gap-8 text-sm md:mt-16 md:grid-cols-2 md:gap-16 lg:grid-cols-3"
      >
        {optimisticCars?.map((car: any) => (
          <li key={car.id} className="flex w-full flex-col pb-3">
            <div className="relative mb-6 aspect-[8/5] w-full select-none overflow-hidden rounded-md shadow-sm">
              <Image
                src={car.image}
                fill
                className={`bg-gray-200 object-cover transition-all duration-700 ease-in-out  ${
                  isLoading ? "scale-110 blur-2xl" : "scale-100 blur-0"
                }`}
                alt=""
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
            <p className="flex items-center justify-between text-xl font-semibold">
              {car.name}, {car.year}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-gray-400"
                    onClick={() => {
                      setFormName(car.name);
                      setFormYear(car.year);
                      setFormLink(car.link);
                      setFormImage(car.image);
                      setFormPrice(car.price);
                      setFormMileage(car.mileage);
                      setFormAdvantages(car.advantages);
                      setFormDisadvantages(car.disadvantages);
                    }}
                  >
                    <svg
                      fill="none"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                    >
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Изменить данные</DialogTitle>
                    {/* <DialogDescription>
                      Обязательными полями являются только &quot;Название&quot;
                      и &quot;Ссылка на объявление&quot;.
                    </DialogDescription> */}
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="name"
                        className="break-words text-right"
                      >
                        Название
                      </Label>
                      <Input
                        id="name"
                        className="col-span-3"
                        required
                        defaultValue={car.name}
                        onChange={(e) => setFormName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="year"
                        className="break-words text-right"
                      >
                        Год выпуска
                      </Label>
                      <Input
                        id="year"
                        className="col-span-3"
                        defaultValue={car.year}
                        onChange={(e) => setFormYear(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="link"
                        className="break-words text-right"
                      >
                        Объявление
                      </Label>
                      <Input
                        id="link"
                        className="col-span-3"
                        placeholder="https://"
                        required
                        defaultValue={car.link}
                        onChange={(e) => setFormLink(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="image"
                        className="break-words text-right"
                      >
                        Фото
                      </Label>
                      <Input
                        id="image"
                        className="col-span-3"
                        placeholder="https://"
                        defaultValue={car.image}
                        onChange={(e) => setFormImage(e.target.value)}
                      />
                    </div>
                    <div className="relative grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="price"
                        className="break-words text-right"
                      >
                        Цена
                      </Label>
                      <Input
                        id="price"
                        className="col-span-3 pr-10"
                        defaultValue={car.price}
                        onChange={(e) => setFormPrice(e.target.value)}
                      />
                      <span className="absolute right-4 top-2">₽</span>
                    </div>
                    <div className="relative grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="mileage"

                        className="break-words text-right"
                      >
                        Пробег
                      </Label>
                      <Input
                        id="mileage"
                        className="col-span-3 pr-10"
                        defaultValue={car.mileage}
                        onChange={(e) => setFormMileage(e.target.value)}
                      />
                      <span className="absolute right-3 top-2">км</span>
                    </div>
                    <div className="relative grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="seller"

                        className="break-words text-right"
                      >
                        Продавец
                      </Label>
                      <Input
                        id="seller"
                        className="col-span-3"
                        defaultValue={car.seller}
                        onChange={(e) => setFormSeller(e.target.value)}
                      />
                    </div>
                    <div className="relative grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="advantages"

                        className="break-words text-right"
                      >
                        Преимущества
                      </Label>
                      <Input
                        id="advantages"
                        className="col-span-3"
                        defaultValue={car.advantages}
                        onChange={(e) => setFormAdvantages(e.target.value)}
                        placeholder="через запятую"
                      />
                    </div>
                    <div className="relative grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="disadvantages"

                        className="break-words text-right"
                      >
                        Недостатки
                      </Label>
                      <Input
                        id="disadvantages"
                        className="col-span-3"
                        defaultValue={car.disadvantages}
                        onChange={(e) => setFormDisadvantages(e.target.value)}
                        placeholder="через запятую"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" className="mt-3 sm:mt-0">
                          Удалить
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Вы уверены, что хотите удалить объявление?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {car.name}, {car.year}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => await deleteCar(car)}
                          >
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button type="submit" onClick={() => handleUpdateCar(car)}>
                      Сохранить
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </p>
            <p className="mb-1 w-full border-b pb-1"></p>
            <p className="flex items-center justify-between text-lg">
              {car.price &&
                (isNaN(car.price.replace(" ", ""))
                  ? car.price
                  : car.price + " ₽")}
              <span className="text-sm text-gray-600">{car.mileage} км</span>
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6">
              {/* Advantages */}
              <div>
                <span className="text-base font-medium">Преимущества</span>
                <p className="mt-1 flex flex-col">
                  {car.advantages &&
                    car.advantages.split(",").map((item: string) => (
                      <span key={item} className="flex gap-1.5">
                        <PlusIcon className="mt-1.5 h-2 w-2" />
                        {item.trim()}
                      </span>
                    ))}
                </p>
              </div>
              {/* Disadvantages */}
              <div>
                <span className="text-base font-medium">Недостатки</span>
                <p className="mt-1 flex flex-col">
                  {car.disadvantages &&
                    car.disadvantages.split(",").map((item: string) => (
                      <span key={item} className="flex gap-1.5">
                        <MinusIcon className="mt-1.5 h-2 w-2" />
                        {item.trim()}
                      </span>
                    ))}
                </p>
              </div>
            </div>
            <div className="mt-auto flex justify-between pt-6">
              {car.seller && (
                <span className="flex items-center gap-1 text-sm font-medium text-gray-400">
                  <PersonIcon className="mt-0.5 h-4 w-4" />
                  {car.seller}
                </span>
              )}
              {car.link && <ExternalLink url={car.link} />}
            </div>
          </li>
        ))}
      </motion.ul>
    </>
  );
}
