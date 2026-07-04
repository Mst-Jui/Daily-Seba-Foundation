"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export default function ChairmanStorySection() {
  const { t } = useApp();
  return (
    <section className="relative w-full py-14 sm:py-20 md:py-28 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 w-80 h-80 bg-teal-400/5 dark:bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-0">
        {/* ── Left: Portrait ── */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="relative h-[280px] sm:h-[420px] lg:h-auto lg:min-h-[520px] rounded-2xl lg:rounded-r-none overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
        >
          <img
            src="https://dailysebafoundation.com/wp-content/uploads/2026/05/Logo.ai-800-x-800-px.png"
            alt="Chairman, Daily Seba Foundation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 sm:bottom-6 sm:left-6">
            <p className="text-white font-bold text-base sm:text-lg leading-tight drop-shadow-md">
              {t("chairman_name")}
            </p>
            <p className="text-white/90 text-xs sm:text-sm drop-shadow-md">
              {t("chairman_title")}
            </p>
          </div>
        </motion.div>

        {/* ── Right: Story content ── */}
        <div className="relative lg:pl-12 xl:pl-16 flex flex-col justify-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"
          >
            {t("chairman_badge")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-snug mb-8"
          >
            {t("chairman_heading_normal")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              {t("chairman_heading_highlight")}
            </span>
          </motion.h2>
          <div className="space-y-6 border-l-2 border-gray-200 dark:border-gray-800 pl-6">
            {[1, 2].map((n, i) => (
              <motion.p
                key={n}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {t(`chairman_quote${n}`)}
              </motion.p>
            ))}
            <motion.p
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.44 }}
              className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white border-l-4 border-teal-500 pl-4 -ml-[calc(1.5rem+2px)]"
            >
              "{t("chairman_quote3")}"
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}