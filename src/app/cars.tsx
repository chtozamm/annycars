"use client";

import { PlusIcon, MinusIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import ExternalLink from "@/components/externalLink";

export default function Cars({ cars }: { cars: any }) {
  return (
    <ul className="grid w-full grid-flow-row auto-rows-max gap-8 text-sm md:w-auto md:grid-cols-2">
      {cars?.map((car: any) => (
        <li key={car.id} className="flex w-full flex-col pb-3">
          <div className="relative mb-3 aspect-[8/5]  w-full overflow-hidden rounded-md shadow-sm md:h-72 md:w-96">
            <Image src={car.image} fill className="object-cover" alt="" />
          </div>
          <p className="flex items-center justify-between text-xl font-semibold">
            {car.name}, {car.year}
            {car.offer_link && <ExternalLink url={car.offer_link} />}
          </p>
          <p className="mb-1 w-full border-b pb-1"></p>
          <p className="flex items-center justify-between text-lg">
            {car.price && car.price + " ₽"}
          </p>
          <div className="flex flex-col gap-3">
            {/* {car.location && (
              <p className="flex items-center gap-1"> */}
            {/* <PersonIcon className="h-4 w-4" /> */}
            {/* {car.location}
              </p>
            )} */}
            <p className="mt-1.5">Mileage: {car.mileage} km</p>
            <div>
              <p className="flex flex-col">
                {car.advantages &&
                  car.advantages.split(",").map((item: string) => (
                    <span key={item} className="flex items-center gap-1">
                      <PlusIcon className="h-3 w-3" />
                      {item.trim()}
                    </span>
                  ))}
              </p>
            </div>
            <div>
              <p className="flex flex-col">
                {car.disadvantages &&
                  car.disadvantages.split(",").map((item: string) => (
                    <span key={item} className="flex items-center gap-1">
                      <MinusIcon className="h-3 w-3" />
                      {item.trim()}
                    </span>
                  ))}
              </p>
            </div>
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
  );
}
