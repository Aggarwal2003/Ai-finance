import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

async function test() {
  const models = await genAI.models.list();
  console.log("AVAILABLE MODELS:\n", JSON.stringify(models, null, 2));
}

test();
