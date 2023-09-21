"use client";

import { PlusIcon, MinusIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import ExternalLink from "@/components/externalLink";
import { useState, useRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function Cars({ data }: { data: any }) {
  const [cars, setCars] = useState(data);
  const [inputState, setInputState] = useState("");
  const [selectState, setSelectState] = useState("Все салоны");
  const [isLoading, setLoading] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <div className="relative h-fit w-full max-w-md">
        <Input
          type="text"
          placeholder="Поиск по названию"
          className="mb-3 w-full max-w-md pl-9"
          ref={searchRef}
          onChange={(e) => {
            setInputState(e.target.value);
            if (selectState === "Все салоны") {
              const filtered = [...data].filter((car: Car) =>
                car.name.toLowerCase().includes(e.target.value.toLowerCase()),
              );
              setCars(filtered);
            } else {
              const filtered = [...data].filter(
                (car: Car) =>
                  car.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) &&
                  car.location === selectState,
              );
              setCars(filtered);
            }
          }}
        />
        <svg
          data-testid="geist-icon"
          fill="none"
          height="24"
          shape-rendering="geometricPrecision"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.6"
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
              if (selectState === "Все салоны") {
                setCars(data);
              } else {
                setCars(
                  [...data].filter((car: Car) => car.location === selectState),
                );
              }
            }}
          >
            <svg
              className="h-4 w-4"
              data-testid="geist-icon"
              fill="none"
              height="24"
              shape-rendering="geometricPrecision"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.6"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <Select
        onValueChange={(value) => {
          if (value === "Все салоны") {
            setSelectState("Все салоны");
            const filtered = [...data].filter((car: Car) =>
              car.name.toLowerCase().includes(inputState.toLowerCase()),
            );
            setCars(filtered);
          } else {
            setSelectState(value);
            const filtered = [...data].filter(
              (car: Car) =>
                car.location === value &&
                car.name.toLowerCase().includes(inputState.toLowerCase()),
            );
            setCars(filtered);
          }
        }}
      >
        <SelectTrigger className="relative mb-6 w-full max-w-md pl-9">
          <svg
            className="pointer-events-none absolute left-3 top-3 h-4 w-4 select-none text-gray-500"
            data-testid="geist-icon"
            fill="none"
            height="24"
            shape-rendering="geometricPrecision"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.6"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M15 18H3M21 6H3M17 12H3" />
          </svg>
          <SelectValue placeholder="Сортировать по компании" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Все салоны">Все салоны</SelectItem>
          {data.map(
            (car: Car) =>
              car.location && (
                <SelectItem key={car.id} value={car.location}>
                  {car.location}
                </SelectItem>
              ),
          )}
        </SelectContent>
      </Select>
      <ul className="grid w-full grid-flow-row auto-rows-max gap-8 text-sm md:w-auto md:grid-cols-2">
        {cars?.map((car: any) => (
          <li key={car.id} className="flex w-full flex-col border-b pb-3">
            <div className="relative mb-6 aspect-[8/5] w-full select-none overflow-hidden rounded-md shadow-sm transition-all duration-300 md:h-72 md:w-96">
              <Image
                src={car.image}
                fill
                className={`object-cover transition-all duration-700 ease-in-out  ${
                  isLoading ? "scale-110 blur-2xl" : "scale-100 blur-0"
                }`}
                alt=""
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
            <p className="flex items-end justify-between text-xl font-semibold">
              {car.name}, {car.year}
            </p>
            <p className="mb-1 w-full border-b pb-1"></p>
            <p className="flex items-center justify-between text-lg">
              {car.price && car.price + " ₽"}
              <span className="text-sm font-light">
                Mileage: {car.mileage} km
              </span>
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {/* Advantages */}
              <div className="grid grid-cols-2">
                <div>
                  <span className="mx-auto mb-1 inline-block w-fit text-base font-medium">
                    Pros
                  </span>
                  <p className="flex flex-col">
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
                  <span className="mx-auto mb-1 inline-block w-fit text-base font-medium">
                    Cons
                  </span>
                  <p className="flex flex-col">
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
            </div>
            <div className="mt-auto flex justify-between pt-6">
              {car.location && (
                <span className="flex items-center gap-1 text-sm text-gray-400">
                  {car.location}
                  {/* <PersonIcon className="mt-0.5 h-3 w-3" /> */}
                </span>
              )}
              {car.offer_link && <ExternalLink url={car.offer_link} />}
            </div>
            {/* <span className="flex items-center gap-1">
              edit
              <svg
                data-testid="geist-icon"
                fill="none"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                className="h-4 w-4"
              >
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </span> */}
          </li>
        ))}
      </ul>
    </>
  );
}
