import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

type Params = {
  params: { id: string };
};

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const plan = await prisma.plan.findUnique({
    where: { id: id },
  });

  if (!plan)
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });

  return NextResponse.json(plan);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, price, credits, description } = await req.json();

  try {
    const updated = await prisma.plan.update({
      where: { id: id },
      data: {
        name,
        price,
        credits,
        description,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update plan" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!id) {
    return NextResponse.json({ error: "Missing plan id" }, { status: 400 });
  }

  await prisma.plan.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
