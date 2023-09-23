"use client";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const arrayRange = (start: number, stop: number, step: number) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );

const years = arrayRange(2000, new Date(Date.now()).getFullYear(), 1);

const formSchema = z.object({
  name: z.string().nonempty({ message: "Введите название" }),
  year: z.string().length(4, { message: "Выберите год" }),
  link: z.string(),
  image: z.string(),
  price: z.string(),
  mileage: z.string(),
  seller: z.string().nonempty({ message: "Укажите продавца" }),
  advantages: z.string(),
  disadvantages: z.string(),
  isSold: z.boolean(),
});

// UI
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  FilterIcon,
  PlusSquareIcon,
  PlusIcon,
  MinusIcon,
  SearchIcon,
  SortIcon,
  EditIcon,
} from "@/components/icons";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Checkbox } from "@/components/ui/checkbox";

export default function Cars({ data }: { data: Car[] }) {
  // Creates set and converts to array with unique sellers
  // Used for filtering cars
  const sellersSet = new Set();
  data.forEach((car: Car) => sellersSet.add(car.seller));
  const sellers: string[] = [];
  sellersSet.forEach((seller) => sellers.push(seller as string));
  sellers.sort();
  sellersSet.clear();

  const router = useRouter();

  // Filters and sort key
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("created_at");
  const [showSoldCars, setShowSoldCars] = useState(false);

  function sortCars(a: Car, b: Car, key: string) {
    switch (key) {
      case "created_at":
        return Number(a.created_at) - Number(b.created_at);
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

  return (
    <>
      {/* Container for actions */}
      <div className="flex w-full max-w-md flex-col gap-3">
        {/* Add new car */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full items-center gap-1.5" variant="outline">
              <PlusSquareIcon />
              Добавить автомобиль
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-screen min-w-fit overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Добавить автомобиль</DialogTitle>
            </DialogHeader>
            <AddCarForm router={router} />
            {/* <DialogFooter>
              <DialogClose>
                <Button type="submit" onClick={() => null}>
                  Добавить
                </Button>
              </DialogClose>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>

        {/* Search */}
        <div className="relative mt-3 h-fit w-full">
          <Input
            type="text"
            value={searchQuery}
            placeholder="Поиск по названию"
            className="w-full pl-9"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon />
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
          .filter((car) => (showSoldCars ? true : !car.isSold))
          .filter((car) =>
            car.name.toLocaleLowerCase().includes(searchQuery.toLowerCase()),
          )
          .sort((a, b) => sortCars(a, b, sort))
          .map((car: any) => (
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full items-center gap-1.5"
                      variant="outline"
                    >
                      <EditIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-screen min-w-fit overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Изменить данные</DialogTitle>
                    </DialogHeader>
                    <UpdateCarForm car={car} router={router} />
                  </DialogContent>
                </Dialog>
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

export function AddCarForm({ router }: { router: AppRouterInstance }) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      year: "",
      link: "",
      image: "",
      price: "",
      mileage: "",
      seller: "",
      advantages: "",
      disadvantages: "",
      isSold: false,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    fetch("https://annycars.online/api/cars", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    router.refresh();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:text-red-600 after:content-['*']">
                Название
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Марка и модель</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:text-red-600 after:content-['*']">
                Год выпуска
              </FormLabel>
              <FormControl>
                {/* <Input {...field} /> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[10rem] overflow-y-auto">
                    {years.map((year: number) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seller"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="after:text-red-600 after:content-['*']">
                Продавец
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Название автосалона</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на объявление</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фото</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пробег</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="advantages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Преимущества</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Через запятую</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="disadvantages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Недостатки</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Через запятую</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <DialogClose
            disabled={!form.getValues().name || !form.getValues().year}
          >
            <Button type="submit">Добавить</Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}

export function UpdateCarForm({
  car,
  router,
}: {
  car: Car;
  router: AppRouterInstance;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: car.name,
      year: car.year,
      link: car.link,
      image: car.image,
      price: car.price,
      mileage: car.mileage,
      seller: car.seller,
      advantages: car.advantages,
      disadvantages: car.disadvantages,
      isSold: car.isSold,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const request = { ...values, id: car.id };
    fetch("https://annycars.online/api/cars", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    router.refresh();
  }

  function handleDelete(car: Car) {
    fetch("https://annycars.online/api/cars", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(car),
    });
    router.refresh();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Марка и модель</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Год выпуска</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[10rem] overflow-y-auto">
                    {years.map((year: number) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="seller"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Продавец</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Название автосалона</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ссылка на объявление</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Фото</FormLabel>
              <FormControl>
                <Input placeholder="https://..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mileage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Пробег</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="advantages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Преимущества</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Через запятую</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="disadvantages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Недостатки</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Через запятую</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSold"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-3">
              <FormControl>
                <div className="flex gap-1.5">
                  <Input
                    id="is-sold"
                    className="w-fit accent-black"
                    type="checkbox"
                    defaultChecked={car.isSold}
                    onChange={field.onChange}
                  />
                  <Label htmlFor="is-sold">Автомобиль продан</Label>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Удалить</Button>
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
                <DialogClose>
                  <AlertDialogAction onClick={() => handleDelete(car)}>
                    Удалить
                  </AlertDialogAction>
                </DialogClose>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DialogClose
            disabled={!form.getValues().name || !form.getValues().year}
          >
            <Button type="submit">Сохранить</Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}
