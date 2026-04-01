"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import { downloadProject } from "@/lib/downloadProject";
import Lookup from "@/data/Lookup";

const ChatView = dynamic(() => import('@/components/custom/ChatView'), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-800 rounded-lg h-full" />
});

const CodeView = dynamic(() => import('@/components/custom/CodeView'), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-800 rounded-lg h-full" />
});

const BackgroundPattern = React.memo(() => (
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_400px_at_50%_300px,#3b82f625,transparent)]" />
    </div>
));

BackgroundPattern.displayName = 'BackgroundPattern';

const Workspace = () => {

    const handleDownload = () => {
        downloadProject(Lookup.DEFAULT_FILE);
    };

    return (
        <div className="min-h-screen bg-gray-950 relative overflow-hidden">

            <BackgroundPattern />

            <div className="relative z-10 p-10">

                {/* Workspace Header */}

                <div className="flex items-center justify-between mb-6">

                    <h1 className="text-2xl font-bold text-white">
                        WebForge Workspace
                    </h1>

                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
                    >
                        Download Project
                    </button>

                </div>

                {/* Workspace Layout */}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    <ChatView />

                    <div className="col-span-3">
                        <CodeView />
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Workspace;