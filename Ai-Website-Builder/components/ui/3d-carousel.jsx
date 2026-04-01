"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";

/* ---------- Helpers ---------- */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const IS_SERVER = typeof window === "undefined";

function useMediaQuery(query, { defaultValue = false, initializeWithValue = true } = {}) {
  const getMatches = (query) => {
    if (IS_SERVER) return defaultValue;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState(() => {
    return initializeWithValue ? getMatches(query) : defaultValue;
  });

  const handleChange = () => setMatches(getMatches(query));

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

/* ---------- Data ---------- */

const keywords = ["app", "dashboard", "website", "ui", "startup", "design", "tech"];

/* ---------- Carousel ---------- */

const Carousel = memo(({ handleClick, controls, cards, isCarouselActive }) => {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");

  const cylinderWidth = isScreenSizeSm ? 1400 : 2400;
  const faceCount = cards.length;
  const faceWidth = cylinderWidth / faceCount;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (value) => `rotateY(${value}deg)`);

  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        drag={isCarouselActive ? "x" : false}
        className="relative flex justify-center items-center"
        style={{
          transform,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
        }}
        onDrag={(_, info) =>
          isCarouselActive &&
          rotation.set(rotation.get() + info.offset.x * 0.05)
        }
        onDragEnd={(_, info) =>
          isCarouselActive &&
          controls.start({
            rotateY: rotation.get() + info.velocity.x * 0.05,
            transition: {
              type: "spring",
              stiffness: 80,
              damping: 20,
            },
          })
        }
        animate={controls}
      >
        {cards.map((imgUrl, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
            }}
            onClick={() => handleClick(imgUrl)}
          >
            <motion.img
              src={imgUrl}
              className="w-[60%] h-auto max-h-[240px] object-contain rounded-xl bg-gradient-to-b from-black/40 to-black/10 p-3 shadow-[0_0_40px_rgba(59,130,246,0.35)]"
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 60px rgba(59,130,246,0.6)",
              }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

/* ---------- Main Component ---------- */

export function ThreeDPhotoCarousel() {
  const [activeImg, setActiveImg] = useState(null);
  const [isCarouselActive, setIsCarouselActive] = useState(true);

  const controls = useAnimation();

  const cards = useMemo(
    () =>
      keywords.map((_, i) => `https://picsum.photos/500/500?random=${i}`),
    []
  );

  const handleClick = (img) => {
    setActiveImg(img);
    setIsCarouselActive(false);
    controls.stop();
  };

  const handleClose = () => {
    setActiveImg(null);
    setIsCarouselActive(true);
  };

  return (
  <div className="relative w-full flex flex-col items-center justify-center -mt-10">

    {/* Glow */}
    <div className="absolute w-[500px] h-[220px] bg-blue-500/25 blur-3xl rounded-full -z-10" />

    {/* Fullscreen preview */}
    <AnimatePresence>
      {activeImg && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-md"
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.img
            src={activeImg}
            className="max-w-2xl rounded-xl shadow-2xl"
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>

    {/* 🔥 REDUCED HEIGHT (THIS FIXES GAP) */}
    <div className="h-[380px] md:h-[520px] w-full flex items-center justify-center">
      <Carousel
        handleClick={handleClick}
        controls={controls}
        cards={cards}
        isCarouselActive={isCarouselActive}
      />
    </div>

  </div>
);
}