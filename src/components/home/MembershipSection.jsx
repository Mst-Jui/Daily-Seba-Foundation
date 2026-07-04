"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Percent, Gift, Headphones, Phone, IdCard, House } from "lucide-react";
import Button from "../reusable/Button";

const benefits = [
  { icon: Percent, key: "membership_benefit1" },
  { icon: Gift, key: "membership_benefit2" },
  { icon: Headphones, key: "membership_benefit3" },
];

const CYCLE_DURATION = 8000;

function SkyBackground() {
  const [isNight, setIsNight] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setIsNight((prev) => !prev), CYCLE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        top: Math.random() * 90,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      })),
    []
  );

  const boxes = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: Math.random() * 80 + 5,
        left: Math.random() * 90 + 5,
        size: Math.random() * 18 + 14,
        delay: Math.random() * 4,
        duration: Math.random() * 6 + 8,
        rotate: Math.random() * 40 - 20,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{
          background: isNight
            ? "linear-gradient(135deg, #0b1224 0%, #0f1b38 45%, #0a1220 100%)"
            : "linear-gradient(135deg, #0e2a4a 0%, #14406b 45%, #0b1f3a 100%)",
        }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute inset-0"
      />

      <div className="absolute top-8 sm:top-10 right-6 sm:right-16 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28">
        <AnimatePresence mode="wait">
          {isNight ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, y: -30, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.7 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="relative w-full h-full rounded-full bg-gradient-to-br from-teal-100 to-teal-300 shadow-[0_0_60px_20px_rgba(45,212,191,0.35)]"
            >
              <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-teal-400/40" />
              <div className="absolute bottom-4 right-5 w-4 h-4 rounded-full bg-teal-400/30" />
              <div className="absolute top-8 right-3 w-2 h-2 rounded-full bg-teal-400/30" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, y: -30, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.7 }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="relative w-full h-full rounded-full bg-gradient-to-br from-yellow-200 via-orange-300 to-amber-400 shadow-[0_0_70px_26px_rgba(251,191,36,0.4)]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full border border-dashed border-amber-300/30"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isNight &&
          stars.map((s) => (
            <motion.span
              key={s.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.2, 0.8] }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" },
                scale: { duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute rounded-full bg-white"
              style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
            />
          ))}
      </AnimatePresence>

      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-[128px]"
        style={{ background: isNight ? "rgba(37,99,235,0.2)" : "rgba(251,191,36,0.12)" }}
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-0 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full blur-[128px]"
        style={{ background: isNight ? "rgba(20,184,166,0.1)" : "rgba(20,184,166,0.15)" }}
      />

      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-[15%] w-3 h-3 rounded-full border border-teal-400/40 hidden sm:block"
      />
      <motion.div
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/3 w-5 h-5 rounded-full border border-blue-400/30 hidden sm:block"
      />

      {boxes.map((b) => (
        <motion.div
          key={b.id}
          animate={{ y: [0, -20, 0], rotate: [b.rotate, b.rotate + 15, b.rotate] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-md border border-white/10 bg-white/[0.03] backdrop-blur-sm hidden sm:block"
          style={{ top: `${b.top}%`, left: `${b.left}%`, width: b.size, height: b.size }}
        />
      ))}
    </div>
  );
}

export default function MembershipSection() {
  const { t } = useApp();
  const router = useRouter();

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-slate-900">
      <SkyBackground />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          <div className="text-white text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6"
            >
              {t("membership_heading_normal")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
                {t("membership_heading_highlight")}
              </span>
            </motion.h2>

            <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 leading-relaxed">
              {t("membership_description")}
            </p>

            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10 flex flex-col items-center lg:items-start">
              {benefits.map((b) => (
                <div key={b.key} className="flex items-center gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <b.icon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
                  </div>
                  <span className="text-slate-200 font-medium text-sm sm:text-base">{t(`${b.key}_title`)}</span>
                </div>
              ))}
            </div>

            <Button
              onClick={() => router.push("/membership/register")}
              className="h-12 sm:h-14 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-teal-500 hover:scale-105 transition-transform"
            >
              {t("membership_btn")} <IdCard className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          <motion.div
            whileHover={{ y: -10 }}
            className="relative p-1 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-b from-slate-700 to-slate-900 shadow-2xl max-w-sm mx-auto lg:max-w-none w-full"
          >
            <div className="relative bg-slate-900 rounded-[1.9rem] sm:rounded-[2.4rem] p-6 sm:p-8 overflow-hidden">
              <div className="flex justify-between items-center mb-8 sm:mb-10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <House className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span className="font-bold text-white text-sm sm:text-base">ডেইলি সেবা</span>
                </div>
                <div className="w-10 h-7 sm:w-12 sm:h-8 border border-slate-700 rounded-lg flex items-center justify-center">
                  <div className="w-5 h-3.5 sm:w-6 sm:h-4 bg-teal-500/20 rounded-sm"></div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="text-[10px] uppercase tracking-widest text-slate-500">{t("membership_card_name_label")}</div>
                <div className="text-white text-base sm:text-lg font-bold">{t("membership_card_name_placeholder")}</div>

                <div className="h-px bg-slate-800 my-5 sm:my-6"></div>

                <div className="text-[10px] uppercase tracking-widest text-slate-500">{t("membership_card_id_label")}</div>
                <div className="text-teal-400 text-xl sm:text-2xl font-mono font-bold">{t("membership_card_id_placeholder")}</div>
              </div>

              <div className="mt-8 sm:mt-10 flex items-center gap-2 text-slate-600 text-xs sm:text-sm">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {t("membership_card_phone")}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}