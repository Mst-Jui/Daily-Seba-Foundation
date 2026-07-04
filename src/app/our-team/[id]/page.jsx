"use client";
import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { ArrowLeft, Phone, Mail, Building2, BadgeCheck, Briefcase, ChevronDown } from "lucide-react";
import Button from "@/components/reusable/Button";
import { teamMembers, departments } from "../../../../data/teamData";

// ── Decorative animated space-theme hero background ──
function HeroBackground() {
  const stars = useMemo(
    () => Array.from({ length: 25 }, (_, i) => ({
      id: i, top: Math.random() * 100, left: Math.random() * 100,
      size: Math.random() * 2 + 1, delay: Math.random() * 3, duration: Math.random() * 2 + 2,
    })), []
  );
  const boxes = useMemo(
    () => Array.from({ length: 5 }, (_, i) => ({
      id: i, top: Math.random() * 80 + 5, left: Math.random() * 90 + 5,
      size: Math.random() * 14 + 10, delay: Math.random() * 4, duration: Math.random() * 6 + 6,
      rotate: Math.random() * 40 - 20,
    })), []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-500" />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-2xl"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl"
      />
      {stars.map((s) => (
        <motion.span key={s.id} className="absolute rounded-full bg-white"
          style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {boxes.map((b) => (
        <motion.div key={b.id}
          animate={{ y: [0, -14, 0], rotate: [b.rotate, b.rotate + 12, b.rotate] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-md border border-white/20 bg-white/5 backdrop-blur-sm hidden sm:block"
          style={{ top: `${b.top}%`, left: `${b.left}%`, width: b.size, height: b.size }}
        />
      ))}
    </div>
  );
}

export default function TeamMemberDetailPage() {
  const { t } = useApp();
  const router = useRouter();
  const params = useParams();
  const [bioExpanded, setBioExpanded] = useState(false);

  const member = teamMembers.find((m) => m.id === params.id);

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6 text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Member not found.</p>
        <Button onClick={() => router.push("/our-team")} size="md" variant="primary">
          {t("team_back")}
        </Button>
      </div>
    );
  }

  const dept = departments.find((d) => d.id === member.department);
  const memberTitle = t(member.titleKey);
  const bioText = t(member.bioKey);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ── Hero strip ── */}
      <div className="relative h-40 sm:h-52 md:h-56 overflow-hidden">
        <HeroBackground />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-5">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => router.push("/our-team")}
            className="absolute top-5 sm:top-6 left-4 sm:left-6 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("team_back")}
          </motion.button>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full"
          >
            <Building2 className="w-3.5 h-3.5" />
            {t(dept?.labelKey)}
          </motion.span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-16 pb-16 sm:pb-24 md:pb-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-6 lg:gap-10">
          {/* ── Left: Photo + contact card ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="lg:sticky lg:top-24">
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-4 ring-teal-500/40 aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h1 className="text-white font-bold text-lg sm:text-xl leading-snug">
                    {member.name}
                  </h1>
                  <p className="text-teal-300 text-sm font-medium">{memberTitle}</p>
                </div>
              </div>

              {/* quick contact card */}
              <div className="mt-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 sm:p-5 space-y-3">
                <a
                  href={`tel:${member.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-teal-500 transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600/15 to-teal-400/15 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-teal-500" />
                  </span>
                  {member.phone}
                </a>

                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-teal-500 transition-colors break-all"
                >
                  <span className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600/15 to-teal-400/15 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-teal-500" />
                  </span>
                  {member.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Details ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-4 lg:pt-20"
          >
            {/* meta badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-400/10 border border-teal-500/20 rounded-full px-4 py-2 text-xs sm:text-sm">
                <Briefcase className="w-4 h-4 text-teal-500" />
                <span className="text-gray-500 dark:text-gray-400">
                  {t("team_department_label")}:
                </span>
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  {t(dept?.labelKey)}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-400/10 border border-teal-500/20 rounded-full px-4 py-2 text-xs sm:text-sm">
                <BadgeCheck className="w-4 h-4 text-teal-500" />
                <span className="text-gray-500 dark:text-gray-400">
                  {t("team_role_label")}:
                </span>
                <span className="font-semibold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  {memberTitle}
                </span>
              </span>
            </div>

            {/* bio card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-l-4 border-l-teal-500 p-5 sm:p-6 md:p-8">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                {t("team_about_label")}
              </h2>

              <motion.p
                initial={false}
                animate={{ height: "auto" }}
                className={`text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed ${
                  bioExpanded ? "" : "line-clamp-1"
                }`}
              >
                {bioText}
              </motion.p>

              <button
                onClick={() => setBioExpanded((p) => !p)}
                className="inline-flex items-center gap-1 mt-3 text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                {bioExpanded ? (t("team_see_less") || "Show less") : (t("team_see_more") || "See more")}
                <motion.span
                  animate={{ rotate: bioExpanded ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex"
                >
                  <ChevronDown className="w-3.5 h-3.5 text-teal-500" />
                </motion.span>
              </button>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button
                href={`mailto:${member.email}`}
                size="md"
                variant="primary"
                className="gap-2"
              >
                <Mail className="w-4 h-4" />
                {t("team_contact")} {member.name.split(" ")[0]}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}