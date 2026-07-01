// components/ChairmanSection.jsx
"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Quote } from "lucide-react";
import Image from "next/image";

export default function ChairmanSection() {
  const { t } = useApp();

  return (
    <section className="w-full py-14 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-14 items-center">
          {/* ── Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5]">
              <Image
                width={300}
                height={300}
                src="https://dailysebafoundation.com/wp-content/uploads/2026/04/Anik-Islam-768x856.webp"
                alt="Chairman"
                className="w-full h-full object-cover"
              />
            </div>
            {/* decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-green-500/10 -z-10 hidden sm:block" />
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-green-500/10 -z-10 hidden sm:block" />
          </motion.div>

          {/* ── Text ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block text-green-500 text-sm font-semibold tracking-wide mb-3">
              {t("chairman_badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-snug mb-6">
              {t("chairman_heading_normal")}{" "}
              <span className="relative inline-block text-green-500">
                {t("chairman_heading_highlight")}
                <span className="absolute left-0 -bottom-1 w-full h-1 bg-green-500/30 rounded-full" />
              </span>
            </h2>

            <div className="relative pl-6 sm:pl-8">
              <Quote className="absolute left-0 top-0 w-5 h-5 text-green-500/40" />
              <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                <p>{t("chairman_quote1")}</p>
                <p>{t("chairman_quote2")}</p>
                <p className="font-semibold text-gray-800 dark:text-gray-100 border-l-4 border-green-500 pl-4 -ml-4">
                  {t("chairman_quote3")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="w-10 h-0.5 bg-green-500" />
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