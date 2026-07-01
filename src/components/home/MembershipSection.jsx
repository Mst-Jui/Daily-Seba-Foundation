// components/MembershipSection.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Percent, Gift, Headphones, Phone, IdCard, House } from "lucide-react";
import Button from "../reusable/Button";


const benefits = [
  { icon: Percent, key: "membership_benefit1" },
  { icon: Gift, key: "membership_benefit2" },
  { icon: Headphones, key: "membership_benefit3" },
];

function BenefitItem({ icon: Icon, titleKey, descKey, index }) {
  const { t } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex items-start gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-green-500/15 flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-green-400" />
      </div>
      <div>
        <h4 className="font-semibold text-white mb-1">{t(titleKey)}</h4>
        <p className="text-sm text-gray-300 leading-relaxed">{t(descKey)}</p>
      </div>
    </motion.div>
  );
}

function MembershipCardPreview() {
  const { t } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateY: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ rotateY: 4, rotateX: -2, scale: 1.02 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="relative w-full max-w-sm mx-auto"
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 bg-white">
        {/* ── Card top: logo ── */}
        <div className="flex items-center gap-2 px-5 pt-5 pb-3">
          <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
            <House className="w-5 h-5 text-green-400" />
          </div>
          <span className="font-bold text-gray-900 text-sm leading-tight">
            ডেইলি <span className="text-green-500">সেবা</span>
            <br />
            ফাউন্ডেশন
          </span>
        </div>

        {/* ── Card body ── */}
        <div className="relative bg-gray-900 px-5 pt-4 pb-6">
          {/* decorative green diagonal */}
          <div className="absolute top-0 right-0 w-28 h-full bg-gradient-to-bl from-green-400 to-green-600 [clip-path:polygon(45%_0,100%_0,100%_100%,15%_100%)]" />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-900/40 backdrop-blur flex items-center justify-center">
            <House className="w-8 h-8 text-white" />
          </div>

          <p className="relative text-white font-bold text-lg sm:text-xl tracking-wide mb-4">
            {t("membership_card_title")}
          </p>

          <div className="relative space-y-3 max-w-[65%]">
            <div>
              <span className="text-[11px] text-gray-300">{t("membership_card_name_label")}</span>
              <div className="h-7 mt-1 rounded-md bg-green-500/90 flex items-center px-2">
                <span className="text-[11px] text-white/90 truncate">
                  {t("membership_card_name_placeholder")}
                </span>
              </div>
            </div>
            <div>
              <span className="text-[11px] text-gray-300">{t("membership_card_id_label")}</span>
              <div className="h-7 mt-1 rounded-md bg-green-500/90 flex items-center px-2">
                <span className="text-[11px] text-white/90 truncate">
                  {t("membership_card_id_placeholder")}
                </span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center gap-1.5 mt-4 text-white text-xs">
            <Phone className="w-3.5 h-3.5 text-green-400" />
            {t("membership_card_phone")}
          </div>
        </div>
      </div>

      {/* subtle glow */}
      <div className="absolute -inset-4 bg-green-500/20 blur-3xl rounded-full -z-10" />
    </motion.div>
  );
}

export default function MembershipSection() {
  const { t } = useApp();
  const router = useRouter();

  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900">
      {/* decorative radial glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* ── Left: Text + Benefits ── */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-4"
          >
            <span className="text-white">{t("membership_heading_normal")}</span>
            <br />
            <span className="text-green-400">{t("membership_heading_highlight")}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 leading-relaxed mb-8 max-w-md"
          >
            {t("membership_description")}
          </motion.p>

          <div className="space-y-6 mb-8">
            {benefits.map((b, i) => (
              <BenefitItem
                key={b.key}
                icon={b.icon}
                titleKey={`${b.key}_title`}
                descKey={`${b.key}_desc`}
                index={i}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button
              onClick={() => router.push("/membership/register")}
              size="lg"
              variant="primary"
              className="gap-2"
            >
              <IdCard className="w-5 h-5" />
              {t("membership_btn")}
            </Button>
          </motion.div>
        </div>

        {/* ── Right: Card ── */}
        <MembershipCardPreview />
      </div>
    </section>
  );
}