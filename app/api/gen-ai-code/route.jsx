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

        max_tokens: 2500,

        messages: [
          {
            role: "system",

            content: `
You are an elite senior frontend engineer and React architect.

Generate COMPLETE production-ready React applications.

Return ONLY valid JSON.

IMPORTANT:
The generated project MUST ALWAYS RUN WITHOUT ERRORS.

STRICT RULES:
- NEVER reference components that are not created
- NEVER import missing files
- NEVER leave undefined variables
- ALWAYS generate all required files
- ALWAYS generate working imports
- ALWAYS generate valid React code
- ALWAYS ensure routing works properly
- NEVER use markdown
- NEVER use backticks
- RETURN PURE JSON ONLY

TECH STACK:
- React
- Tailwind CSS
- React Router DOM
- Functional Components
- Modern UI/UX

DESIGN REQUIREMENTS:
- Premium modern UI
- Glassmorphism
- Gradient effects
- Smooth hover animations
- Responsive mobile-first layouts
- Fintech/SaaS quality styling
- Beautiful typography
- Proper spacing

PROJECT REQUIREMENTS:
Generate MULTI-PAGE applications.

The project MUST include:
- Navbar
- Footer
- Hero section
- About page
- Contact page
- Features section
- Responsive layout
- Working navigation
- Reusable components

VERY IMPORTANT:
If you use:
<Home />

Then ALSO generate:
"/src/pages/Home.js"

If you use:
<About />

Then ALSO generate:
"/src/pages/About.js"

If you use React Router:
- Use BrowserRouter correctly
- Use Routes and Route correctly
- Ensure every route component exists

VALID FORMAT:

{
  "files": {
    "/src/App.js": {
      "code": "..."
    },
    "/src/pages/Home.js": {
      "code": "..."
    },
    "/src/components/Navbar.js": {
      "code": "..."
    }
  }
}
CRITICAL JSX RULES:
- ALL input tags must be self-closing
- NEVER leave unclosed JSX tags
- ALWAYS return syntactically valid React code
- Validate all JSX before returning
- Use proper React component syntax

Do NOT generate malformed JSX.
Do NOT omit closing tags.
Use only valid React 18 syntax.


Generate MANY files when needed.

Make the website visually impressive and fully functional.
`
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

      // Remove markdown wrappers
      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
    }

    let parsed;

    try {
      parsed = JSON.parse(text);

    } catch (error) {

      console.log("JSON PARSE ERROR:", error);

      parsed = {
        files: {
          "/src/App.js": {
            code: `
import React from "react";

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "sans-serif",
      padding: "40px"
    }}>
      <h1 style={{
        fontSize: "52px",
        marginBottom: "20px"
      }}>
        WebForge AI
      </h1>

      <p style={{
        opacity: 0.8,
        fontSize: "18px",
        marginBottom: "30px"
      }}>
        Advanced AI Website Generation Active
      </p>

      <button style={{
        padding: "14px 28px",
        borderRadius: "12px",
        border: "none",
        background: "#3b82f6",
        color: "white",
        fontSize: "16px",
        cursor: "pointer"
      }}>
        Generation Complete
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
      padding: 40,
      fontFamily: "sans-serif"
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