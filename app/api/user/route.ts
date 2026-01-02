import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!user.active) return NextResponse.json({ error: "Your account has been blocked." }, { status: 403 });

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      credits: true,
      totalRequests: true,
      image: true,
      provider: true,
      currentPlanId: true,
      currentPlan: {
        select: {
          id: true,
          name: true,
          price: true,
          credits: true,
          image: true,
          validity: true,
          description: true,
        },
      },
      apiKeys: true,
      active: true,
    },
  });

  return NextResponse.json(fullUser);
}
