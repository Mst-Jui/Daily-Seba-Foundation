"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Users, Briefcase, Headset, ArrowRight } from "lucide-react";
import Button from "@/components/reusable/Button";

const departmentCards = [
  { icon: Users, key: "hr" },
  { icon: Briefcase, key: "marketing" },
  { icon: Headset, key: "callcenter" },
];

export default function JoinTeamCTA() {
  const { t } = useApp();
  const router = useRouter();
  return (
    <section className="relative w-full py-14 sm:py-20 md:py-24 bg-gray-50 dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 w-80 h-80 bg-teal-400/5 dark:bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {t("join_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t("join_heading")}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400">
            {t("join_subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {departmentCards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 sm:p-6 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-teal-400 flex items-center justify-center mb-4 shadow-md shadow-teal-500/25">
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                {t(`join_${card.key}_title`)}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {t(`join_${card.key}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center"
        >
          <Button
            onClick={() => router.push("/contact")}
            size="lg"
            variant="primary"
            className="gap-2"
          >
            {t("join_cta")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}