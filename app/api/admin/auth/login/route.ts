import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  try {
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Insufficient credentials.",
        },
        {
          status: 401,
        }
      );
    }

    const admin = await prisma.admin.findFirst({
      where: {
        username,
      },
    });

    if (!admin)
      return NextResponse.json(
        {
          success: false,
          error: "No admin found.",
        },
        {
          status: 404,
        }
      );

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword)
      return NextResponse.json(
        {
          success: false,
          error: "Incorrect Password.",
        },
        {
          status: 401,
        }
      );

    const token = jwt.sign(
      {
        id: admin.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      {
        success: true,
        message: "Admin logged in successfully.",
      },
      {
        status: 200,
      }
    );

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Error in admin login: ", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}
