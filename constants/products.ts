import { Bot, Image, Mic } from "lucide-react";

export type Product = {
  title: string;
  description: string;
  icon: typeof Bot;
  apiEndpoint: string;
  example: string;
};

export const products: Product[] = [
  {
    title: "Image CAPTCHA Solver",
    description:
      "Automatically extract text from image-based CAPTCHAs using AI. Ideal for websites using visual CAPTCHA challenges.",
    icon: Image,
    apiEndpoint: "/products/image-captcha",
    example: `const response = await fetch("/api/public/imageCaptcha", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY",
  },
  body: JSON.stringify({
    imageUrl: "https://example.com/captcha.png",
  }),
});
const data = await response.json();
console.log(data.text);`,
  },
  {
    title: "Text CAPTCHA Solver",
    description:
      "Submit textual CAPTCHAs and get AI-generated responses instantly. Useful for challenges that require human-like understanding of text prompts.",
    icon: Bot,
    apiEndpoint: "/products/text-captcha",
    example: `const response = await fetch("/api/public/textCaptcha", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY",
  },
  body: JSON.stringify({ text: "Solve this CAPTCHA" }),
});
const data = await response.json();
console.log(data.answer);`,
  },
  {
    title: "Voice CAPTCHA Solver",
    description:
      "Transcribe audio CAPTCHAs into text automatically. Perfect for accessibility and audio challenges.",
    icon: Mic,
    apiEndpoint: "/products/voice-captcha",
    example: `const formData = new FormData();
formData.append("url", 
"https://example.com/audioCaptcha.mp3");

const response = await fetch("/api/public/voiceCaptcha", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
  },
  body: formData,
});

const data = await response.json();
console.log(data.sentence);`,
  },
];
