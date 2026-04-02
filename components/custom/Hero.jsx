"use client";

import Lookup from "@/data/Lookup";
import { MessagesContext } from "@/context/MessagesContext";
import { Sparkles, Send, Wand2, Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useBot } from "@/components/mascot/BotContext";
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel";

function Hero() {
  const [userInput, setUserInput] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);

  const { updateMood } = useBot();
  const { setMessages } = useContext(MessagesContext);

  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!input || input.trim().length < 5) return;

    // 🧠 thinking
    updateMood("focused");

    const msg = {
      role: "user",
      content: input,
    };

    setMessages(msg);

    // 🔨 building
    setTimeout(() => {
      updateMood("busy");
    }, 800);

    const workspaceID = await CreateWorkspace({
      messages: [msg],
    });

    // 🎉 done
    setTimeout(() => {
      updateMood("proud");
    }, 1200);

    router.push("/workspace/" + workspaceID);
  };

  const enhancePrompt = async () => {
    if (!userInput) return;

    setIsEnhancing(true);
    updateMood("focused");

    try {
      const response = await fetch("/api/enhance-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let enhancedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.chunk) {
                enhancedText += data.chunk;
                setUserInput(enhancedText);
              }

              if (data.done && data.enhancedPrompt) {
                setUserInput(data.enhancedPrompt);
              }
            } catch {}
          }
        }
      }

      updateMood("proud");
    } catch (error) {
      console.error("Error enhancing prompt:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const onSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
    updateMood("curious");
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f625,transparent)]" />
      </div>

      <div className="container mx-auto px-4 py-14 relative z-10">
        <div className="flex flex-col items-center space-y-10">

          {/* Header */}
          <div className="text-center space-y-5">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 rounded-full px-6 py-3 border border-blue-500/30">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <span className="text-blue-400 text-lg font-semibold">
                NEXT-GEN AI WEBSITE BUILDER
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-[linear-gradient(45deg,#60a5fa_30%,#ec4899)] leading-tight">
              FORGE the Impossible <br className="hidden md:block" /> with WebForge
            </h1>

            <p className="text-lg md:text-xl text-cyan-300 max-w-3xl mx-auto font-mono">
              Describe a website idea and WebForge will generate the full project instantly.
            </p>
          </div>

          {/* Input */}
          <div className="w-full max-w-3xl bg-gray-900/50 backdrop-blur-xl rounded-xl border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.15)]">
            <div className="p-6">
              <div className="flex gap-4">

                <textarea
                  placeholder="Describe the website you want to build..."
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    updateMood("curious");
                  }}
                  disabled={isEnhancing}
                  className="w-full bg-transparent border border-blue-500/30 rounded-lg p-5 text-gray-100 placeholder-gray-400 focus:border-blue-500 outline-none font-mono text-lg h-40 resize-none"
                />

                <div className="flex flex-col gap-3">
                  {userInput && (
                    <>
                      <button
                        onClick={enhancePrompt}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-xl hover:scale-105 transition"
                      >
                        {isEnhancing ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <Wand2 />
                        )}
                      </button>

                      <button
                        onClick={() => onGenerate(userInput)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-xl hover:scale-105 transition"
                      >
                        <Send />
                      </button>
                    </>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Lookup?.SUGGSTIONS?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="p-5 bg-gray-900/50 border border-blue-500/20 rounded-xl text-left hover:bg-gray-800/60 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* 🚀 Carousel */}
          <div className="mt-2 w-full flex flex-col items-center">

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 text-center">
              Explore Generated Websites
            </h2>

            <div className="relative w-full max-w-6xl flex justify-center -mt-4">

              <div className="absolute w-[70%] h-[200px] bg-blue-500/20 blur-3xl rounded-full opacity-40"></div>

              <div className="relative w-full">
                <ThreeDPhotoCarousel />
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;