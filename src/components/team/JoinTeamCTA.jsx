// components/team/JoinTeamCTA.jsx
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
    <section className="w-full py-16 sm:py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-green-500 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 block">
            {t("join_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("join_heading")}
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
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
              className="rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <card.icon className="w-6 h-6 text-green-500" />
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