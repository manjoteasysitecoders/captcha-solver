import crypto from "crypto";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const ALGO = "aes-256-gcm";
const KEY = Buffer.from(process.env.API_KEY_SECRET! , "hex");

export function generateApiKey() {
  return crypto.randomBytes(32).toString("hex");
}

export function encryptApiKey(key: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(key, "utf8"),
    cipher.final(),
  ]);

  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64");
}

export function decryptApiKey(payload: string) {
  const buf = Buffer.from(payload, "base64");

  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const encrypted = buf.subarray(28);

  const decipher = crypto.createDecipheriv(ALGO, KEY, iv);
  decipher.setAuthTag(tag);

  return decipher.update(encrypted) + decipher.final("utf8");
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
    try {
      const decrypted = decryptApiKey(k.key);
      if (decrypted === rawKey) {
        matchedKey = k;
        break;
      }
    } catch (err) {
      continue;
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
