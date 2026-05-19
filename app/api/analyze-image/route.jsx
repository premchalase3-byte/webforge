import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const { image } = body;

    if (!image) {
      return Response.json({
        error: "No image provided",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0.4,
      max_tokens: 1024,

      messages: [
        {
          role: "system",
          content: `
You are an expert UI/UX analyst and frontend architect.

Analyze the uploaded website screenshot carefully.

Describe:
- layout
- sections
- navbar
- hero
- cards
- buttons
- colors
- typography
- spacing
- glassmorphism
- gradients
- responsiveness
- animations
- overall design style

Your response should be detailed enough for another AI to recreate the website perfectly in React + Tailwind CSS.
          `,
        },

        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this website screenshot in detail.",
            },

            {
              type: "image_url",
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
    });

    const result =
      completion.choices[0]?.message?.content || "";

    return Response.json({
      success: true,
      description: result,
    });

  } catch (error) {
    console.error("IMAGE ANALYSIS ERROR:", error);

    return Response.json({
      success: false,
      error: error.message,
    });
  }
}