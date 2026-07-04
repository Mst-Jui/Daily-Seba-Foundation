"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Search, X } from "lucide-react";

export default function WorkingAreaSearchFilter({
  query,
  setQuery,
  activeDiv,
  setActiveDiv,
  divisions,
  totalFiltered,
}) {
  const { t, lang } = useApp();

  return (
    <>
      {/* Search bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative max-w-xl mx-auto mb-6"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("wa_search_placeholder")}
          className="w-full pl-11 pr-10 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 outline-none focus:border-teal-500 transition-colors shadow-sm"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </motion.div>

      {/* Division filter pills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        <button
          onClick={() => setActiveDiv(null)}
          className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200
            ${!activeDiv ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-teal-300"}`}
        >
          {lang === "bn" ? "সব বিভাগ" : "All Divisions"}
        </button>
        {divisions.map((div) => (
          <button
            key={div.id}
            onClick={() => setActiveDiv(activeDiv === div.id ? null : div.id)}
            className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200
              ${activeDiv === div.id ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-teal-300"}`}
          >
            {t(div.divisionKey)}
          </button>
        ))}
      </motion.div>

      {/* Result count */}
      {(query || activeDiv) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6"
        >
          {totalFiltered} {t("wa_dealer_count")} {lang === "bn" ? "পাওয়া গেছে" : "found"}
        </motion.p>
      )}
    </>
  );
}