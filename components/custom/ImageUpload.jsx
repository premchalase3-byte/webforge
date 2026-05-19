"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  ImageIcon,
  X,
  Sparkles,
} from "lucide-react";

function ImageUpload({ onImageSelect }) {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    if (onImageSelect) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
      multiple: false,
    });

  const removeImage = () => {
    setPreview(null);

    if (onImageSelect) {
      onImageSelect(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">

      {!preview ? (
        <div
          {...getRootProps()}
          className={`
            relative overflow-hidden
            border border-white/10
            bg-white/5
            backdrop-blur-2xl
            rounded-3xl
            transition-all duration-300
            cursor-pointer
            group
            ${
              isDragActive
                ? "border-blue-500 bg-blue-500/10 scale-[1.02]"
                : "hover:border-blue-400/40 hover:bg-white/10"
            }
          `}
        >

          <input {...getInputProps()} />

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-40 blur-3xl"></div>

          <div className="relative p-14 flex flex-col items-center justify-center text-center">

            <div className="relative mb-6">

              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-30 rounded-full"></div>

              <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-5 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.35)]">
                <UploadCloud className="h-10 w-10 text-white" />
              </div>

            </div>

            <h2 className="text-2xl font-bold text-white mb-3">
              Upload Screenshot
            </h2>

            <p className="text-gray-400 max-w-xl leading-relaxed">
              Upload any website screenshot and WebForge AI will recreate it
              into a fully functional modern React website.
            </p>

            <div className="mt-8 flex items-center gap-2 text-blue-400 text-sm">

              <Sparkles className="h-4 w-4" />

              <span>AI Vision Powered</span>

            </div>

          </div>

        </div>
      ) : (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl">

          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-[500px] object-cover"
          />

          <button
            onClick={removeImage}
            className="absolute top-4 right-4 bg-black/60 hover:bg-red-500 text-white p-2 rounded-full transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2 text-white">

            <ImageIcon className="h-4 w-4 text-blue-400" />

            <span className="text-sm">
              Screenshot Ready for AI Analysis
            </span>

          </div>

        </div>
      )}

    </div>
  );
}

export default ImageUpload;