"use client";

import React from "react";
import { Code, Sparkles } from "lucide-react";

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-2xl">
      <div className="container mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* LEFT */}
          <div className="flex items-center gap-3">

            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 rounded-xl"></div>

              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl shadow-[0_0_25px_rgba(59,130,246,0.4)]">
                <Code className="h-5 w-5 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                WebForge
              </h1>

              <p className="text-[11px] text-gray-400">
                AI Website Builder
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* AI STATUS */}
            <div className="hidden md:flex items-center space-x-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-xl">

              <Sparkles className="h-4 w-4" />

              <span>AI Ready</span>

            </div>

            {/* AUTH */}

            {!isSignedIn ? (
              <div className="flex items-center gap-3">

                <SignInButton mode="modal">
                  <button className="px-5 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all duration-300 backdrop-blur-xl">
                    Sign In
                  </button>
                </SignInButton>

                <SignUpButton mode="modal">
                  <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:scale-105 transition-all duration-300">
                    Get Started
                  </button>
                </SignUpButton>

              </div>
            ) : (
              <div className="scale-110">
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-10 h-10 ring-2 ring-blue-500/40",
                    },
                  }}
                />
              </div>
            )}

          </div>

        </div>

      </div>
    </header>
  );
}

export default Header;