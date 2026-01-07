import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuthUser } from "@/lib/require-auth-user";
import { verifyAdmin } from "@/lib/admin-auth";
import { generateInvoicePdf } from "@/lib/invoice";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const payment = await prisma.payment.findUnique({
    where: { id },
    include: { user: true, plan: true },
  });

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
        { error: "Invoice not published" },
        { status: 403 }
      );
  }

  const pdfBytes = await generateInvoicePdf(
    payment as any,
    payment.invoiceNumber!
  );

  return new Response(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="invoice-${payment.id}.pdf"`,
    },
  });
}
