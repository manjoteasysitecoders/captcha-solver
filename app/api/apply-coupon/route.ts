import prisma from "@/lib/prisma";
import { requireAuthUser } from "@/lib/require-auth-user";
import { NextRequest, NextResponse } from "next/server";
import { calculatePrice } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  const user = await requireAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { code, planId } = await req.json();

  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const coupon = await prisma.coupon.findUnique({ where: { code } });
  if (!coupon || !coupon.isActive) {
    return NextResponse.json({ error: "Invalid coupon" }, { status: 400 });
  }

  const usageCount = await prisma.payment.count({
    where: {
      userId: user.id,
      couponId: coupon.id,
      status: "SUCCESS",
    },
  });

  if (coupon.usedCount >= coupon.maxUsers) {
    return NextResponse.json(
      { error: "Coupon max usage reached" },
      { status: 400 }
    );
  }

  if (usageCount >= coupon.usagePerUser) {
    return NextResponse.json({ error: "Coupon already used" }, { status: 400 });
  }

  const price = calculatePrice(plan.price, coupon);

  return NextResponse.json({
    id: coupon.id,
    code: coupon.code,
    percentage: coupon.percentage,
    discountedPrice: price.discountedPrice,
    gstAmount: price.gstAmount,
    totalAmount: price.totalAmount,
  });
}
