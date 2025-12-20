import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { planId } = await req.json();
  if (!planId) return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });

  try {
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) return NextResponse.json({ message: "Plan not found" }, { status: 404 });

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { currentPlanId: plan.id, credits: { increment: plan.credits } },
    });

    return NextResponse.json({ message: "Plan updated successfully", user: updatedUser });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to update plan" }, { status: 500 });
  }
}
