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

    // Authenticate API Key
    const { keyRecord, error } = await authenticateApiKey(rawKey!);
    if (error) return error;

    // Deduct 1 credit and increment totalRequests
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
