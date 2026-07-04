"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";

const faqKeys = [1, 2, 3, 4, 5, 6, 7, 8];

export default function FAQSection() {
  const { t } = useApp();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="relative py-14 sm:py-20 md:py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 sm:w-[26rem] sm:h-[26rem] bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/10 to-teal-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            {t("faq_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
            {t("faq_heading_normal")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              {t("faq_heading_highlight")}
            </span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base md:text-lg">{t("faq_subtitle")}</p>
        </motion.div>

        {/* readability-এর জন্য FAQ list ভেতরে narrow রাখা হয়েছে */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqKeys.map((num, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                className={`relative border rounded-2xl sm:rounded-3xl shadow-sm transition-all duration-300 overflow-hidden backdrop-blur-sm
                  ${
                    isOpen
                      ? "border-transparent bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/10 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30"
                      : "border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 hover:border-blue-200 dark:hover:border-slate-700 hover:shadow-md"
                  }`}
              >
                <motion.span
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-teal-400"
                />

                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 text-left"
                >
                  <span
                    className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300
                      ${isOpen ? "bg-gradient-to-br from-blue-600 to-teal-500 text-white shadow-md shadow-blue-500/30" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}
                  >
                    {String(num).padStart(2, "0")}
                  </span>

                  <span
                    className={`flex-1 font-semibold text-sm sm:text-base transition-colors ${isOpen ? "text-blue-700 dark:text-blue-300" : "text-slate-900 dark:text-white"}`}
                  >
                    {t(`faq_q${num}`)}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
                      ${isOpen ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="pl-16 sm:pl-[4.25rem] pr-4 sm:pr-5 pb-4 sm:pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {t(`faq_a${num}`)}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}