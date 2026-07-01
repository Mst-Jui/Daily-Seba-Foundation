// components/about/JourneyTimelineSection.jsx
"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Flag, Users2, Building2, Sparkles } from "lucide-react";

const milestones = [
  { icon: Flag, key: "journey_m1" },
  { icon: Users2, key: "journey_m2" },
  { icon: Building2, key: "journey_m3" },
  { icon: Sparkles, key: "journey_m4" },
];

export default function JourneyTimelineSection() {
  const { t } = useApp();

  return (
    <section className="w-full py-16 sm:py-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-20"
        >
          <span className="text-green-500 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 block">
            {t("journey_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            {t("journey_heading")}
          </h2>
        </motion.div>

        {/* ── Horizontal connected milestone path (desktop), vertical (mobile) ── */}
        <div className="relative">
          {/* connecting line - desktop horizontal */}
          <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-gray-200 dark:bg-gray-700" />
          {/* connecting line - mobile vertical */}
          <div className="md:hidden absolute top-0 bottom-0 left-7 w-px bg-gray-200 dark:bg-gray-700" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center"
              >
                <span className="relative z-10 w-14 h-14 rounded-full bg-white dark:bg-gray-900 border-2 border-green-500 flex items-center justify-center shrink-0 md:mb-5">
                  <m.icon className="w-6 h-6 text-green-500" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-green-500 tracking-wide mb-1">
                    {t(`${m.key}_year`)}
                  </p>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-1.5">
                    {t(`${m.key}_title`)}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed md:max-w-[200px] md:mx-auto">
                    {t(`${m.key}_desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}