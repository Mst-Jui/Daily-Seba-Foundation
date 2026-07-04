"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ArrowRight } from "lucide-react";
import Button from "@/components/reusable/Button";

function JoinCTABackground() {
  const dots = useMemo(
    () => Array.from({ length: 14 }, (_, i) => ({
      id: i, top: Math.random() * 90 + 5, left: Math.random() * 90 + 5,
      size: Math.random() * 3 + 2, delay: Math.random() * 3,
    })), []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"
      />
      {dots.map((d) => (
        <motion.span key={d.id} className="absolute rounded-full bg-white/40"
          style={{ top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function WorkingAreaJoinCTA() {
  const { t } = useApp();
  const router = useRouter();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-teal-500 px-6 py-10 sm:px-12 sm:py-14 text-center"
      >
        <JoinCTABackground />

        <span className="relative inline-block bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          {t("wa_join_badge")}
        </span>
        <h2 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
          {t("wa_join_heading")}
        </h2>
        <p className="relative text-sm sm:text-base text-blue-50 mb-8 max-w-lg mx-auto">
          {t("wa_join_desc")}
        </p>
        <Button
          onClick={() => router.push("/#dealer_form")}
          size="lg"
          variant="outline"
          className="relative !border-white !text-white hover:!bg-white hover:!text-blue-600 gap-2"
        >
          {t("wa_join_btn")}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </section>
  );
}