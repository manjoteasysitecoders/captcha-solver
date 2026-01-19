import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateOTP, hashOtp, sendVerificationEmail } from "@/lib/emailOtp";

const COOLDOWN_MS = 60 * 1000; // 60 seconds cooldown

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { emailToken: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 200 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email already verified" },
        { status: 400 }
      );
    }

    const token = user.emailToken;

    if (token?.sentAt && token.sentAt.getTime() + COOLDOWN_MS > Date.now()) {
      const waitTime = Math.ceil((token.sentAt.getTime() + COOLDOWN_MS - Date.now()) / 1000);
      console.warn(`User ${email} tried to resend OTP too soon.`);
      return NextResponse.json(
        { message: `Please wait ${waitTime}s before resending OTP` },
        { status: 429 }
      );
    }

    const otp = generateOTP();
    const otpHash = hashOtp(otp);
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

    await prisma.emailVerificationToken.upsert({
      where: { userId: user.id },
      update: {
        token: otpHash,
        expiresAt,
        attempts: 0,
        sentAt: new Date(),
      },
      create: {
        userId: user.id,
        token: otpHash,
        expiresAt,
        sentAt: new Date(),
        attempts: 0,
      },
    });

    await sendVerificationEmail(email, otp);

    return NextResponse.json({
      message: "OTP resent successfully",
      success: true,
    });
  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
