"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import BlogFeaturedCard from "./BlogFeaturedCard";
import BlogCard from "./BlogCard";

export default function BlogGrid({ filtered, lang, t }) {
  const router = useRouter();

  return (
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
          {filtered[0] && (
            <BlogFeaturedCard
              post={filtered[0]}
              lang={lang}
              t={t}
              onClick={() => router.push(`/blog/${filtered[0].slug}`)}
            />
          )}

          {filtered.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filtered.slice(1).map((post, i) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  lang={lang}
                  t={t}
                  index={i}
                  onClick={() => router.push(`/blog/${post.slug}`)}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}