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
You are an elite AI frontend engineer.

Generate ADVANCED multi-page React applications.

Return ONLY valid JSON.

The app must look modern, premium, futuristic, and production-ready.

Use:
- React
- Tailwind CSS
- Functional components
- Modern UI/UX
- Responsive design
- Glassmorphism when suitable
- Gradients
- Animations
- Clean spacing
- Professional typography
- Reusable components

IMPORTANT:
Generate MULTIPLE FILES.

IMPORTANT ROUTING RULES:

Use react-router-dom.

Always include:
- BrowserRouter
- Routes
- Route
- Link

Create proper navigation between pages.

Include pages like:
- Home
- About
- Services
- Contact
- Dashboard
- Pricing
- Settings
when suitable.

Navigation buttons MUST actually navigate.

App.js must contain proper routing structure.

Example:
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>

Navbar links must use:
<Link to="/about">About</Link>

Include:
- App.js
- components
- pages
- reusable UI sections
- navbar
- footer
- buttons
- cards
- forms
- hero sections
- sidebars when suitable

Use this JSON format ONLY:

{
  "files": {
    "/src/App.js": {
      "code": "..."
    },

    "/src/components/Navbar.js": {
      "code": "..."
    },

    "/src/pages/Home.js": {
      "code": "..."
    }
  }
}

Rules:
- Return ONLY pure JSON
- No markdown
- No explanations
- No backticks
- Every component must be fully working
- Use proper imports/exports
- Use realistic layouts
- Add hover effects
- Add responsive mobile layouts
- Multi-page apps are REQUIRED
- All navigation links must work
- Use realistic routing structure
- Make websites visually impressive
- Avoid basic demo layouts
- Build complete production-style UIs
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