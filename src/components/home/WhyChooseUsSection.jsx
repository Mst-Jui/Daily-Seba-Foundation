// components/home/WhyChooseUsSection.jsx
"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Check, X } from "lucide-react";

const comparisonRows = ["why_row1", "why_row2", "why_row3", "why_row4", "why_row5"];

export default function WhyChooseUsSection() {
  const { t } = useApp();

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("why_heading")}
          </h2>
          <div className="h-1.5 w-16 md:w-20 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white dark:bg-gray-900 rounded-2xl md:rounded-[2rem] p-4 md:p-8 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/30 dark:shadow-none"
        >
          {/* Header */}
          <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] mb-4">
            <div />
            <div className="text-center text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
              {t("why_col_traditional")}
            </div>
            <div className="text-center text-[10px] sm:text-xs font-bold text-green-600 uppercase tracking-widest px-1">
              {t("why_col_dsf")}
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-3">
            {comparisonRows.map((key) => (
              <div
                key={key}
                className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_120px_120px] items-center rounded-xl sm:rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 p-3 sm:p-4 hover:bg-gray-100/50 dark:hover:bg-gray-800/60 transition-all duration-300"
              >
                <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 dark:text-gray-200 pr-2">
                  {t(`${key}_label`)}
                </div>
                <div className="flex justify-center">
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 dark:text-gray-600" />
                </div>
                <div className="flex justify-center">
                  <div className="bg-green-500 p-1 rounded-full shadow-md shadow-green-500/20">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}