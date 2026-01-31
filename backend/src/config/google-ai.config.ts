import { GoogleGenAI } from "@google/genai";

export const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// Default model
export const genAIModel = "models/gemini-2.0-flash";
