import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

export async function GET() {
  const data =
    (await prisma.cars.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
    })) || [];

  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request: Request) {
  const req = request;
  const data: Car = await req.json();

  const res = await prisma.cars.create({
    data: {
      name: data.name,
      year: data.year,
      image: data.image || "",
      link: data.link || "",
      price: data.price || "",
      mileage: data.mileage || "",
      seller: data.seller,
      advantages: data.advantages || "",
      disadvantages: data.disadvantages || "",
    },
  });

  return NextResponse.json(res);
}

export async function DELETE(request: Request) {
  const req = request;
  const data: Car = await req.json();

  const res = await prisma.cars.delete({
    where: {
      id: data.id,
    },
  });

  return NextResponse.json(res);
}

export async function PUT(request: Request) {
  const req = request;
  const data: Car = await req.json();

  const res = await prisma.cars.update({
    data: {
      name: data.name,
      year: data.year,
      image: data.image || "",
      link: data.link || "",
      price: data.price || "",
      mileage: data.mileage || "",
      seller: data.seller,
      advantages: data.advantages || "",
      disadvantages: data.disadvantages || "",
      isSold: data.isSold,
    },
    where: {
      id: data.id,
    },
  });

  return NextResponse.json(res);
}
