import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { transcribeFromFile, transcribeFromUrl } from "@/lib/voiceToText";
import { authenticateApiKey } from "@/lib/apiKey";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let rawKey: string | null = request.headers.get("x-api-key");
    let audioUrl: string | null = null;
    let file: Blob | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const maybeFile = formData.get("file");
      const maybeUrl = formData.get("url");
      const maybeKey = formData.get("apiKey");

      if (maybeFile instanceof Blob) file = maybeFile;
      if (typeof maybeUrl === "string") audioUrl = maybeUrl;
      if (typeof maybeKey === "string") rawKey = maybeKey;
    } else if (contentType.includes("application/json")) {
      const body = await request.json().catch(() => ({}));
      rawKey = rawKey || body.apiKey || null;
      audioUrl = body.url || null;
    }

    if (!rawKey) {
      return NextResponse.json(
        { error: "API key is required" },
        { status: 401 }
      );
    }

    // Authenticate API key
    const authResult = await authenticateApiKey(rawKey);
    if ("error" in authResult) return authResult.error;

    const { keyRecord } = authResult;

    // Check if user has enough credits
    if (keyRecord.user.credits < 10) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 403 }
      );
    }

    if (!file && !audioUrl) {
      return NextResponse.json(
        { success: false, error: "Provide either a 'file' or a 'url'." },
        { status: 400 }
      );
    }

    const result = file
      ? await transcribeFromFile(file)
      : await transcribeFromUrl(audioUrl as string);

    await prisma.user.update({
      where: { id: keyRecord.userId },
      data: { credits: { decrement: 10 }, totalRequests: { increment: 1 } },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Audio transcribed successfully",
        sentence: result.sentence,
      },
      { status: 200 }
    );
    // Update lastUsedAt for the API key
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() },
    });

    return NextResponse.json({ sentence: result.sentence }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    console.error("voiceCaptcha error", error);
    return NextResponse.json(
      { error: error.message || "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
