import crypto from "crypto";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export function generateApiKey() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashApiKey(key: string) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export async function authenticateApiKey(rawKey: string) {
  if (!rawKey) {
    return { error: NextResponse.json({ error: "API key missing" }, { status: 401 }) };
  }

  const key = hashApiKey(rawKey);

  const keyRecord = await prisma.apiKey.findUnique({
    where: { key },
    include: { user: true },
  });

  if (!keyRecord) {
    return { error: NextResponse.json({ error: "Invalid API key" }, { status: 401 }) };
  }

  if (keyRecord.user.credits <= 0) {
    return { error: NextResponse.json({ error: "Insufficient credits" }, { status: 403 }) };
  }

  return { keyRecord };
}
