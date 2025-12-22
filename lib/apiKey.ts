import crypto from "crypto";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export function generateApiKey() {
  return crypto.randomBytes(32).toString("hex");
}

export async function hashApiKey(key: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(key, salt);
}

export async function authenticateApiKey(rawKey: string) {
  if (!rawKey) {
    return { error: NextResponse.json({ error: "API key missing" }, { status: 401 }) };
  }

  const keyRecords = await prisma.apiKey.findMany({
    include: { user: true },
  });

  let matchedKey = null;
  for (const k of keyRecords) {
    const isValid = await bcrypt.compare(rawKey, k.key);
    if (isValid) {
      matchedKey = k;
      break;
    }
  }

  if (!matchedKey) {
    return { error: NextResponse.json({ error: "Invalid API key" }, { status: 401 }) };
  }

  if (matchedKey.user.credits <= 0) {
    return { error: NextResponse.json({ error: "Insufficient credits" }, { status: 403 }) };
  }

  return { keyRecord: matchedKey };
}
