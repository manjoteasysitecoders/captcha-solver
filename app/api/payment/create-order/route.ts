import razorpay from "@/lib/razorpay";
import prisma from "@/lib/prisma";
import { requireAuthUser } from "@/lib/require-auth-user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await requireAuthUser();
  if (!user) {
    return NextResponse.json(
      { error: "Account blocked" },
      { status: 403 }
    );
  }

  try {
    const { planId } = await req.json();

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const order = await razorpay.orders.create({
      amount: plan.price * 100, // paise
      currency: "INR",
      receipt: `plan_${plan.id}_${Date.now()}`,
    });

    await prisma.payment.create({
      data: {
        userId: user.id,
        planId: plan.id,
        amount: plan.price,
        razorpayOrderId: order.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(order);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
