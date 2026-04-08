"use client";

import React, { useContext, useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import Lookup from "@/data/Lookup";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import { useConvex, useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Loader2Icon, Download, Monitor, Smartphone } from "lucide-react";
import JSZip from "jszip";
import { BASE_SANDBOX } from "@/data/BaseSandbox";
import { useBot } from "@/components/mascot/BotContext";

/* Sandpack Dynamic Imports */
const SandpackProvider = dynamic(() =>
  import("@codesandbox/sandpack-react").then((m) => m.SandpackProvider),
  { ssr: false }
);

const SandpackLayout = dynamic(() =>
  import("@codesandbox/sandpack-react").then((m) => m.SandpackLayout),
  { ssr: false }
);

const SandpackCodeEditor = dynamic(() =>
  import("@codesandbox/sandpack-react").then((m) => m.SandpackCodeEditor),
  { ssr: false }
);

const SandpackPreview = dynamic(() =>
  import("@codesandbox/sandpack-react").then((m) => m.SandpackPreview),
  { ssr: false }
);

const SandpackFileExplorer = dynamic(() =>
  import("@codesandbox/sandpack-react").then((m) => m.SandpackFileExplorer),
  { ssr: false }
);

function CodeView() {
  const { id } = useParams();
  const { messages } = useContext(MessagesContext);
  const convex = useConvex();
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);

  const bot = useBot();

  const [activeTab, setActiveTab] = useState("code");
  const [previewMode, setPreviewMode] = useState("desktop"); // ✅ NEW
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);

  const setBot = (state) => {
    if (bot?.updateMood) bot.updateMood(state);
    else if (bot?.setBotState) bot.setBotState(state);
  };

  const preprocessFiles = useCallback((files) => {
    const processed = {};

    Object.entries(files).forEach(([path, content]) => {
      let newPath = path.startsWith("/") ? path : `/${path}`;

      if (!newPath.startsWith("/src") && !newPath.endsWith(".html")) {
        newPath = "/src" + newPath;
      }

      const code =
        typeof content === "string" ? content : content?.code || "";

      if (!code) return;

      processed[newPath] = { code };
    });

    return processed;
  }, []);

  const ensureBaseFiles = (files) => {
    const newFiles = { ...files };

    newFiles["/index.html"] ||= BASE_SANDBOX["/index.html"];
    newFiles["/src/index.js"] ||= BASE_SANDBOX["/src/index.js"];
    newFiles["/src/index.css"] ||= BASE_SANDBOX["/src/index.css"];
    newFiles["/src/App.js"] ||= BASE_SANDBOX["/src/App.js"];

    return newFiles;
  };

  const GetFiles = useCallback(async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });

    const processed = preprocessFiles(result?.fileData || {});
    setFiles(ensureBaseFiles(processed));
  }, [id, convex, preprocessFiles]);

  useEffect(() => {
    if (id) GetFiles();
  }, [id, GetFiles]);

  const GenerateAiCode = useCallback(async () => {
    setLoading(true);
    setBot("busy");

    try {
      const PROMPT =
        JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;

      const res = await fetch("/api/gen-ai-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: PROMPT }),
      });

      const data = await res.json();

      if (data?.files) {
        const processed = preprocessFiles(data.files);
        const safe = ensureBaseFiles(processed);

        setFiles(safe);

        await UpdateFiles({
          workspaceId: id,
          files: data.files,
        });

        setBot("proud");
      }
    } catch (err) {
      console.error(err);
      setBot("idle");
    } finally {
      setLoading(false);
    }
  }, [messages, id, UpdateFiles, preprocessFiles]);

  useEffect(() => {
    if (messages?.length > 0) {
      const last = messages[messages.length - 1];
      if (last.role === "user") GenerateAiCode();
    }
  }, [messages, GenerateAiCode]);

  const downloadFiles = async () => {
    const zip = new JSZip();

    Object.entries(files).forEach(([name, content]) => {
      if (!content?.code) return;

      const cleanName = name.startsWith("/") ? name.slice(1) : name;
      zip.file(cleanName, content.code);
    });

    const blob = await zip.generateAsync({ type: "blob" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "webforge-project.zip";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">

      {/* Top Bar */}
      <div className="bg-[#181818] p-3 flex justify-between items-center border-b">

        {/* LEFT */}
        <div className="flex gap-3 bg-black p-1 rounded-full">
          <button
            onClick={() => setActiveTab("code")}
            className={activeTab === "code" ? "text-blue-400 px-3" : "px-3"}
          >
            Code
          </button>

          <button
            onClick={() => setActiveTab("preview")}
            className={activeTab === "preview" ? "text-blue-400 px-3" : "px-3"}
          >
            Preview
          </button>
        </div>

        {/* CENTER (NEW) */}
        {activeTab === "preview" && (
          <div className="flex gap-2 bg-black p-1 rounded-full">
            <button
              onClick={() => setPreviewMode("desktop")}
              className={`p-2 rounded-full ${
                previewMode === "desktop" ? "bg-blue-500/30 text-blue-400" : ""
              }`}
            >
              <Monitor size={16} />
            </button>

            <button
              onClick={() => setPreviewMode("mobile")}
              className={`p-2 rounded-full ${
                previewMode === "mobile" ? "bg-blue-500/30 text-blue-400" : ""
              }`}
            >
              <Smartphone size={16} />
            </button>
          </div>
        )}

        {/* RIGHT */}
        <button
          onClick={downloadFiles}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
        >
          <Download size={16} />
          Download
        </button>
      </div>

      <SandpackProvider
        template="react"
        files={{ ...BASE_SANDBOX, ...files }}
        theme="dark"
        customSetup={{
          dependencies: { ...Lookup.DEPENDANCY },
          entry: "/src/index.js",
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
          bundlerTimeout: 30000,
        }}
      >
        <SandpackLayout>

          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <div className="flex justify-center w-full">
              <div
                className={`transition-all duration-300 ${
                  previewMode === "mobile"
                    ? "w-[375px] border rounded-xl overflow-hidden shadow-lg"
                    : "w-full"
                }`}
              >
                <SandpackPreview style={{ height: "80vh" }} />
              </div>
            </div>
          )}

        </SandpackLayout>
      </SandpackProvider>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <Loader2Icon className="animate-spin text-white" />
        </div>
      )}
    </div>
  );
}

export default CodeView;