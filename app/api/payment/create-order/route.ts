import razorpay from "@/lib/razorpay";
import { requireAuthUser } from "@/lib/require-auth-user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await requireAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Account blocked" }, { status: 403 });
  }

  try {
    const {
      amount,
      // currency, receipt
    } = await req.json();

    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
