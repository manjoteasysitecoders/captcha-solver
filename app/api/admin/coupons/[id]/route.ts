import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const admin = await verifyAdmin();
    if (!admin)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    const coupon = await prisma.coupon.update({
      where: { id },
      data,
    });

    return NextResponse.json(coupon);
  } catch (err: any) {
    console.error("PUT coupon error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update coupon" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const admin = await verifyAdmin();
    if (!admin)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.coupon.delete({ where: { id } });

    return NextResponse.json({ message: "Coupon deleted" });
  } catch (err: any) {
    console.error("DELETE coupon error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete coupon" },
      { status: 400 }
    );
  }
}
