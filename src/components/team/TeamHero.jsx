// components/team/TeamHero.jsx
"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function TeamHero() {
  const { t } = useApp();

  return (
    <section className="relative w-full pt-28 pb-12 sm:pt-36 sm:pb-16 md:pt-44 md:pb-20 overflow-hidden bg-gray-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-5"
        >
          {t("team_hero_heading")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto"
        >
          {t("team_hero_subtitle")}
        </motion.p>
      </div>
    </section>
  );
}