import { NextRequest, NextResponse } from "next/server";
import { extractTextFromImage } from "@/lib/imageToText";
import { authenticateApiKey } from "@/lib/apiKey";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageUrl } = body;
    const rawKey = req.headers.get("x-api-key");

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json(
        { success: false, error: "imageUrl is required" },
        { status: 400 }
      );
    }

    if (!rawKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 401 }
      );
    }

    // Authenticate API Key
    const result = await authenticateApiKey(rawKey);
    if ("error" in result) return result.error;

    const { keyRecord } = result;

    // Check if user has enough credits
    if (keyRecord.user.credits < 10) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 403 }
      );
    }

    // Deduct credits and increment totalRequests
    await prisma.user.update({
      where: { id: keyRecord.userId },
      data: {
        credits: { decrement: 10 },
        totalRequests: { increment: 1 },
      },
    });

    // Update lastUsedAt for the API key
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() },
    });

    const text = await extractTextFromImage(imageUrl);

    return NextResponse.json(
      {
        success: true,
        message: "Text extracted successfully.",
        text,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
