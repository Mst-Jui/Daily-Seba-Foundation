"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { ArrowUpRight } from "lucide-react";
import { departments, teamMembers } from "../../../data/teamData";

function MemberCard({ member, index }) {
  const { t } = useApp();
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      onClick={() => router.push(`/our-team/${member.id}`)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 w-full sm:w-[220px] md:w-[240px] lg:w-[260px] flex-shrink-0"
    >
      <img
        src={member.image}
        alt={member.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
        <h3 className="text-white font-semibold text-xs sm:text-sm leading-snug">
          {member.name}
        </h3>
        <p className="text-teal-300 text-[10px] sm:text-xs font-medium mb-2 sm:mb-3">
          {t(member.titleKey)}
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 w-fit opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {t("team_view_details")}
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-teal-400/60 transition-all duration-300" />
    </motion.div>
  );
}

function DepartmentBlock({ dept }) {
  const { t } = useApp();
  const members = teamMembers.filter((m) => m.department === dept.id);
  if (members.length === 0) return null;
  return (
    <div className="mb-14 sm:mb-18 md:mb-20 last:mb-0">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-7 sm:mb-9 md:mb-10"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
          {t(dept.labelKey)}
        </h2>
        <span className="flex-1 h-px bg-gradient-to-r from-blue-500/0 via-teal-400/40 to-blue-500/0" />
      </motion.div>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-5 md:gap-6">
        {members.map((member, i) => (
          <MemberCard key={member.id} member={member} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function TeamGridSection() {
  return (
    <section className="relative w-full py-14 sm:py-20 md:py-24 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 bg-teal-400/5 dark:bg-teal-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {departments.map((dept) => (
          <DepartmentBlock key={dept.id} dept={dept} />
        ))}
      </div>
    </section>
  );
}