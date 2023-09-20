"use client";

import { PlusIcon, MinusIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import ExternalLink from "./externalLink";

export default function Cars({ cars }: { cars: any }) {
  return (
    <ul className="grid w-full grid-flow-row auto-rows-max gap-8 px-3 text-sm md:w-auto md:grid-cols-2">
      {cars?.map((car: any) => (
        <li key={car.id} className="flex w-full flex-col">
          <div className="relative mb-3 aspect-[8/5]  w-full overflow-hidden rounded-md shadow-sm md:h-72 md:w-96">
            <Image src={car.image} fill className="object-cover" alt="" />
          </div>
          <p className="text-xl font-semibold">
            {car.name}, {car.year}
          </p>
          <p className="text-lg">{car.price && car.price + " ₽"}</p>
          {car.offer_link && <ExternalLink url={car.offer_link} />}
          <p className="mb-1 w-full border-b pb-1"></p>
          <div className="flex flex-col gap-3">
            {car.location && (
              <p className="flex items-center gap-1">
                {/* <PersonIcon className="h-4 w-4" /> */}
                {car.location}
              </p>
            )}
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
        </li>
      ))}
    </ul>
  );
}
