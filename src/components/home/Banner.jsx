// components/Banner.jsx
"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import Button from "../reusable/Button";
// import Button from "./Button";

const slidesConfig = [
  {
    image:
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/9-1.png",
    prefix: "banner1",
    btnHref: "/dealer",
  },
  {
    image:
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/8-1.png",
    prefix: "banner2",
    btnHref: "/membership",
  },
  {
    image:
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/7-1.png",
    prefix: "banner3",
    btnHref: "/dealer",
  },
  {
    image:
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/5-1.png",
    prefix: "banner4",
    btnHref: "/membership",
  },
];

const AUTOPLAY_DELAY = 5000;

const slideVariants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: -12, transition: { duration: 0.3 } },
};

export default function Banner() {
  const { t } = useApp();
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(isHovering);

  useEffect(() => {
    isHoveringRef.current = isHovering;
  }, [isHovering]);

  const goTo = useCallback((i) => {
    setIndex((prev) => {
      const total = slidesConfig.length;
      return (i + total) % total;
    });
  }, []);

  // ── Autoplay: runs once, never restarted by index changes ──
  useEffect(() => {
    const timer = setInterval(() => {
      if (isHoveringRef.current) return;
      setIndex((prev) => (prev + 1) % slidesConfig.length);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, []);

  const current = slidesConfig[index];
  const p = current.prefix;

  return (
    <section
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full h-[480px] sm:h-[560px] md:h-[640px] lg:h-[720px] overflow-hidden"
    >
      {/* ── Background Image Slides ── */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={index}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex items-center px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${t(`${p}_tag`)}`}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.p
                custom={0}
                variants={textVariants}
                className="text-xs sm:text-sm md:text-base font-semibold tracking-wide text-green-400 uppercase mb-3 sm:mb-4"
              >
                {t(`${p}_tag`)}
              </motion.p>

              <motion.h1
                custom={1}
                variants={textVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 sm:mb-5"
              >
                {t(`${p}_headingRegular`)}{" "}
                <span className="text-green-400">
                  {t(`${p}_headingBold`)}
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={textVariants}
                className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed mb-6 sm:mb-8 max-w-md"
              >
                {t(`${p}_description`)}
              </motion.p>

              <motion.div custom={3} variants={textVariants}>
                <Button href={current.btnHref} size="md" variant="primary">
                  {t(`${p}_btn`)}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Pagination (bottom center) ── */}
      <div className="absolute bottom-6 sm:bottom-8 left-0 w-full z-10 flex items-center justify-center gap-3">
        {slidesConfig.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-1.5 sm:h-2 rounded-full bg-white/40 overflow-hidden transition-all duration-300"
            style={{ width: i === index ? 36 : 10 }}
          >
            {i === index && (
              <motion.span
                key={index}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: isHovering ? 0 : AUTOPLAY_DELAY / 1000,
                  ease: "linear",
                }}
                className="absolute left-0 top-0 h-full bg-green-500"
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Page indicator text (e.g. 01 / 04) ── */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-10 md:right-16 z-10 hidden sm:flex items-center gap-2 text-white text-sm font-medium">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span className="w-6 h-px bg-white/50" />
        <span className="text-white/60">
          {String(slidesConfig.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}