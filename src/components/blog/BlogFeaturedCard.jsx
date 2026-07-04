"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, User, ArrowRight } from "lucide-react";

export default function BlogFeaturedCard({ post, lang, t, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-300 cursor-pointer mb-8 sm:mb-10"
    >
      <div className="relative h-56 sm:h-64 md:h-auto overflow-hidden">
        <Image
          src={post.image}
          alt={lang === "bn" ? post.titleBn : post.titleEn}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          {lang === "bn" ? post.category : post.categoryEn}
        </span>
      </div>
      <div className="p-6 sm:p-8 flex flex-col justify-center">
        <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {lang === "bn" ? post.readTime : post.readTimeEn}
          </span>
          <span>{lang === "bn" ? post.date : post.dateEn}</span>
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-snug mb-4 group-hover:text-teal-500 transition-colors">
          {lang === "bn" ? post.titleBn : post.titleEn}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
          {lang === "bn" ? post.excerptBn : post.excerptEn}
        </p>
        <span className="inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          {t("blog_read_more")}
          <ArrowRight className="w-4 h-4 text-teal-500 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.div>
  );
}