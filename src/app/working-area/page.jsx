// app/working-area/page.jsx
"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Search, MapPin, Users, Map, ArrowRight, X } from "lucide-react";
// import { dealersByDivision } from "@/data/dealerData";
import Button from "@/components/reusable/Button";
import { dealersByDivision } from "../../../data/dealerData";

const totalDealers = dealersByDivision.reduce((s, d) => s + d.dealers.length, 0);
const totalDistricts = dealersByDivision.reduce((s, d) => {
  const districts = new Set(d.dealers.map((dl) => dl.district));
  return s + districts.size;
}, 0);

export default function WorkingAreaPage() {
  const { t } = useApp();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeDiv, setActiveDiv] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q && !activeDiv) return dealersByDivision;
    return dealersByDivision
      .map((div) => ({
        ...div,
        dealers: div.dealers.filter(
          (d) =>
            (!q ||
              d.name.toLowerCase().includes(q) ||
              d.area.toLowerCase().includes(q) ||
              d.district.toLowerCase().includes(q)) &&
            (!activeDiv || div.id === activeDiv)
        ),
      }))
      .filter((div) => div.dealers.length > 0);
  }, [query, activeDiv]);

  const totalFiltered = filtered.reduce((s, d) => s + d.dealers.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle, #22c55e 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-green-500/15 rounded-full blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-green-500/15 text-green-400 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
          >
            {t("wa_hero_badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-5"
          >
            {t("wa_hero_heading")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto mb-10"
          >
            {t("wa_hero_subtitle")}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
          >
            {[
              { icon: Users, value: totalDealers + "+", labelKey: "wa_total_dealers" },
              { icon: Map, value: "৮", labelKey: "wa_total_divisions" },
              { icon: MapPin, value: totalDistricts + "+", labelKey: "wa_total_districts" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
                <stat.icon className="w-5 h-5 text-green-400 mx-auto mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{t(stat.labelKey)}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Search + Division Filter ── */}
      <div className="max-w-6xl mx-auto px-6 py-8 sm:py-10">
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
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 outline-none focus:border-green-500 transition-colors shadow-sm"
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
              ${!activeDiv ? "bg-green-500 text-white" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-300"}`}
          >
            সব বিভাগ
          </button>
          {dealersByDivision.map((div) => (
            <button
              key={div.id}
              onClick={() => setActiveDiv(activeDiv === div.id ? null : div.id)}
              className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200
                ${activeDiv === div.id ? "bg-green-500 text-white" : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-300"}`}
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
            {totalFiltered} {t("wa_dealer_count")} found
          </motion.p>
        )}

        {/* ── Division blocks ── */}
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
                    <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full shrink-0">
                      {div.dealers.length} {t("wa_dealer_count")}
                    </span>
                  </div>

                  {/* Dealer cards grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {div.dealers.map((dealer, i) => (
                      <motion.div
                        key={`${dealer.name}-${i}`}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.35, delay: i * 0.03 }}
                        className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all duration-300"
                      >
                        {/* Avatar initial */}
                        <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-3 shrink-0">
                          <span className="text-green-600 dark:text-green-400 font-bold text-base">
                            {dealer.name.charAt(0)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white leading-snug mb-2">
                          {dealer.name}
                        </h3>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin className="w-3 h-3 text-green-500 shrink-0" />
                            <span>{dealer.area}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                            <Map className="w-3 h-3 text-gray-300 dark:text-gray-600 shrink-0" />
                            <span>{dealer.district}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Join CTA ── */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-10 sm:px-12 sm:py-14 text-center"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          <span className="relative inline-block bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            {t("wa_join_badge")}
          </span>
          <h2 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
            {t("wa_join_heading")}
          </h2>
          <p className="relative text-sm sm:text-base text-green-50 mb-8 max-w-lg mx-auto">
            {t("wa_join_desc")}
          </p>
          <Button
            onClick={() => router.push("/#dealer_form")}
            size="lg"
            variant="outline"
            className="relative !border-white !text-white hover:!bg-white hover:!text-green-600 gap-2"
          >
            {t("wa_join_btn")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </section>
    </div>
  );
}