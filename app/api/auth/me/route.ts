import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJwt } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const payload = verifyJwt<{ userId: string }>(token);
  if (!payload) {
    const res = NextResponse.json({ authenticated: false });
    res.cookies.set({
      name: "token",
      value: "",
      maxAge: 0,
      path: "/",
    });
    return res;
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true },
  });

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
