"use client";
import { motion } from "framer-motion";

export default function BlogFilter({ filterList, activeFilter, setActiveFilter, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap gap-2 mb-10 sm:mb-12"
    >
      {filterList.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveFilter(cat)}
          className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
            ${activeFilter === cat
              ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md shadow-teal-500/25"
              : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-teal-300"
            }`}
        >
          {cat === "all" ? t("blog_filter_all") : cat}
        </button>
      ))}
    </motion.div>
  );
}