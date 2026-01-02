import { NextRequest, NextResponse } from "next/server";
import { extractTextFromImage } from "@/lib/imageToText";
import { authenticateApiKey } from "@/lib/apiKey";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let rawKey: string | null = req.headers.get("x-api-key");
    let imageUrl: string | null = null;
    let file: Blob | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const maybeFile = formData.get("file");
      const maybeUrl = formData.get("url");
      const maybeKey = formData.get("apiKey");

      if (maybeFile instanceof Blob) file = maybeFile;
      if (typeof maybeUrl === "string") imageUrl = maybeUrl;
      if (typeof maybeKey === "string") rawKey = maybeKey;
    }
    else if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      rawKey = rawKey || body.apiKey || null;
      imageUrl = body.url || null;
    }

    if (!rawKey) {
      return NextResponse.json({ error: "API key is required" }, { status: 401 });
    }

    // Authenticate API Key
    const result = await authenticateApiKey(rawKey);
    if ("error" in result) return result.error;
    const { keyRecord } = result;

    // Check if user has enough credits
    if (keyRecord.user.credits < 10) {
      return NextResponse.json({ error: "Insufficient credits" }, { status: 403 });
    }

    if (!file && !imageUrl) {
      return NextResponse.json(
        { success: false, error: "Provide either a 'file' or a 'url'." },
        { status: 400 }
      );
    }

    let text: string | null = null;

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");
      const dataUrl = `data:${file.type};base64,${base64}`;
      text = await extractTextFromImage(dataUrl);
    } else if (imageUrl) {
      text = await extractTextFromImage(imageUrl);
    }

    // Deduct credits and increment totalRequests
    await prisma.user.update({
      where: { id: keyRecord.userId },
      data: { credits: { decrement: 10 }, totalRequests: { increment: 1 } },
    });

    // Update lastUsedAt for the API key
    await prisma.apiKey.update({
      where: { id: keyRecord.id },
      data: { lastUsedAt: new Date() },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Text extracted successfully.",
        text,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("imageCaptcha error", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to extract text" },
      { status: 500 }
    );
  }
}
