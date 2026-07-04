"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";

export default function BlogDetailMeta({ post, readTime, date, onShare, copied, t }) {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-3">
        <button
          onClick={() => router.push("/blog")}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-teal-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("blog_back")}
        </button>

        <button
          onClick={onShare}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-teal-500 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          {copied ? "Copied!" : t("blog_share")}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <span className="flex items-center gap-1.5">
          <User className="w-4 h-4 text-teal-500" /> {post.author}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-teal-500" /> {readTime}
        </span>
        <span>{date}</span>
      </div>
    </>
  );
}