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
      stream: true,
      messages: [
        {
          role: "system",
          content: `
You are WebForge AI assistant.

Behave like a friendly senior developer.

Keep responses:
- short
- human
- helpful
- conversational

Do NOT use markdown code blocks unless necessary.
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullText = "";

          for await (const chunk of completion) {
            const chunkText =
              chunk.choices?.[0]?.delta?.content || "";

            if (!chunkText) continue;

            fullText += chunkText;

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  chunk: chunkText,
                })}\n\n`
              )
            );
          }

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                result: fullText,
                done: true,
              })}\n\n`
            )
          );

          controller.close();
        } catch (e) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                error: e.message || "AI chat failed",
              })}\n\n`
            )
          );

          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    console.error("CHAT ERROR:", e);

    return new Response(
      JSON.stringify({
        error: e.message || "AI chat failed",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}