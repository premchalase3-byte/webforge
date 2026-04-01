export const BASE_SANDBOX = {
"/index.html": {
code: `

<!DOCTYPE html><html>
<head>
<title>WebForge</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<div id="root"></div>
</body>
</html>
`
  },"/src/index.js": {
code: `
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
`
},

"/src/index.css": {
code: "body { margin: 0; font-family: system-ui, sans-serif; }"
},

"/src/App.js": {
code: "export default function App(){ return ( <div style={{padding:40}}> <h1>WebForge Ready 🚀</h1> </div> ) }"
}
};