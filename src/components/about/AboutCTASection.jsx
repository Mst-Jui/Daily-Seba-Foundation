// components/about/AboutCTASection.jsx
"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { HandHeart, IdCard, ArrowRight } from "lucide-react";
import Button from "@/components/reusable/Button";

export default function AboutCTASection() {
  const { t } = useApp();
  const router = useRouter();

  return (
    <section className="w-full py-14 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-10 sm:px-12 sm:py-14 text-center"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-5">
            <HandHeart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>

          <h2 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
            {t("about_cta_heading")}
          </h2>
          <p className="relative text-sm sm:text-base text-green-50 mb-8 max-w-lg mx-auto">
            {t("about_cta_desc")}
          </p>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              onClick={() => router.push("/#dealer_form")}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto gap-2 !border-white !text-white hover:!bg-white hover:!text-green-600"
            >
              {t("about_cta_dealer_btn")}
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => router.push("/membership/register")}
              size="lg"
              variant="primary"
              className="w-full sm:w-auto gap-2 !bg-white !text-green-600 hover:!opacity-90"
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