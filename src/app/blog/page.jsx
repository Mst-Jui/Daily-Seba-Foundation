// app/blog/page.jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { Clock, User, ArrowRight, Tag } from "lucide-react";
import { blogPosts } from "../../../data/blogData";
// import { blogPosts } from "@/data/blogData";

const categories = ["all", "কার্যক্রম", "স্বাস্থ্য"];
const categoriesEn = ["All", "Activity", "Health"];

export default function BlogPage() {
  const { t, lang } = useApp();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? blogPosts
    : blogPosts.filter((p) =>
        lang === "bn"
          ? p.category === activeFilter
          : p.categoryEn === activeFilter
      );

  const filterList = lang === "bn" ? categories : ["all", ...categoriesEn.slice(1)];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-14 sm:pt-36 sm:pb-20 bg-gray-950 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 40px, #22c55e 40px, #22c55e 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #22c55e 40px, #22c55e 41px)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-green-500/15 rounded-full blur-[80px]" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-green-500/15 text-green-400 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-5"
          >
            {t("blog_hero_badge")}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-snug mb-5"
          >
            {t("blog_hero_heading")}{" "}
            <span className="text-green-400">{t("blog_hero_highlight")}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto"
          >
            {t("blog_hero_subtitle")}
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 sm:py-14">
        {/* ── Category filter ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-10 sm:mb-12"
        >
          {filterList.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200
                ${activeFilter === cat
                  ? "bg-green-500 text-white"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-green-300"
                }`}
            >
              {cat === "all" ? t("blog_filter_all") : cat}
            </button>
          ))}
        </motion.div>

        {/* ── Featured first post (large) + rest grid ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-400 py-20"
            >
              {t("blog_no_posts")}
            </motion.p>
          ) : (
            <motion.div
              key="posts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* ── Featured top card ── */}
              {filtered[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => router.push(`/blog/${filtered[0].slug}`)}
                  className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer mb-8 sm:mb-10"
                >
                  <div className="relative h-56 sm:h-64 md:h-auto overflow-hidden">
                    <img
                      src={filtered[0].image}
                      alt={lang === "bn" ? filtered[0].titleBn : filtered[0].titleEn}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {lang === "bn" ? filtered[0].category : filtered[0].categoryEn}
                    </span>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {filtered[0].author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {lang === "bn" ? filtered[0].readTime : filtered[0].readTimeEn}
                      </span>
                      <span>{lang === "bn" ? filtered[0].date : filtered[0].dateEn}</span>
                    </div>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug mb-4 group-hover:text-green-500 transition-colors">
                      {lang === "bn" ? filtered[0].titleBn : filtered[0].titleEn}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
                      {lang === "bn" ? filtered[0].excerptBn : filtered[0].excerptEn}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-500">
                      {t("blog_read_more")}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </motion.div>
              )}

              {/* ── Rest posts grid ── */}
              {filtered.length > 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {filtered.slice(1).map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      onClick={() => router.push(`/blog/${post.slug}`)}
                      className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={lang === "bn" ? post.titleBn : post.titleEn}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                          {lang === "bn" ? post.category : post.categoryEn}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-[10px] text-gray-400 dark:text-gray-500 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {lang === "bn" ? post.readTime : post.readTimeEn}
                          </span>
                          <span>{lang === "bn" ? post.date : post.dateEn}</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-green-500 transition-colors">
                          {lang === "bn" ? post.titleBn : post.titleEn}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
                          {lang === "bn" ? post.excerptBn : post.excerptEn}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-500">
                          {t("blog_read_more")}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}