# WebForge — AI-Powered Website Builder
WebForge is an AI-driven platform that enables users to generate complete, functional websites using natural language. Instead of manually writing code, users can describe their ideas, and the system automatically builds the project structure, UI components, and styling in real time.
## Overview
WebForge simplifies web development by combining modern frontend technologies with AI-powered code generation. It is designed for students, developers, and non-technical users who want to quickly prototype or build websites without extensive coding knowledge.
The platform provides a real-time workspace where users can interact with AI, preview generated code, and download the final project.
## Features
 * **AI-based website generation** from text prompts
 * **Real-time code preview** and editing
 * **Automatic project structure** creation
 * **Responsive UI generation** using Tailwind CSS
 * **Downloadable project files**
 * **Interactive developer workspace**
## Tech Stack
 * **Frontend:** Next.js, React, Tailwind CSS
 * **Backend:** Convex
 * **AI Integration:** Google Gemini API
 * **Editor:** Sandpack (CodeSandbox)
## Installation
### 1. Clone the repository
```bash
git clone https://github.com/your-username/webforge.git
cd webforge

```
### 2. Install dependencies
```bash
npm install

```
### 3. Configure environment variables
Create a .env.local file in the root directory:
```text
GEMINI_API_KEY=your_api_key
NEXT_PUBLIC_CONVEX_URL=your_convex_url

```
### 4. Run the application
```bash
npm run dev
npx convex dev

```
Open **http://localhost:3000** in your browser.
## Usage
 1. **Input:** Enter a description of the website you want to build.
 2. **Generation:** AI generates the project structure and React components.
 3. **Refinement:** View and edit code in real time within the workspace.
 4. **Preview:** Preview the responsive website instantly.
 5. **Export:** Download the generated project files for local use.
## Project Structure
```text
/app         # Next.js App Router (pages and layouts)
/components  # Reusable UI components
/context     # Global state management
/convex      # Backend functions and schema
/data        # Static data and prompt templates
/public      # Assets and static files

```
## Limitations
 * AI-generated code may require manual refinement for specific logic.
 * API response time may vary depending on prompt complexity.
 * Deployment preview may be limited due to server timeouts.
## Future Improvements
 * Improved AI accuracy and layout optimization.
 * Enhanced customization options for themes and branding.
 * Multi-page project generation and routing.
 * Performance optimization for large-scale projects.
## License
This project is licensed under the MIT License.