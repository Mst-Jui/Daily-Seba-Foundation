"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Quote } from "lucide-react";
import Image from "next/image";

export default function ChairmanSection() {
  const { t } = useApp();
  return (
    <section className="relative w-full py-14 sm:py-20 md:py-24 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-blue-500/10 aspect-[4/5] ring-1 ring-black/5 dark:ring-white/10">
              <Image
                width={300}
                height={300}
                src="https://dailysebafoundation.com/wp-content/uploads/2026/04/Anik-Islam-768x856.webp"
                alt="Chairman"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent" />
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/15 to-teal-400/15 -z-10 hidden sm:block"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/15 to-teal-400/15 -z-10 hidden sm:block"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block text-xs sm:text-sm font-semibold tracking-wide mb-3 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              {t("chairman_badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-snug mb-6">
              {t("chairman_heading_normal")}{" "}
              <span className="relative inline-block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                {t("chairman_heading_highlight")}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  style={{ originX: 0 }}
                  className="absolute left-0 -bottom-1 w-full h-1 bg-gradient-to-r from-blue-500/40 to-teal-400/40 rounded-full"
                />
              </span>
            </h2>

            <div className="relative pl-6 sm:pl-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-0"
              >
                <Quote className="w-5 h-5 text-teal-500/60" />
              </motion.div>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                <p>{t("chairman_quote1")}</p>
                <p>{t("chairman_quote2")}</p>
                <p className="font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-teal-500 pl-4 -ml-4">
                  {t("chairman_quote3")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-0.5 bg-gradient-to-r from-blue-600 to-teal-500" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  {t("chairman_name")}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {t("chairman_title")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}