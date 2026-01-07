import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuthUser } from "@/lib/require-auth-user";

export async function GET() {
  const user = await requireAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payments = await prisma.payment.findMany({
    where: {
      userId: user.id,
      status: "SUCCESS",
    },
    orderBy: { createdAt: "desc" },
    include: {
      plan: true,
    },
  });

  return NextResponse.json(payments);
}
