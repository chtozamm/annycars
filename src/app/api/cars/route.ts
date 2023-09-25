import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function GET() {
  const data = await prisma.cars.findMany({
    orderBy: { created_at: "desc" },
  });

  return NextResponse.json(data);
}
