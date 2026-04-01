"use client";

import { createContext, useContext, useState } from "react";
import { BOT_MOODS, getRandomDialogue } from "./BotBrain";

const BotContext = createContext();

export function BotProvider({ children }) {
  const [mood, setMood] = useState(BOT_MOODS.IDLE);
  const [message, setMessage] = useState(
    getRandomDialogue(BOT_MOODS.IDLE)
  );

  const updateMood = (newMood) => {
    setMood(newMood);
    setMessage(getRandomDialogue(newMood));
  };

  return (
    <BotContext.Provider value={{ mood, message, updateMood }}>
      {children}
    </BotContext.Provider>
  );
}

export const useBot = () => useContext(BotContext);