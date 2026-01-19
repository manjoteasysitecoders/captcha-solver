import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashOtp } from "@/lib/emailOtp";
import { timingSafeEqual } from "crypto";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { emailToken: true },
    });

    if (!user || !user.emailToken) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    const token = user.emailToken;

    if (token.expiresAt < new Date()) {
      return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }

    if (token.attempts >= 5) {
      return NextResponse.json({ message: "Too many attempts. Please resend OTP." }, { status: 429 });
    }

    const isValidOtp = (() => {
      const otpHashBuffer = Buffer.from(hashOtp(otp));
      const tokenBuffer = Buffer.from(token.token);

      if (otpHashBuffer.length !== tokenBuffer.length) return false;
      return timingSafeEqual(otpHashBuffer, tokenBuffer);
    })();

    if (!isValidOtp) {
      await prisma.emailVerificationToken.update({
        where: { id: token.id },
        data: { attempts: { increment: 1 } },
      });
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      }),
      prisma.emailVerificationToken.delete({ where: { id: token.id } }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
      email: user.email,
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
