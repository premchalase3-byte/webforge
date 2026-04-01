import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let parsed;

    try {
      const cleaned = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON parse failed:", err);
      return Response.json({
        error: "AI did not return valid JSON",
        raw: text
      });
    }

    /* ---------- FILE SANITIZER ---------- */

    const files = parsed.files || {};
const safeFiles = {};

Object.entries(files).forEach(([path, value]) => {

  let newPath = path;

  if (!newPath.startsWith("/")) {
    newPath = "/" + newPath;
  }

  // FORCE everything into /src except html
  if (!newPath.startsWith("/src") && !newPath.endsWith(".html")) {
    newPath = "/src" + newPath;
  }

  const code = typeof value === "string" ? value : value.code;

  safeFiles[newPath] = {
    code
  };

});

    /* Ensure required files exist */

    if (!safeFiles["/index.html"]) {
      safeFiles["/index.html"] = {
        code: `
<!DOCTYPE html>
<html>
<head>
<title>WebForge</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<div id="root"></div>
</body>
</html>
`
      };
    }

    if (!safeFiles["/src/index.js"]) {
      safeFiles["/src/index.js"] = {
        code: `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
      };
    }

    if (!safeFiles["/src/App.js"]) {
      safeFiles["/src/App.js"] = {
        code: `
export default function App(){
  return <h1 style={{padding:40}}>WebForge Preview</h1>;
}
`
      };
    }

    parsed.files = safeFiles;

    return Response.json(parsed);

  } catch (error) {
    console.error("AI CODE ERROR:", error);

    return Response.json(
      { error: "AI generation failed" },
      { status: 500 }
    );
  }
}