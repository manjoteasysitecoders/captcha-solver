import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(coupons);
}

export async function POST(req: Request) {
  const admin = await verifyAdmin();
  if (!admin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { code, percentage, usagePerUser, maxUsers } = await req.json();

  if (!code || !percentage || !maxUsers) {
    return NextResponse.json(
      { error: "Code, percentage and max users are required" },
      { status: 400 }
    );
  }

  const coupon = await prisma.coupon.create({
    data: { code, percentage, usagePerUser: usagePerUser || 1, maxUsers },
  });

  return NextResponse.json(coupon);
}
