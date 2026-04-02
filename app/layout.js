import "./globals.css";
import Provider from "./provider";
import ConvexClientProvider from "./ConvexClientProvider";
import WebForgeBot from "@/components/mascot/WebForgeBot";
import { MessagesContextProvider } from "@/context/MessagesContext";
import { BotProvider } from "@/components/mascot/BotContext";

export const metadata = {
  title: "WebForge",
  description: "AI Website Builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>

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
  );
}