// components/CounterSection.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";

const countersConfig = [
  { value: 50, suffix: "+", labelKey: "counter_district" },
  { value: 500, suffix: "+", labelKey: "counter_dealer" },
  { value: 100, suffix: "%", labelKey: "counter_halal" },
];

const COUNT_DURATION = 1800; // ms

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
      // ease-out cubic — শুরুতে দ্রুত, শেষে ধীরে গিয়ে থামে
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

function CounterItem({ value, suffix, label }) {
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
    <div ref={itemRef} className="flex flex-col items-center text-center">
      <div className="flex items-start">
        <span className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-white tabular-nums">
          {count}
        </span>
        <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mt-1 sm:mt-2">
          {suffix}
        </span>
      </div>
      <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
        {label}
      </p>
    </div>
  );
}

export default function CounterSection() {
  const { t } = useApp();

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
        {countersConfig.map((item) => (
          <CounterItem
            key={item.labelKey}
            value={item.value}
            suffix={item.suffix}
            label={t(item.labelKey)}
          />
        ))}
      </div>
    </section>
  );
}