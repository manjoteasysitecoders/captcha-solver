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
        { error: "imageUrl is required" },
        { status: 400 }
      );
    }

    // Authenticate API Key
    const { keyRecord, error } = await authenticateApiKey(rawKey!);
    if (error) return error;

    // Deduct 1 credit and increment totalRequests
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
