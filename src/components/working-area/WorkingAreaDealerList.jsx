"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Search, MapPin, Map } from "lucide-react";

// English ফিল্ড (nameEn/areaEn/districtEn) থাকলে সেটা ব্যবহার হবে,
// না থাকলে বাংলা ডেটা fallback হিসেবে দেখাবে।
function localizedField(dealer, field, lang) {
  if (lang === "en") {
    const enKey = `${field}En`;
    if (dealer[enKey]) return dealer[enKey];
  }
  return dealer[field];
}

export default function WorkingAreaDealerList({ filtered }) {
  const { t, lang } = useApp();

  return (
    <AnimatePresence mode="wait">
      {filtered.length === 0 ? (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-16 text-gray-400 dark:text-gray-500"
        >
          <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">{t("wa_no_results")}</p>
        </motion.div>
      ) : (
        <motion.div
          key="results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-12 sm:space-y-16"
        >
          {filtered.map((div, di) => (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: di * 0.05 }}
            >
              {/* Division heading */}
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
                  {t(div.divisionKey)}
                </h2>
                <span className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                <span className="text-xs font-medium text-teal-600 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full shrink-0">
                  {div.dealers.length} {t("wa_dealer_count")}
                </span>
              </div>

              {/* Dealer cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {div.dealers.map((dealer, i) => {
                  const name = localizedField(dealer, "name", lang);
                  const area = localizedField(dealer, "area", lang);
                  const district = localizedField(dealer, "district", lang);
                  return (
                    <motion.div
                      key={`${dealer.name}-${i}`}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.35, delay: i * 0.03 }}
                      whileHover={{ y: -6, scale: 1.02 }}
                      className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/15 to-teal-400/15 flex items-center justify-center mb-3 shrink-0"
                      >
                        <span className="text-teal-600 dark:text-teal-400 font-bold text-base">
                          {name.charAt(0)}
                        </span>
                      </motion.div>
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-teal-500 transition-colors">
                        {name}
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <MapPin className="w-3 h-3 text-teal-500 shrink-0" />
                          <span>{area}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                          <Map className="w-3 h-3 text-gray-300 dark:text-gray-600 shrink-0" />
                          <span>{district}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}