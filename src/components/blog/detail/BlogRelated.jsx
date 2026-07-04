"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BlogRelated({ relatedPosts, lang, t }) {
  const router = useRouter();
  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-5">
        {t("blog_related")}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {relatedPosts.map((related) => (
          <button
            key={related.id}
            onClick={() => router.push(`/blog/${related.slug}`)}
            className="group flex gap-3 p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 text-left"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
              <Image
                src={related.image}
                alt={lang === "bn" ? related.titleBn : related.titleEn}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-semibold block mb-1 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                {lang === "bn" ? related.category : related.categoryEn}
              </span>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-teal-500 transition-colors line-clamp-2">
                {lang === "bn" ? related.titleBn : related.titleEn}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}