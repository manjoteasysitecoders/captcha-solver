import { NextRequest, NextResponse } from "next/server";
import { parseFinalAnswer } from "@/lib/textToText";
import { authenticateApiKey } from "@/lib/apiKey";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    const rawKey = req.headers.get("x-api-key");

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "text is required" },
        { status: 400 }
      );
    }

    if (!rawKey) {
      return NextResponse.json(
        { success: false, error: "API key is required" },
        { status: 401 }
      );
    }

    // Authenticate API Key
    const authResult = await authenticateApiKey(rawKey);
    if ("error" in authResult) return authResult.error;

    const { keyRecord } = authResult;

    // Check if user has enough credits
    if (keyRecord.user.credits < 8) {
      return NextResponse.json(
        { success: false, error: "Insufficient credits" },
        { status: 403 }
      );
    }

    // Deduct credits and increment totalRequests
    await prisma.user.update({
      where: { id: keyRecord.userId },
      data: {
        credits: { decrement: 8 },
        totalRequests: { increment: 1 },
      },
    });

    // Update lastUsedAt for the API key
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() },
    });

    const result = await parseFinalAnswer(text);

    return NextResponse.json(
      {
        success: true,
        message: "Received final result.",
        ...result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
