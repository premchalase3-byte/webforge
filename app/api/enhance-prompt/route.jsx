import Groq from "groq-sdk";
import Prompt from "@/data/Prompt";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: Prompt.ENHANCE_PROMPT || 
          "Enhance the user's website prompt professionally.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text =
      completion.choices[0]?.message?.content || "";

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({
              enhancedPrompt: text,
              done: true,
            })}\n\n`
          )
        );

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });

  } catch (error) {
    console.error("ENHANCE ERROR:", error);

    return Response.json({
      enhancedPrompt: "Unable to enhance prompt right now.",
    });
  }
}