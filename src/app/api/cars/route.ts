import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { revalidatePath } from "next/cache";

export async function GET() {
  const data = await prisma.cars.findMany({
    orderBy: { created_at: "desc" },
  });
  revalidatePath("/");
  return NextResponse.json(data);
}
