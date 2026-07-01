// app/our-team/[id]/page.jsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { ArrowLeft, Phone, Mail, Building2, BadgeCheck, Briefcase } from "lucide-react";
// import { teamMembers, departments } from "@/data/teamData";
import Button from "@/components/reusable/Button";
import { teamMembers, departments } from "../../../../data/teamData";

export default function TeamMemberDetailPage() {
  const { t } = useApp();
  const router = useRouter();
  const params = useParams();

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ── Green hero strip ── */}
      <div className="relative h-40 sm:h-52 bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />

        <div className="relative max-w-5xl mx-auto px-6 h-full flex items-end pb-5">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => router.push("/our-team")}
            className="absolute top-5 sm:top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
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

      <div className="max-w-5xl mx-auto px-6 -mt-14 sm:-mt-16 pb-20 sm:pb-28 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-6 lg:gap-10">
          {/* ── Left: Photo + contact card ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="sticky top-24">
              <div className="relative rounded-2xl overflow-hidden shadow-xl ring-4 ring-green-500/40 aspect-[3/4]">
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
                  <p className="text-green-400 text-sm font-medium">{memberTitle}</p>
                </div>
              </div>

              {/* quick contact card */}
              <div className="mt-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 space-y-3">
                <a
                  href={`tel:${member.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
                >
                  <span className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-green-500" />
                  </span>
                  {member.phone}
                </a>
                
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors break-all"
                >
                  <span className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-green-500" />
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
              <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-full px-4 py-2 text-xs sm:text-sm">
                <Briefcase className="w-4 h-4 text-green-500" />
                <span className="text-gray-500 dark:text-gray-400">
                  {t("team_department_label")}:
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {t(dept?.labelKey)}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-full px-4 py-2 text-xs sm:text-sm">
                <BadgeCheck className="w-4 h-4 text-green-500" />
                <span className="text-gray-500 dark:text-gray-400">
                  {t("team_role_label")}:
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {memberTitle}
                </span>
              </span>
            </div>

            {/* bio card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-l-4 border-l-green-500 p-6 sm:p-8">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4">
                {t("team_about_label")}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                {t(member.bioKey)}
              </p>
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