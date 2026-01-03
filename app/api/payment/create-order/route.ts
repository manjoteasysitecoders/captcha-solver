import razorpay from "@/lib/razorpay";
import prisma from "@/lib/prisma";
import { requireAuthUser } from "@/lib/require-auth-user";
import { NextRequest, NextResponse } from "next/server";
import { calculatePrice } from "@/lib/pricing";

export async function POST(req: NextRequest) {
  const user = await requireAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Account blocked" }, { status: 403 });
  }

  try {
    const { planId, couponId } = await req.json();

    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    let appliedCoupon: { id: string; percentage: number } | null = null;

    if (couponId) {
      const coupon = await prisma.coupon.findUnique({
        where: { id: couponId },
      });

      if (!coupon || !coupon.isActive) {
        return NextResponse.json(
          { error: "Invalid or inactive coupon" },
          { status: 400 }
        );
      }

      if (coupon.usedCount >= coupon.maxUsers) {
        return NextResponse.json(
          { error: "Coupon max usage reached" },
          { status: 400 }
        );
      }

      const usageCount = await prisma.payment.count({
        where: {
          userId: user.id,
          couponId: coupon.id,
          status: "SUCCESS",
        },
      });

      if (usageCount >= coupon.usagePerUser) {
        return NextResponse.json(
          { error: "You have already used this coupon" },
          { status: 400 }
        );
      }

      appliedCoupon = coupon;
    }

    const { discountedPrice, gstAmount, totalAmount } = calculatePrice(
      plan.price,
      appliedCoupon ?? undefined
    );

    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // paise
      currency: "INR",
      receipt: `plan_${plan.name}_${Date.now()}`,
    });

    await prisma.payment.create({
      data: {
        userId: user.id,
        planId: plan.id,
        couponId: appliedCoupon?.id,
        amount: totalAmount,
        razorpayOrderId: order.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      ...order,
      totalAmount,
      gstAmount,
      discountedPrice,
    });
  } catch (err) {
    console.error("RAZORPAY ORDER ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
