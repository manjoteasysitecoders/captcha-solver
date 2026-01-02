import razorpay from "@/lib/razorpay";
import prisma from "@/lib/prisma";
import { requireAuthUser } from "@/lib/require-auth-user";
import { NextRequest, NextResponse } from "next/server";
import { GST_RATE } from "@/constants/credits";

export async function POST(req: NextRequest) {
  const user = await requireAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Account blocked" }, { status: 403 });
  }

  try {
    const { planId } = await req.json();

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const gstAmount = Math.round(plan.price * GST_RATE);
    const totalAmount = plan.price + gstAmount;

    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // paise
      currency: "INR",
      receipt: `plan_${plan.name}_${Date.now()}`,
    });

    await prisma.payment.create({
      data: {
        userId: user.id,
        planId: plan.id,
        amount: totalAmount,
        razorpayOrderId: order.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      ...order,
      totalAmount,
      gstAmount,
    });
  } catch (err) {
    console.error("RAZORPAY ORDER ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
