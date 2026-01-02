import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { requireAuthUser } from "@/lib/require-auth-user";

export async function POST(req: NextRequest) {
  const user = await requireAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Account blocked" }, { status: 403 });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    console.log("Received:", razorpay_signature);
    console.log(
      "Order ID:",
      razorpay_order_id,
      "Payment ID:",
      razorpay_payment_id
    );

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    console.log("Generated:", generated_signature);

    if (generated_signature === razorpay_signature) {
      return NextResponse.json({ status: "success" });
    } else {
      return NextResponse.json({ status: "failed" }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json(
      { status: "failed", error: err.message },
      { status: 500 }
    );
  }
}
