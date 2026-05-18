import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    let completion;

    try {
      completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 4096,
        messages: [
          {
            role: "system",
            content: `
You are an AI website generator.

Return ONLY valid JSON.

Format:
{
  "files": {
    "/src/App.js": {
      "code": "React code here"
    }
  }
}

Rules:
- Use React functional components
- Use inline styles OR Tailwind classes
- No markdown
- No explanations
- Return pure JSON only
            `,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });
    } catch (err) {
      console.log("GROQ ERROR:", err);
    }

    let text = "";

    if (completion) {
      text = completion.choices[0]?.message?.content || "";

// REMOVE markdown wrappers if AI adds them
text = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
    }

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        files: {
          "/src/App.js": {
            code: `
import React from "react";

export default function App() {
  return (
    <div style={{
      minHeight:"100vh",
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      background:"#0f172a",
      color:"white",
      fontFamily:"sans-serif"
    }}>
      <h1 style={{
        fontSize:"48px",
        marginBottom:"10px"
      }}>
        WebForge AI
      </h1>

      <p style={{
        opacity:0.8,
        marginBottom:"20px"
      }}>
        AI generation fallback demo
      </p>

      <button style={{
        padding:"12px 24px",
        background:"#3b82f6",
        border:"none",
        color:"white",
        borderRadius:"10px",
        cursor:"pointer"
      }}>
        Generated Successfully
      </button>
    </div>
  );
}
            `,
          },
        },
      };
    }

    return Response.json(parsed);

  } catch (error) {
    console.error("FINAL ERROR:", error);

    return Response.json({
      files: {
        "/src/App.js": {
          code: `
export default function App() {
  return (
    <div style={{
      padding:40,
      fontFamily:"sans-serif"
    }}>
      <h1>Something went wrong</h1>
    </div>
  );
}
          `,
        },
      },
    });
  }
}