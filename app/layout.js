import Script from "next/script";
import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";
import WebForgeBot from "@/components/mascot/WebForgeBot";
import { MessagesContextProvider } from "@/context/MessagesContext";
import { BotProvider } from "@/components/mascot/BotContext";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "WebForge | AI Website Builder",
  description:
    "Generate modern, responsive React websites instantly using AI. Build websites from prompts or screenshots with WebForge.",

  keywords: [
    "AI Website Builder",
    "Website Generator",
    "React Website Builder",
    "AI Web Development",
    "Screenshot to Website",
    "Prompt to Website",
    "Next.js",
    "Tailwind CSS",
    "Groq AI",
    "Artificial Intelligence",
    "WebForge",
    "AI Coding Assistant"
  ],

  authors: [{ name: "Prem Chalase" }],

  creator: "Prem Chalase",

  publisher: "WebForge",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "WebForge | AI Website Builder",
    description:
      "Generate complete React websites from prompts or screenshots using AI.",
    type: "website",
    siteName: "WebForge",
  },

  twitter: {
    card: "summary_large_image",
    title: "WebForge",
    description:
      "AI-powered Website Builder using React, Next.js and Groq AI.",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>

          {/* Microsoft Clarity */}
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);
                  t.async=1;
                  t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];
                  y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "xg6yh69tw8");
            `}
          </Script>

          <ConvexClientProvider>
            <Provider>
              <MessagesContextProvider>
                <BotProvider>

                  {children}

                  <WebForgeBot />

                </BotProvider>
              </MessagesContextProvider>
            </Provider>
          </ConvexClientProvider>
          <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "WebForge",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      creator: {
        "@type": "Person",
        name: "Prem Chalase",
      },
      description:
        "AI-powered website builder that generates responsive React websites from prompts and screenshots.",
    }),
  }}
/>

        </body>
      </html>
    </ClerkProvider>
  );
}