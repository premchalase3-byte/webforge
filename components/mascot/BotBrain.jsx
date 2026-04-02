export const BOT_MOODS = {
  IDLE: "playful",
  TYPING: "curious",
  THINKING: "focused",
  BUILDING: "busy",
  DONE: "proud",
};

export const BOT_DIALOGUES = {
  playful: [
    "Hey 👋 what are we building today?",
    "I’m ready when you are 😄",
    "Let’s create something awesome 🚀",
  ],

  curious: [
    "Hmm… this looks interesting 👀",
    "Okay, I’m reading your idea...",
    "Nice… I think I get what you want 😏",
  ],

  focused: [
    "Hmm… let me think about this 👀",
    "Breaking your idea into components...",
    "This is interesting… give me a second",
  ],

  busy: [
    "Alright, I’m putting this together for you 🔨",
    "Creating components… wiring things up...",
    "Adding some styling… making it look clean ✨",
  ],

  smart: [
    "I improved your layout a bit… it’ll look better on mobile 😉",
    "I added a navbar — you’ll probably need it 😎",
    "Optimizing your structure… trust me on this",
  ],

  proud: [
    "Done! Take a look 😄",
    "Your website is ready 🚀",
    "Tell me what you want to improve next",
  ],
};

/* Random picker */
export function getRandomDialogue(mood) {
  const list = BOT_DIALOGUES[mood] || [];
  return list[Math.floor(Math.random() * list.length)];
}