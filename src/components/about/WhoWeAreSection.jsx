"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Target, Compass } from "lucide-react";

export default function WhoWeAreSection() {
  const { t } = useApp();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.2"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-14 sm:py-24 md:py-32 bg-white dark:bg-gray-950 transition-colors duration-300 overflow-hidden"
    >
      {/* ── decorative theme glows ── */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 w-80 h-80 bg-teal-400/5 dark:bg-teal-500/10 rounded-full blur-3xl" />

      {/* ── Giant background watermark text ── */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-4 sm:top-0 left-1/2 -translate-x-1/2 text-[18vw] sm:text-[14vw] font-black bg-gradient-to-b from-blue-100/60 to-teal-100/30 dark:from-blue-900/25 dark:to-teal-900/10 bg-clip-text text-transparent leading-none whitespace-nowrap tracking-tighter"
      >
        DSF
      </span>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Top: badge + huge statement ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mb-12 sm:mb-16 md:mb-20"
        >
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5">
            <span className="w-6 h-px bg-gradient-to-r from-blue-600 to-teal-400" />
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              {t("about_whoweare_badge")}
            </span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-[1.15] mb-6">
            {t("about_whoweare_heading")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {t("about_whoweare_desc")}
          </p>
        </motion.div>

        {/* ── Goal → Vision as a connected vertical journey ── */}
        <div className="relative pl-10 sm:pl-16">
          <div className="absolute left-[11px] sm:left-[19px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[11px] sm:left-[19px] top-2 w-px bg-gradient-to-b from-blue-600 to-teal-400 origin-top"
          />

          {/* ── Goal node ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="relative mb-12 sm:mb-16 md:mb-20"
          >
            <span className="absolute -left-10 sm:-left-16 top-0 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-gray-950 border-2 border-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Target className="w-3 h-3 sm:w-5 sm:h-5 text-blue-600" />
            </span>
            <p className="text-xs font-semibold text-blue-600 dark:text-teal-400 tracking-widest uppercase mb-2">
              01 — {t("about_goal_title")}
            </p>
            <p className="text-base sm:text-lg md:text-2xl font-medium text-gray-800 dark:text-gray-100 leading-snug max-w-2xl">
              {t("about_goal_desc")}
            </p>
          </motion.div>

          {/* ── Vision node ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <span className="absolute -left-10 sm:-left-16 top-0 w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-400 border-2 border-transparent flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Compass className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
            </span>
            <p className="text-xs font-semibold text-blue-600 dark:text-teal-400 tracking-widest uppercase mb-2">
              02 — {t("about_vision_title")}
            </p>
            <p className="text-base sm:text-lg md:text-2xl font-medium text-gray-800 dark:text-gray-100 leading-snug max-w-2xl">
              {t("about_vision_desc")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}