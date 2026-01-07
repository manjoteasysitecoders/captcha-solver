import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { paymentId, visible } = body;
  if (!paymentId)
    return NextResponse.json(
      { error: "paymentId is required" },
      { status: 400 }
    );

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment)
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });

  const updated = await prisma.payment.update({
    where: { id: paymentId },
    data: { invoiceVisible: Boolean(visible) },
  });

  return NextResponse.json({ success: true, payment: updated });
}
