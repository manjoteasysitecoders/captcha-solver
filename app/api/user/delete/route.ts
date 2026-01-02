import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function DELETE() {
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (user.active === false) {
    return NextResponse.json({ error: "Account blocked" }, { status: 403 });
  }

  try {
    await prisma.payment.deleteMany({
      where: { userId: user.id },
    });

    await prisma.apiKey.deleteMany({
      where: { userId: user.id },
    });

    await prisma.user.delete({
      where: { id: user.id },
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
