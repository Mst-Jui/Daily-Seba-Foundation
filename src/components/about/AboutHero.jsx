// components/about/AboutHero.jsx
"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function AboutHero() {
  const { t } = useApp();

  return (
    <section className="relative w-full pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-44 md:pb-24 overflow-hidden bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900">
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-green-500/15 text-green-400 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
        >
          Daily Seba Foundation
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug sm:leading-tight mb-5"
        >
          {t("about_hero_heading")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
        >
          {t("about_hero_subtitle")}
        </motion.p>
      </div>
    </section>
  );
}