// components/home/ProcessStepsSection.jsx
"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { FileText, UserCheck, PackageCheck, ArrowRight } from "lucide-react";
import Button from "@/components/reusable/Button";

const steps = [
  { icon: FileText, key: "process_step1" },
  { icon: UserCheck, key: "process_step2" },
  { icon: PackageCheck, key: "process_step3" },
];

export default function ProcessStepsSection() {
  const { t } = useApp();
  const router = useRouter();

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gray-950 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-500/10 rounded-full blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-20"
        >
          <span className="text-green-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 block">
            {t("process_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {t("process_heading")}
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {/* connecting line desktop */}
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-green-500/0 via-green-500/40 to-green-500/0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative inline-flex items-center justify-center mb-6">
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-green-400" />
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                {t(`${step.key}_title`)}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                {t(`${step.key}_desc`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center mt-14 sm:mt-16"
        >
          <Button
            onClick={() => router.push("/#dealer_form")}
            size="lg"
            variant="primary"
            className="gap-2"
          >
            {t("process_cta")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}