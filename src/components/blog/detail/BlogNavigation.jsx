"use client";
import { useRouter } from "next/navigation";

export default function BlogNavigation({ prevPost, nextPost, lang, t }) {
  const router = useRouter();

  if (!prevPost && !nextPost) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
      {prevPost && (
        <button
          onClick={() => router.push(`/blog/${prevPost.slug}`)}
          className="group flex flex-col gap-1 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 text-left"
        >
          <span className="text-xs text-gray-400">{t("blog_prev_post")}</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-teal-500 transition-colors line-clamp-2">
            {lang === "bn" ? prevPost.titleBn : prevPost.titleEn}
          </span>
        </button>
      )}
      {nextPost && (
        <button
          onClick={() => router.push(`/blog/${nextPost.slug}`)}
          className={`group flex flex-col gap-1 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 text-left ${!prevPost ? "sm:col-start-2" : ""}`}
        >
          <span className="text-xs text-gray-400">{t("blog_next_post")}</span>
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-teal-500 transition-colors line-clamp-2">
            {lang === "bn" ? nextPost.titleBn : nextPost.titleEn}
          </span>
        </button>
      )}
    </div>
  );
}