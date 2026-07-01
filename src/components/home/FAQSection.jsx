// components/FAQSection.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Plus, Minus } from "lucide-react";

const faqKeys = [1, 2, 3, 4, 5, 6, 7, 8];

export default function FAQSection() {
  const { t } = useApp();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-14 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-green-500 text-sm font-semibold tracking-wide mb-3">
            {t("faq_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            {t("faq_heading_normal")}{" "}
            <span className="text-green-500">{t("faq_heading_highlight")}</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{t("faq_subtitle")}</p>
        </motion.div>

        {/* ── FAQ List ── */}
        <div className="space-y-3 sm:space-y-4">
          {faqKeys.map((num, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`border rounded-xl sm:rounded-2xl shadow-sm transition-colors overflow-hidden
                  ${
                    isOpen
                      ? "border-green-500 bg-green-50/40 dark:bg-green-900/10"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center gap-4 p-4 sm:p-5 text-left"
                >
                  <span className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">
                    {t(`faq_q${num}`)}
                  </span>
                  <span
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors
                      ${isOpen ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300"}`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
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