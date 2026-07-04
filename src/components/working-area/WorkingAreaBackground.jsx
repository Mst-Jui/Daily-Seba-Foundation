"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";

export default function WorkingAreaBackground() {
  const stars = useMemo(
    () => Array.from({ length: 45 }, (_, i) => ({
      id: i, top: Math.random() * 100, left: Math.random() * 100,
      size: Math.random() * 2 + 1, delay: Math.random() * 4, duration: Math.random() * 2 + 2,
    })), []
  );
  const dots = useMemo(
    () => Array.from({ length: 20 }, (_, i) => ({
      id: i, top: Math.random() * 90 + 5, left: Math.random() * 90 + 5,
      size: Math.random() * 3 + 2, delay: Math.random() * 3,
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
        transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[550px] h-[550px] sm:w-[750px] sm:h-[750px] rounded-full opacity-40"
        style={{ background: "conic-gradient(from 0deg, rgba(37,99,235,0.25), rgba(45,212,191,0.2), transparent, rgba(37,99,235,0.2), transparent)" }}
      />

      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[350px] sm:h-[400px] bg-blue-500/15 rounded-full blur-[100px]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-10 sm:top-14 left-8 sm:left-16 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-teal-100 to-teal-300 shadow-[0_0_40px_14px_rgba(45,212,191,0.3)]"
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

      {dots.map((d) => (
        <motion.span key={d.id} className="absolute rounded-full bg-teal-400/50 hidden sm:block"
          style={{ top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size }}
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
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