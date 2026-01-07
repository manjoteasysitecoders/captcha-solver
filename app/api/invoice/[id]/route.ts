import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import prisma from "@/lib/prisma";
import { requireAuthUser } from "@/lib/require-auth-user";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
      const { id } = await params;
  const url = new URL(req.url);
  const paymentId = id ?? url.pathname.split("/").pop();

  if (!paymentId)
    return NextResponse.json(
      { error: "Payment id is required" },
      { status: 400 }
    );

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment)
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });

  const admin = await verifyAdmin();
  if (!admin) {
    const user = await requireAuthUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (payment.userId !== user.id)
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    if (!payment.invoiceVisible)
      return NextResponse.json(
        { error: "Invoice not yet published" },
        { status: 403 }
      );
  }

  const filePath = path.join(
    process.cwd(),
    "invoices",
    `${payment.id}.pdf`
  );
  if (!fs.existsSync(filePath))
    return NextResponse.json(
      { error: "Invoice file missing" },
      { status: 404 }
    );

  const fileStream = fs.readFileSync(filePath);

  return new Response(fileStream, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="invoice-${payment.id}.pdf"`,
    },
  });
}
