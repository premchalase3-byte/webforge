import Script from "next/script";
import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";
import WebForgeBot from "@/components/mascot/WebForgeBot";
import { MessagesContextProvider } from "@/context/MessagesContext";
import { BotProvider } from "@/components/mascot/BotContext";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "WebForge",
  description: "AI Website Builder",
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

        </body>
      </html>
    </ClerkProvider>
  );
}