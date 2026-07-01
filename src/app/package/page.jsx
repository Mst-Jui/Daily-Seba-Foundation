// components/PackageSection.jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight, Check } from "lucide-react";
import Button from "@/components/reusable/Button";


const packagesConfig = [
  { prefix: "package1", featured: false },
  { prefix: "package2", featured: true },
  { prefix: "package3", featured: false },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

function PackageCard({ config, index, isSelected, onSelect }) {
  const { t } = useApp();
  const router = useRouter();
  const p = config.prefix;
  const items = t(`${p}_items`);
  const itemList = Array.isArray(items) ? items : [];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      onClick={() => onSelect(p)}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300
        ${
          isSelected
            ? "border-2 border-green-500 shadow-xl shadow-green-500/15 ring-4 ring-green-100 dark:ring-green-900/30"
            : "border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg"
        }
        bg-white dark:bg-gray-800`}
    >
      {config.featured && (
        <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-xs font-semibold text-center py-1.5 tracking-wide z-10">
          {t("package_table_item") === "Item Name" ? "MOST POPULAR" : "জনপ্রিয়"}
        </div>
      )}

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-green-500 flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-white" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <div
        className={`flex flex-col items-center text-center px-6 pt-8 pb-5 ${
          config.featured ? "mt-6" : ""
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-3">
          <ShoppingBag className="w-6 h-6 text-green-500" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
          {t(`${p}_name`)}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {t("package_project")}
        </p>
      </div>

      {/* ── Item Table ── */}
      <div className="flex-1 px-6">
        <div className="border-t border-gray-100 dark:border-gray-700" />
        <div className="py-4 max-h-64 overflow-y-auto pr-1">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700">
                <th className="text-left font-medium pb-2 w-8">{t("package_table_sl")}</th>
                <th className="text-left font-medium pb-2">{t("package_table_item")}</th>
                <th className="text-right font-medium pb-2 whitespace-nowrap">
                  {t("package_table_price")}
                </th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-50 dark:border-gray-700/50 last:border-0"
                >
                  <td className="py-2 text-gray-400 dark:text-gray-500">{i + 1}</td>
                  <td className="py-2 text-gray-700 dark:text-gray-300">
                    {item.name}
                    <span className="text-gray-400 dark:text-gray-500"> ({item.qty})</span>
                  </td>
                  <td className="py-2 text-right font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Total & Discount ── */}
      <div className="px-6 pb-6" onClick={(e) => e.stopPropagation()}>
        <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t("package_total")}
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {t(`${p}_total`)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {t("package_discount_phase1")}
            </span>
            <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
              {t(`${p}_discount1`)}
            </span>
          </div>

          {t(`${p}_discount2`) !== `${p}_discount2` && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t("package_discount_phase2")}
              </span>
              <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                {t(`${p}_discount2`)}
              </span>
            </div>
          )}

          {t(`${p}_savings`) !== `${p}_savings` && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t("package_your_savings")}
              </span>
              <span className="text-xs font-bold text-white bg-green-500 px-2 py-0.5 rounded-full">
                {t(`${p}_savings`)}
              </span>
            </div>
          )}
        </div>

        <Button
          onClick={() => router.push(`/package/${p}`)}
          size="md"
          variant={isSelected ? "primary" : "outline"}
          className="w-full mt-5 gap-2"
        >
          {t("package_cta")}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

export default function PackageSection() {
  const { t } = useApp();
  const [selected, setSelected] = useState("package2");

  return (
    <section className="w-full py-14 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t("package_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {t("package_heading_normal")}{" "}
            <span className="text-green-500">{t("package_heading_highlight")}</span>{" "}
            {t("package_heading_end")}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-2">
            {t("package_subtitle")}
          </p>
        </motion.div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
          {packagesConfig.map((pkg, i) => (
            <PackageCard
              key={pkg.prefix}
              config={pkg}
              index={i}
              isSelected={selected === pkg.prefix}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>
    </section>
  );
}