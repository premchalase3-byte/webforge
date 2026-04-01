"use client";

import { motion } from "framer-motion";
import { useBot } from "./BotContext";
import { BOT_ANIMATIONS } from "./BotAnimations";

export default function WebForgeBot() {

  const { mood } = useBot(); // ✅ FIXED
  const currentState = mood || "idle";

  const images = {
    idle: "/bot/idle.png",
    thinking: "/bot/thinking.png",
    building: "/bot/building.png",
    happy: "/bot/happy.png",
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-[9999]"
      animate={BOT_ANIMATIONS[currentState] || {}}
    >
      <img
        src={images[currentState] || "/bot/idle.png"}
        alt="WebForge Bot"
        className="w-[90px] h-[90px] object-contain"
      />
    </motion.div>
  );
}