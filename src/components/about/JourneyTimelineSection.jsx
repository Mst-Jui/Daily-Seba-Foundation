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
    <section className="relative w-full py-14 sm:py-20 md:py-24 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 bg-teal-400/5 dark:bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {t("journey_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            {t("journey_heading")}
          </h2>
        </motion.div>

        {/* ── Horizontal connected milestone path (desktop), vertical (mobile) ── */}
        <div className="relative">
          <div className="hidden md:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-blue-500/0 via-teal-400/40 to-blue-500/0" />
          <div className="md:hidden absolute top-0 bottom-0 left-7 w-px bg-gray-200 dark:bg-gray-700" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 md:gap-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.key}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.15 + 0.1 }}
                  className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white dark:bg-gray-900 border-2 border-transparent flex items-center justify-center shrink-0 md:mb-5 shadow-md shadow-blue-500/10"
                  style={{
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(to right, #2563eb, #2dd4bf)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  <m.icon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500" />
                </motion.span>
                <div>
                  <p className="text-xs font-semibold tracking-wide mb-1 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
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