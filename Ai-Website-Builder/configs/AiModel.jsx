import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const chatSession = genAI
  .getGenerativeModel({
    model: "gemini-2.5-flash"
  })
  .startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 8192,
      temperature: 0.7,
    },
  });