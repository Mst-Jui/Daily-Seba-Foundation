"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";

export default function BlogCard({ post, lang, t, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={onClick}
      className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/15 transition-all duration-300 cursor-pointer"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.image}
          alt={lang === "bn" ? post.titleBn : post.titleEn}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-md">
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
        <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-teal-500 transition-colors">
          {lang === "bn" ? post.titleBn : post.titleEn}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
          {lang === "bn" ? post.excerptBn : post.excerptEn}
        </p>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          {t("blog_read_more")}
          <ArrowRight className="w-3.5 h-3.5 text-teal-500 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.div>
  );
}