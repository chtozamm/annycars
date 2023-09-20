"use client";

import Image from "next/image";

export default function Cars({ cars }: { cars: any }) {
  return (
    <ul>
      {cars?.map((car: any) => (
        <li key={car.id} className="flex flex-col gap-3">
          <Image
            src={car.image}
            width={300}
            height={300}
            className="object-cover"
            alt=""
          />
          <p>{car.name}</p>
          <p>{car.year}</p>
          <p>{car.place}</p>
          <p>{car.offer_link}</p>
          <p>{car.advantages}</p>
          <p>{car.disadvantages}</p>
        </li>
      ))}
    </ul>
  );
}
