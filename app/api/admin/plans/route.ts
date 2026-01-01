import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const plans = await prisma.plan.findMany({
    orderBy: { price: "asc" },
  });

  return NextResponse.json(plans);
}

export async function POST(req: Request) {
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, price, credits, description } = await req.json();

  if (!name || price == null || credits == null) {
    return NextResponse.json(
      { error: "Name, price and credits are required" },
      { status: 400 }
    );
  }

  try {
    const plan = await prisma.plan.create({
      data: {
        name,
        price,
        credits,
        description,
      },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create plan" },
      { status: 500 }
    );
  }
}
