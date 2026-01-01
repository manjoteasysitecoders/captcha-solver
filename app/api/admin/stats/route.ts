import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [usersCount, plansCount] = await Promise.all([
    prisma.user.count(),
    prisma.plan.count(),
  ]);

  return NextResponse.json({
    usersCount,
    plansCount,
  });
}
