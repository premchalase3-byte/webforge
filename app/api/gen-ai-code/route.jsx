import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    let result;

    try {
      result = await model.generateContent(prompt);
    } catch (err) {
      console.log("AI failed → using fallback");
    }

    let text = "";

    if (result) {
      text = result.response.text();
    }

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch {
      // ✅ FALLBACK WEBSITE (IMPORTANT)
      parsed = {
        files: {
          "/src/App.js": {
            code: `
import React from "react";

export default function App() {
  return (
    <div style={{padding:40,fontFamily:"sans-serif"}}>
      <h1>🚀 AI Generated App</h1>
      <p>This is a fallback demo because AI server was busy.</p>

      <div style={{marginTop:20}}>
        <button style={{
          padding:"10px 20px",
          background:"#3b82f6",
          color:"#fff",
          border:"none",
          borderRadius:"8px"
        }}>
          Click Me
        </button>
      </div>
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
export default function App(){
  return <h1 style={{padding:20}}>Something went wrong</h1>
}
          `,
        },
      },
    });
  }
}