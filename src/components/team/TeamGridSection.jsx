// components/team/TeamGridSection.jsx
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
      onClick={() => router.push(`/our-team/${member.id}`)}
      // এখানে w-full এবং max-w সেট করে দেওয়া হয়েছে যাতে ফ্লেক্সবক্সে কার্ডগুলো সুন্দর দেখায়
      className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] shadow-sm hover:shadow-xl transition-shadow duration-300 w-full sm:w-[260px] flex-shrink-0"
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
        <p className="text-green-400 text-[10px] sm:text-xs font-medium mb-2 sm:mb-3">
          {t(member.titleKey)}
        </p>
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 w-fit opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {t("team_view_details")}
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-green-500/60 transition-all duration-300" />
    </motion.div>
  );
}

function DepartmentBlock({ dept }) {
  const { t } = useApp();
  const members = teamMembers.filter((m) => m.department === dept.id);

  if (members.length === 0) return null;

  return (
    <div className="mb-16 sm:mb-20 last:mb-0">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-8 sm:mb-10"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
          {t(dept.labelKey)}
        </h2>
        <span className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
      </motion.div>

      {/* এখানে flex, flex-wrap এবং justify-center ব্যবহার করা হয়েছে */}
      <div className="flex flex-wrap justify-center gap-6">
        {members.map((member, i) => (
          <MemberCard key={member.id} member={member} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function TeamGridSection() {
  return (
    <section className="w-full py-14 sm:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        {departments.map((dept) => (
          <DepartmentBlock key={dept.id} dept={dept} />
        ))}
      </div>
    </section>
  );
}