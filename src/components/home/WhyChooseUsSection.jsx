"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Check, X } from "lucide-react";

const comparisonRows = ["why_row1", "why_row2", "why_row3", "why_row4", "why_row5"];

export default function WhyChooseUsSection() {
  const { t } = useApp();
  return (
    <section className="relative w-full py-14 sm:py-20 md:py-24 bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              {t("why_heading")}
            </span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-1.5 md:h-2 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white dark:bg-gray-900 rounded-2xl md:rounded-[2rem] p-4 sm:p-6 md:p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-blue-200/20 dark:shadow-none max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] mb-4">
            <div />
            <div className="text-center text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
              {t("why_col_traditional")}
            </div>
            <div className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest px-1 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              {t("why_col_dsf")}
            </div>
          </div>

          <div className="space-y-3">
            {comparisonRows.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.01 }}
                className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] items-center rounded-xl sm:rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 p-3 sm:p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 dark:hover:from-blue-900/10 dark:hover:to-teal-900/10 transition-all duration-300"
              >
                <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 dark:text-gray-200 pr-2">
                  {t(`${key}_label`)}
                </div>
                <div className="flex justify-center">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 dark:text-gray-600" />
                </div>
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15, delay: i * 0.1 + 0.15 }}
                    className="bg-gradient-to-br from-blue-600 to-teal-500 p-1 rounded-full shadow-md shadow-teal-500/25"
                  >
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}