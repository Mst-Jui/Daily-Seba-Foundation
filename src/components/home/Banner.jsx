"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import Button from "../reusable/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slidesConfig = [
  {
    prefix: "banner1",
    images: [
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/9-1.png",
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/8-1.png",
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/7-1.png",
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/5-1.png",
    ],
    btnHref: "#dealer_form",
  },
  {
    prefix: "banner2",
    images: [
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/8-1.png",
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/7-1.png",
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/5-1.png",
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/9-1.png",
    ],
    btnHref: "/membership/register",
  },
  {
    prefix: "banner3",
    images: [
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/7-1.png",
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/5-1.png",
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/9-1.png",
      "https://dailysebafoundation.com/wp-content/uploads/2026/02/8-1.png",
    ],
    btnHref: "#dealer_form",
  },
];

const AUTOPLAY_DELAY = 5000;

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const imgVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25, ease: "easeIn" } },
};

function BannerBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 2 + 2,
      })),
    []
  );

  const boxes = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: Math.random() * 85 + 5,
        left: Math.random() * 92 + 4,
        size: Math.random() * 16 + 12,
        delay: Math.random() * 5,
        duration: Math.random() * 6 + 8,
        rotate: Math.random() * 40 - 20,
      })),
    []
  );

  const circles = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        top: Math.random() * 85 + 5,
        left: Math.random() * 92 + 4,
        size: Math.random() * 10 + 6,
        delay: Math.random() * 5,
        duration: Math.random() * 5 + 6,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1224] via-[#0f1b38] to-[#0a1220]" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] md:w-[850px] md:h-[850px] rounded-full opacity-40"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(37,99,235,0.25), rgba(45,212,191,0.2), transparent, rgba(37,99,235,0.2), transparent)",
        }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-600/25 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-24 -right-16 w-72 h-72 sm:w-[28rem] sm:h-[28rem] bg-teal-400/20 rounded-full blur-3xl"
      />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl hidden md:block" />
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-10 sm:top-12 right-6 sm:right-14 md:right-20 w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-teal-100 to-teal-300 shadow-[0_0_40px_14px_rgba(45,212,191,0.3)]"
      >
        <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-teal-400/40" />
        <div className="absolute bottom-2 right-2.5 w-2 h-2 rounded-full bg-teal-400/30" />
      </motion.div>
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {circles.map((c) => (
        <motion.div
          key={c.id}
          animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full border border-teal-400/30 hidden sm:block"
          style={{ top: `${c.top}%`, left: `${c.left}%`, width: c.size, height: c.size }}
        />
      ))}
      {boxes.map((b) => (
        <motion.div
          key={b.id}
          animate={{ y: [0, -18, 0], rotate: [b.rotate, b.rotate + 15, b.rotate] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-md border border-white/10 bg-white/[0.03] backdrop-blur-sm hidden sm:block"
          style={{ top: `${b.top}%`, left: `${b.left}%`, width: b.size, height: b.size }}
        />
      ))}
    </div>
  );
}

export default function Banner() {
  const { t } = useApp();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    isHoveringRef.current = isHovering;
  }, [isHovering]);

  const goTo = useCallback((i, dir) => {
    setDirection(dir);
    setIndex(i);
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slidesConfig.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slidesConfig.length) % slidesConfig.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isHoveringRef.current) return;
      setDirection(1);
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
      className="relative w-full pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden"
    >
      <BannerBackground />

      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 md:left-6 top-[58%] -translate-y-1/2 z-20 p-2 sm:p-2.5 md:p-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-400 hover:scale-110 transition-all duration-300"
      >
        <ChevronLeft size={18} className="sm:w-5 sm:h-5 text-white" />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 md:right-6 top-[58%] -translate-y-1/2 z-20 p-2 sm:p-2.5 md:p-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-400 hover:scale-110 transition-all duration-300"
      >
        <ChevronRight size={18} className="sm:w-5 sm:h-5 text-white" />
      </button>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
        <div className="space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-text`}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-4 sm:space-y-5 md:space-y-6"
            >
              <motion.span
                custom={0}
                variants={textVariants}
                className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600/25 to-teal-400/25 border border-teal-400/30 text-teal-300 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full"
              >
                {t(`${p}_tag`)}
              </motion.span>

              <motion.h1
                custom={1}
                variants={textVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
              >
                {t(`${p}_headingRegular`)} <br />
                <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                  {t(`${p}_headingBold`)}
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={textVariants}
                className="text-slate-300 text-sm sm:text-base md:text-lg max-w-md mx-auto md:mx-0"
              >
                {t(`${p}_description`)}
              </motion.p>

              <motion.div custom={3} variants={textVariants}>
                <Button href={current.btnHref} size="lg" variant="primary">
                  {t(`${p}_btn`)}
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-2 gap-3 sm:gap-4"
            >
              {current.images.map((img, i) => (
                <motion.div
                  key={`${index}-${i}`}
                  variants={imgVariants}
                  className="relative w-full h-32 sm:h-44 md:h-52 lg:h-56 overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600/30 to-teal-400/30 border border-white/10 shadow-lg shadow-blue-950/40"
                >
                  <Image
                    src={img}
                    alt="facility"
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 40vw, 25vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 mt-8 sm:mt-10">
        {slidesConfig.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-1.5 rounded-full bg-white/20 transition-all duration-300"
            style={{
              width: i === index ? 28 : 8,
              background: i === index ? "linear-gradient(to right, #2563eb, #2dd4bf)" : undefined,
            }}
          />
        ))}
      </div>
    </section>
  );
}