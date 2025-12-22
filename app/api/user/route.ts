import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
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
          description: true,
        },
      },
      apiKeys: true,
    },
  });

  return NextResponse.json(user);
}
