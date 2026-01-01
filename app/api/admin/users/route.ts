import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      credits: true,
      totalRequests: true,
      provider: true,
      createdAt: true,
      active: true,
    },
  });

  return NextResponse.json(users);
}
