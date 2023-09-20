"use client";

export default function Cars({
  cars,
  deleteCar,
}: {
  cars: Car[];
  deleteCar: Function;
}) {
  return (
    <ul>
      {cars.map((car) => (
        <li key={car.id} className="grid grid-cols-3">
          {/* <input
            type="checkbox"
            checked={car.isDone}
            onChange={() => togglecar(car.id, !car.isDone)}
          /> */}
          {car.name}
          <button onClick={() => deleteCar(car.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
