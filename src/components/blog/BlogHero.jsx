"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import BlogBackground from "./BlogBackground";

export default function BlogHero() {
  const { t } = useApp();
  return (
    <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 overflow-hidden">
      <BlogBackground />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-gradient-to-r from-blue-600/20 to-teal-400/20 border border-teal-400/30 text-teal-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
        >
          {t("blog_hero_badge")}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-5"
        >
          {t("blog_hero_heading")}{" "}
          <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
            {t("blog_hero_highlight")}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto"
        >
          {t("blog_hero_subtitle")}
        </motion.p>
      </div>
    </section>
  );
}