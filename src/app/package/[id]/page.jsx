"use client";
import { useApp } from "@/context/AppContext";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, CheckCircle2 } from "lucide-react";
import Button from "@/components/reusable/Button"; // আপনার প্রিমিয়াম বাটন

const validPackages = ["package1", "package2", "package3"];

export default function PackageDetailPage() {
  const { t } = useApp();
  const router = useRouter();
  const params = useParams();
  const p = validPackages.includes(params.id) ? params.id : "package1";

  const items = t(`${p}_items`);
  const itemList = Array.isArray(items) ? items : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black py-10 sm:py-20 px-6 transition-colors duration-500">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" /> {t("package_back")}
        </motion.button>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-800 mb-8 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <ShoppingBag className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{t(`${p}_name`)}</h1>
                <p className="text-slate-500">{t("package_project")}</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-slate-400 text-sm uppercase tracking-wider">{t("package_total")}</p>
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
                {t(`${p}_total`)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 mb-8"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
            <CheckCircle2 className="text-teal-500" /> {t("package_includes")}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-4 font-semibold">{t("package_table_sl")}</th>
                  <th className="pb-4 font-semibold">{t("package_table_item")}</th>
                  <th className="pb-4 font-semibold">{t("package_table_qty")}</th>
                  <th className="pb-4 font-semibold text-right">{t("package_table_price")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {itemList.map((item, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 text-slate-400 font-medium">{i + 1}</td>
                    <td className="py-4 font-medium text-slate-700 dark:text-slate-200">{item.name}</td>
                    <td className="py-4 text-slate-500">{item.qty}</td>
                    <td className="py-4 text-right font-bold text-slate-900 dark:text-white">{item.price}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Discount Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
        >
          <div className="flex flex-col gap-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t("package_discount_phase1")}</span>
            <span className="text-lg font-bold text-teal-400">{t(`${p}_discount1`)}</span>
          </div>

          {t(`${p}_discount2`) !== `${p}_discount2` && (
            <div className="flex flex-col gap-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t("package_discount_phase2")}</span>
              <span className="text-lg font-bold text-teal-400">{t(`${p}_discount2`)}</span>
            </div>
          )}

          {t(`${p}_savings`) !== `${p}_savings` && (
            <div className="flex flex-col gap-1 p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-400 shadow-lg shadow-teal-500/20">
              <span className="text-xs text-white/90 font-medium">{t("package_your_savings")}</span>
              <span className="text-lg font-bold text-white">{t(`${p}_savings`)}</span>
            </div>
          )}
        </motion.div>

        {/* CTA Button */}

      </div>
    </div>
  );
}