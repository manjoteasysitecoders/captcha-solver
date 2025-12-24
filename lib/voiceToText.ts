import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey:
    process.env.ELEVENLABS_API_KEY ??
    "sk_22ff1f45b90d6d5b7d60748e0aefb9f0ce8df636ba89fe0c",
});

function normalizeSentence(transcription: unknown): string {
  const text = (transcription as { text?: string | null } | null | undefined)
    ?.text;

  if (!text) {
    return "";
  }

  const cleaned = text
    .replace(/\(\s*static sound\s*\)-?/gi, " ")
    .replace(/-?\(\s*static sound\s*\)/gi, " ");

  return cleaned.trim().replace(/\s+/g, " ");
}

export async function transcribeFromUrl(audioUrl: string) {
  const response = await fetch(audioUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch audio from URL: ${response.status}`);
  }

  const audioBlob = new Blob([await response.arrayBuffer()], {
    type: "audio/mp3",
  });

  const transcription = await elevenlabs.speechToText.convert({
    file: audioBlob,
    modelId: "scribe_v1",
    tagAudioEvents: false,
    languageCode: "eng",
    diarize: true,
  });

  return {
    sentence: normalizeSentence(transcription),
    transcription,
  };
}

export async function transcribeFromFile(file: Blob) {
  const transcription = await elevenlabs.speechToText.convert({
    file,
    modelId: "scribe_v1",
    tagAudioEvents: false,
    languageCode: "eng",
    diarize: true,
  });

  return {
    sentence: normalizeSentence(transcription),
    transcription,
  };
}
