"use client";

import { useRef } from "react";

export default function Form({ addCar }: { addCar: Function }) {
  const carNameRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const placeRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const carName = carNameRef.current?.value || "";
        const year = Number(yearRef.current?.value) || null;
        const place = placeRef.current?.value || "";
        const image = imageRef.current?.value || "";
        await addCar(carName, year, place, image);
        carNameRef.current!.value = "";
        yearRef.current!.value = "";
        placeRef.current!.value = "";
        imageRef.current!.value = "";
      }}
      className="flex flex-col gap-3"
    >
      <input
        ref={carNameRef}
        type="text"
        name="name"
        placeholder={"car name"}
        className="p-3 border rounded-md"
      />
      <input
        ref={yearRef}
        type="text"
        name="year"
        placeholder={"year"}
        className="p-3 border rounded-md"
      />
      <input
        ref={placeRef}
        type="text"
        name="place"
        placeholder={"place"}
        className="p-3 border rounded-md"
      />
      <input
        ref={imageRef}
        type="text"
        name="image"
        placeholder={"image"}
        className="p-3 border rounded-md"
      />
      <button type="submit" className="p-3 border rounded-md mt-3">
        Add car
      </button>
    </form>
  );
}
