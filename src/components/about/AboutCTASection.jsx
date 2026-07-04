"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { HandHeart, IdCard, ArrowRight } from "lucide-react";
import Button from "@/components/reusable/Button";

function CTABackground() {
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
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white/40"
          style={{ top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function AboutCTASection() {
  const { t } = useApp();
  const router = useRouter();
  return (
    <section className="w-full py-14 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-teal-500 px-6 py-10 sm:px-12 sm:py-14 text-center"
        >
          <CTABackground />

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-5"
          >
            <HandHeart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </motion.div>
          <h2 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
            {t("about_cta_heading")}
          </h2>
          <p className="relative text-sm sm:text-base text-blue-50 mb-8 max-w-lg mx-auto">
            {t("about_cta_desc")}
          </p>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => router.push("/#dealer_form")}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 !border-white !text-white hover:!bg-white hover:!text-blue-600"
            >
              {t("about_cta_dealer_btn")}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => router.push("/membership/register")}
              size="lg"
              variant="primary"
              className="w-full sm:w-auto gap-2 !bg-white !text-white hover:!opacity-90"
            >
              <IdCard className="w-4 h-4" />
              {t("about_cta_membership_btn")}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}