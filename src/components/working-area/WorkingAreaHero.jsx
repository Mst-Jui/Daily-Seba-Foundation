"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { MapPin, Users, Map } from "lucide-react";
import WorkingAreaBackground from "./WorkingAreaBackground";
import { toBnDigits } from "@/lib/numberFormat";

const COUNT_DURATION = 1500;

function useCountUp(target, shouldStart) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) return;
    const animate = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldStart, target]);

  return value;
}

function StatCard({ stat }) {
  const { t, lang } = useApp();
  const [shouldStart, setShouldStart] = useState(false);
  const cardRef = useRef(null);

  const numericValue = parseInt(String(stat.value).replace(/[^\d]/g, ""), 10) || 0;
  const suffix = String(stat.value).replace(/[\d]/g, "");

  const count = useCountUp(numericValue, shouldStart);
  const displayCount = lang === "bn" ? toBnDigits(count) : count;
  const displaySuffix = suffix; // "+" ভাষা-নিরপেক্ষ, অপরিবর্তিত থাকবে

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -4, scale: 1.03 }}
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-3 sm:p-4 transition-colors duration-300 hover:border-teal-400/40"
    >
      <stat.icon className="w-5 h-5 text-teal-400 mx-auto mb-2" />
      <p className="text-lg sm:text-xl md:text-2xl font-bold text-white tabular-nums">
        {displayCount}
        {displaySuffix}
      </p>
      <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{t(stat.labelKey)}</p>
    </motion.div>
  );
}

export default function WorkingAreaHero({ totalDealers, totalDistricts }) {
  const { t } = useApp();

  const stats = [
    { icon: Users, value: totalDealers + "+", labelKey: "wa_total_dealers" },
    { icon: Map, value: "8", labelKey: "wa_total_divisions" },
    { icon: MapPin, value: totalDistricts + "+", labelKey: "wa_total_districts" },
  ];

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden">
      <WorkingAreaBackground />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block bg-gradient-to-r from-blue-600/20 to-teal-400/20 border border-teal-400/30 text-teal-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
        >
          {t("wa_hero_badge")}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-5"
        >
          {t("wa_hero_heading")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto mb-10"
        >
          {t("wa_hero_subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto"
        >
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}