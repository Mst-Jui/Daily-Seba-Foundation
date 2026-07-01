// app/package/[id]/page.jsx
"use client";
import { useApp } from "@/context/AppContext";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, CheckCircle2 } from "lucide-react";


const validPackages = ["package1", "package2", "package3"];

export default function PackageDetailPage() {
  const { t } = useApp();
  const router = useRouter();
  const params = useParams();
  const p = validPackages.includes(params.id) ? params.id : "package1";

  const items = t(`${p}_items`);
  const itemList = Array.isArray(items) ? items : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-10 sm:py-16">
        {/* ── Back Button ── */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("package_back")}
        </motion.button>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 sm:p-10 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {t(`${p}_name`)}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t("package_project")}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">{t("package_total")}</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-500">
                {t(`${p}_total`)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Item Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden mb-8"
        >
          <div className="px-6 sm:px-8 pt-6 pb-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              {t("package_includes")}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t("package_detail_subtitle")}
            </p>
          </div>

          <table className="w-full text-sm mt-4">
            <thead>
              <tr className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-700">
                <th className="text-left font-medium py-3 px-6 sm:px-8 w-12">
                  {t("package_table_sl")}
                </th>
                <th className="text-left font-medium py-3 px-3">{t("package_table_item")}</th>
                <th className="text-left font-medium py-3 px-3">{t("package_table_qty")}</th>
                <th className="text-right font-medium py-3 px-6 sm:px-8">
                  {t("package_table_price")}
                </th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.25 + i * 0.04 }}
                  className="border-b border-gray-50 dark:border-gray-700/50 last:border-0"
                >
                  <td className="py-3 px-6 sm:px-8 text-gray-400 dark:text-gray-500">
                    {i + 1}
                  </td>
                  <td className="py-3 px-3 text-gray-800 dark:text-gray-200 font-medium">
                    {item.name}
                  </td>
                  <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{item.qty}</td>
                  <td className="py-3 px-6 sm:px-8 text-right font-semibold text-gray-900 dark:text-white">
                    {item.price}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* ── Discount Summary ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 sm:p-8 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {t("package_discount_phase1")}
              </span>
              <span className="text-base font-bold text-green-600">
                {t(`${p}_discount1`)}
              </span>
            </div>

            {t(`${p}_discount2`) !== `${p}_discount2` && (
              <div className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/40">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {t("package_discount_phase2")}
                </span>
                <span className="text-base font-bold text-green-600">
                  {t(`${p}_discount2`)}
                </span>
              </div>
            )}

            {t(`${p}_savings`) !== `${p}_savings` && (
              <div className="flex flex-col gap-1 p-4 rounded-xl bg-green-500">
                <span className="text-xs text-green-50">{t("package_your_savings")}</span>
                <span className="text-base font-bold text-white">
                  {t(`${p}_savings`)}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
        
        </motion.div>
      </div>
    </div>
  );
}