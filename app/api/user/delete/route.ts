import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    await prisma.apiKey.deleteMany({
      where: { userId },
    });

    // await prisma.usageLog.deleteMany({ where: { userId } });

    await prisma.user.delete({
      where: { id: userId },
    });

    const response = NextResponse.json({ success: true });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
      expires: new Date(0),
    };

    response.cookies.set("next-auth.session-token", "", cookieOptions);
    response.cookies.set("__Secure-next-auth.session-token", "", cookieOptions);
    response.cookies.set("next-auth.callback-url", "", cookieOptions);
    response.cookies.set("next-auth.csrf-token", "", cookieOptions);

    return response;
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}
