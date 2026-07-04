// components/CounterSection.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { MapPin, Users, ShieldCheck } from "lucide-react";

const countersConfig = [
  { value: 50, suffix: "+", labelKey: "counter_district", icon: MapPin },
  { value: 500, suffix: "+", labelKey: "counter_dealer", icon: Users },
  { value: 100, suffix: "%", labelKey: "counter_halal", icon: ShieldCheck },
];

const COUNT_DURATION = 1800;

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
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
      else setValue(target);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [shouldStart, target]);

  return value;
}

function CounterItem({ value, suffix, label, Icon, index }) {
  const [shouldStart, setShouldStart] = useState(false);
  const itemRef = useRef(null);
  const count = useCountUp(value, shouldStart);

  useEffect(() => {
    const node = itemRef.current;
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
      ref={itemRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      className="group relative flex flex-col items-center text-center px-6 py-8 sm:py-10 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-teal-400/0 group-hover:from-blue-500/5 group-hover:to-teal-400/5 transition-all duration-300" />
      <div className="relative mb-4 sm:mb-5 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 shadow-lg shadow-teal-500/25 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.2} />
      </div>
      <div className="relative flex items-start">
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
          {count}
        </span>
        <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-1 sm:mt-2 bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
          {suffix}
        </span>
      </div>
      <p className="relative mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
        {label}
      </p>
      <span className="relative mt-3 h-1 w-10 rounded-full bg-gradient-to-r from-blue-600 to-teal-400 opacity-70 group-hover:w-16 transition-all duration-300" />
    </motion.div>
  );
}

export default function CounterSection() {
  const { t } = useApp();

  return (
    <section className="relative w-full py-14 sm:py-18 md:py-24 bg-slate-50 dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {countersConfig.map((item, index) => (
          <CounterItem
            key={item.labelKey}
            value={item.value}
            suffix={item.suffix}
            label={t(item.labelKey)}
            Icon={item.icon}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}