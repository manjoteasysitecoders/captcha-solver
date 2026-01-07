import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";
import { generateInvoicePdf } from "@/lib/invoice";

export async function POST(req: Request) {
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { paymentId } = body;
  if (!paymentId)
    return NextResponse.json(
      { error: "paymentId is required" },
      { status: 400 }
    );

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { user: { select: { id: true, email: true } }, plan: true },
  });

  if (!payment)
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });

  if (payment.status !== "SUCCESS")
    return NextResponse.json(
      { error: "Can only generate invoices for successful payments" },
      { status: 400 }
    );

  const date = new Date();
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(date.getDate()).padStart(2, "0")}`;
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  const invoiceNumber = `INV-${datePart}-${randomPart}`;

  const filePath = await generateInvoicePdf(payment as any, invoiceNumber);

  const invoiceUrl = `/api/invoice/${payment.id}`;

  const updated = await prisma.payment.update({
    where: { id: payment.id },
    data: {
      invoiceNumber,
      invoicePdfUrl: invoiceUrl,
      invoicedAt: new Date(),
    },
  });

  return NextResponse.json({ success: true, payment: updated });
}
