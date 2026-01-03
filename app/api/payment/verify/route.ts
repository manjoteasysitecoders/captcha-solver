// /api/payment/verify/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { requireAuthUser } from "@/lib/require-auth-user";

export async function POST(req: NextRequest) {
  const user = await requireAuthUser();
  if (!user) return NextResponse.json({ error: "Account blocked" }, { status: 403 });

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payment = await prisma.payment.findFirst({
      where: { razorpayOrderId: razorpay_order_id, userId: user.id },
      include: { plan: true },
    });

    if (!payment) return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    if (payment.status === "SUCCESS") return NextResponse.json({ error: "Payment already processed" }, { status: 400 });

    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          status: "SUCCESS",
          verifiedAt: new Date(),
        },
      }),
      
      prisma.user.update({
        where: { id: payment.userId },
        data: {
          credits: { increment: payment.plan.credits },
          currentPlanId: payment.planId,
        },
      }),
      // Mark coupon as used if applied
      payment.couponId
        ? prisma.coupon.update({
            where: { id: payment.couponId },
            data: { usedCount: { increment: 1 } },
          })
        : prisma.coupon.updateMany({ where: { id: "" }, data: {} }), 
    ]);

    return NextResponse.json({ status: "success" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
