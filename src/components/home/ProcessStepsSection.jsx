"use client";
import { useMemo } from "react";
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

function ProcessBackground() {
  const stars = useMemo(
    () => Array.from({ length: 40 }, (_, i) => ({
      id: i, top: Math.random() * 100, left: Math.random() * 100,
      size: Math.random() * 2 + 1, delay: Math.random() * 4, duration: Math.random() * 2 + 2,
    })), []
  );
  const boxes = useMemo(
    () => Array.from({ length: 7 }, (_, i) => ({
      id: i, top: Math.random() * 85 + 5, left: Math.random() * 92 + 4,
      size: Math.random() * 16 + 12, delay: Math.random() * 5, duration: Math.random() * 6 + 8,
      rotate: Math.random() * 40 - 20,
    })), []
  );
  const circles = useMemo(
    () => Array.from({ length: 6 }, (_, i) => ({
      id: i, top: Math.random() * 85 + 5, left: Math.random() * 92 + 4,
      size: Math.random() * 10 + 6, delay: Math.random() * 5, duration: Math.random() * 5 + 6,
    })), []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1224] via-[#0f1b38] to-[#0a1220]" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full opacity-40"
        style={{ background: "conic-gradient(from 0deg, rgba(37,99,235,0.25), rgba(45,212,191,0.2), transparent, rgba(37,99,235,0.2), transparent)" }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]"
      />
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] h-[300px] bg-teal-400/10 rounded-full blur-[100px]" />
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-8 right-8 sm:right-16 w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-teal-100 to-teal-300 shadow-[0_0_40px_14px_rgba(45,212,191,0.3)]"
      >
        <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-teal-400/40" />
        <div className="absolute bottom-2 right-2.5 w-2 h-2 rounded-full bg-teal-400/30" />
      </motion.div>
      {stars.map((s) => (
        <motion.span key={s.id} className="absolute rounded-full bg-white"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {circles.map((c) => (
        <motion.div key={c.id}
          animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full border border-teal-400/30 hidden sm:block"
          style={{ top: `${c.top}%`, left: `${c.left}%`, width: c.size, height: c.size }}
        />
      ))}
      {boxes.map((b) => (
        <motion.div key={b.id}
          animate={{ y: [0, -18, 0], rotate: [b.rotate, b.rotate + 15, b.rotate] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-md border border-white/10 bg-white/[0.03] backdrop-blur-sm hidden sm:block"
          style={{ top: `${b.top}%`, left: `${b.left}%`, width: b.size, height: b.size }}
        />
      ))}
    </div>
  );
}

export default function ProcessStepsSection() {
  const { t } = useApp();
  const router = useRouter();
  return (
    <section className="relative w-full py-14 sm:py-20 md:py-24 overflow-hidden">
      <ProcessBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-20"
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
            {t("process_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {t("process_heading")}
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            style={{ originX: 0 }}
            className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-blue-500/0 via-teal-400/50 to-blue-500/0"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative z-10 text-center"
            >
              <div className="relative z-10 inline-flex items-center justify-center mb-6">
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: i * 0.15 + 0.3 }}
                  className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 text-white text-xs font-bold flex items-center justify-center shadow-md shadow-teal-500/30"
                >
                  {i + 1}
                </motion.span>
                <motion.span
                  whileHover={{ rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center"
                >
                  <step.icon className="w-7 h-7 text-teal-400" />
                </motion.span>
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
          className="flex justify-center mt-12 sm:mt-14 md:mt-16"
        >
          <Button onClick={() => router.push("/#dealer_form")} size="lg" variant="primary" className="gap-2">
            {t("process_cta")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}