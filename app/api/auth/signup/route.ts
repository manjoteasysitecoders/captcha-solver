import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { FREE_CREDITS } from "@/constants/credits";
import { generateOTP, hashOtp, sendVerificationEmail } from "@/lib/emailOtp";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const otp = generateOTP();
    const otpHash = hashOtp(otp);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        credits: FREE_CREDITS,
        provider: "credentials",
        emailToken: {
          create: {
            token: otpHash,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000),
          },
        },
      },
    });

    await sendVerificationEmail(email, otp);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
