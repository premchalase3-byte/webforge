const Lookup = {

  SUGGSTIONS: [
    "Create Todo App",
    "Create a Budget Track App",
    "Create a Login and Signup page",
    "Develop a Task Management App",
    "Create a Fully Responsive Blog Platform",
    "Design a Minimalistic Note-Taking App",
    "Develop a Customizable Landing Page",
    "Develop a Recipe Sharing Platform",
    "Create a Fitness Tracking App",
    "Develop a Personal Finance Management Tool",
    "Create a Language Learning App",
    "Build a Virtual Event Platform",
    "Create a Music Streaming Service"
  ],

  DEFAULT_FILE: {
    "/src/index.js": {
      code: `
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
    },

    "/src/App.js": {
      code: `
export default function App(){
  return (
    <div style={{padding:40}}>
      <h1>Welcome to WebForge 🚀</h1>
      <p>Your AI generated website will appear here.</p>
    </div>
  );
}
`
    },

    "/index.html": {
      code: `
<!DOCTYPE html>
<html>
<head>
<title>WebForge</title>
</head>
<body>
<div id="root"></div>
</body>
</html>
`
    }
  },

  DEPENDANCY: {
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "latest"
  }

};

export default Lookup;