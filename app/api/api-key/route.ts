import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";
import { generateApiKey, hashApiKey } from "@/lib/apiKey";

export async function GET() {
  const user = await getAuthUser();
  if (!user) return NextResponse.json([], { status: 401 });

  const keys = await prisma.apiKey.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      createdAt: true,
      lastUsedAt: true,
    },
  });

  return NextResponse.json(keys);
}

export async function POST() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fullUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      currentPlan: true,
      credits: true,
    },
  });

  if (!fullUser?.currentPlan) {
    return NextResponse.json(
      { error: "You must purchase a plan to generate an API key." },
      { status: 403 }
    );
  }

  if (!fullUser.credits || fullUser.credits <= 0) {
    return NextResponse.json(
      { error: "You do not have enough credits to generate an API key." },
      { status: 403 }
    );
  }

  await prisma.apiKey.deleteMany({
    where: { userId: user.id },
  });

  const plainKey = generateApiKey();
  const key = hashApiKey(plainKey);

  await prisma.apiKey.create({
    data: {
      userId: user.id,
      key,
    },
  });

  return NextResponse.json({
    key: plainKey, // shown ONLY once
    createdAt: new Date(),
  });
}
