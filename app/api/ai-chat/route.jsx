import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0.7,

      max_tokens: 1024,

      messages: [
        {
          role: "system",
          content: `
You are WebForge AI assistant.

Keep responses short, helpful, and professional.
`,
        },

        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text =
      completion?.choices?.[0]?.message?.content ||
      "AI response failed";

    return Response.json({
      result: text,
    });

  } catch (error) {
    console.error("CHAT ERROR:", error);

    return Response.json(
      {
        error: "AI chat failed",
      },
      {
        status: 500,
      }
    );
  }
}