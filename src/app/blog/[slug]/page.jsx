// app/blog/[slug]/page.jsx
"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { ArrowLeft, Clock, User, MapPin, CheckCircle2, Send, Share2 } from "lucide-react";
// import { blogPosts } from "@/data/blogData";
import Button from "@/components/reusable/Button";
import { blogPosts } from "../../../../data/blogData";

export default function BlogDetailPage() {
  const { t, lang } = useApp();
  const router = useRouter();
  const params = useParams();

  const post = blogPosts.find((p) => p.slug === params.slug);
  const currentIndex = blogPosts.findIndex((p) => p.slug === params.slug);
  const nextPost = blogPosts[currentIndex + 1] || null;
  const prevPost = blogPosts[currentIndex - 1] || null;
  const relatedPosts = blogPosts.filter((p) => p.slug !== params.slug).slice(0, 2);

  const [comment, setComment] = useState({ name: "", email: "", message: "" });
  const [commentErrors, setCommentErrors] = useState({});
  const [commentStatus, setCommentStatus] = useState("idle");
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
        <p className="text-gray-500 mb-4">{t("blog_no_posts")}</p>
        <Button onClick={() => router.push("/blog")} size="md" variant="primary">
          {t("blog_back")}
        </Button>
      </div>
    );
  }

  const title = lang === "bn" ? post.titleBn : post.titleEn;
  const content = lang === "bn" ? post.contentBn : post.contentEn;
  const date = lang === "bn" ? post.date : post.dateEn;
  const readTime = lang === "bn" ? post.readTime : post.readTimeEn;
  const category = lang === "bn" ? post.category : post.categoryEn;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const validateComment = () => {
    const e = {};
    if (!comment.name.trim()) e.name = true;
    if (!comment.email.trim()) e.email = true;
    if (!comment.message.trim()) e.message = true;
    setCommentErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!validateComment()) return;
    setCommentStatus("submitting");
    await new Promise((res) => setTimeout(res, 1000));
    setCommentStatus("success");
    setComment({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* ── Hero image with overlay ── */}
      <div className="relative h-56 sm:h-72 md:h-96 w-full overflow-hidden">
        <img
          src={post.image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-gray-950/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-6 pb-6 sm:pb-8">
          <span className="inline-block bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {category}
          </span>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug">
            {title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-8 pb-20">
        {/* ── Back + meta ── */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 flex-wrap gap-3">
          <button
            onClick={() => router.push("/blog")}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("blog_back")}
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            {copied ? "Copied!" : t("blog_share")}
          </button>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {readTime}
          </span>
          <span>{date}</span>
        </div>

        {/* ── Content renderer ── */}
        <article className="space-y-6">
          {content.map((block, i) => {
            if (block.type === "paragraph") {
              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={`leading-relaxed text-sm sm:text-base ${
                    block.bold
                      ? "font-semibold text-gray-900 dark:text-white text-base sm:text-lg"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {block.text}
                </motion.p>
              );
            }

            if (block.type === "gallery") {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8"
                >
                  {block.images.map((img, j) => (
                    <div key={j} className="rounded-xl overflow-hidden aspect-square">
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </motion.div>
              );
            }

            if (block.type === "location") {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium px-4 py-2 rounded-full"
                >
                  <MapPin className="w-4 h-4" />
                  {block.text}
                </motion.div>
              );
            }

            if (block.type === "closing") {
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="border-l-4 border-green-500 pl-5 py-2 mt-8"
                >
                  <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 italic">
                    {block.text}
                  </p>
                </motion.div>
              );
            }

            return null;
          })}
        </article>

        {/* ── Prev / Next navigation ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          {prevPost && (
            <button
              onClick={() => router.push(`/blog/${prevPost.slug}`)}
              className="group flex flex-col gap-1 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 transition-colors text-left"
            >
              <span className="text-xs text-gray-400">{t("blog_prev_post")}</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-500 transition-colors line-clamp-2">
                {lang === "bn" ? prevPost.titleBn : prevPost.titleEn}
              </span>
            </button>
          )}
          {nextPost && (
            <button
              onClick={() => router.push(`/blog/${nextPost.slug}`)}
              className={`group flex flex-col gap-1 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 transition-colors text-left ${!prevPost ? "sm:col-start-2" : ""}`}
            >
              <span className="text-xs text-gray-400">{t("blog_next_post")}</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-500 transition-colors line-clamp-2">
                {lang === "bn" ? nextPost.titleBn : nextPost.titleEn}
              </span>
            </button>
          )}
        </div>

        {/* ── Related posts ── */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-5">
              {t("blog_related")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((related) => (
                <button
                  key={related.id}
                  onClick={() => router.push(`/blog/${related.slug}`)}
                  className="group flex gap-3 p-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 transition-colors text-left"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={related.image}
                      alt={lang === "bn" ? related.titleBn : related.titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-green-500 font-semibold block mb-1">
                      {lang === "bn" ? related.category : related.categoryEn}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-500 transition-colors line-clamp-2">
                      {lang === "bn" ? related.titleBn : related.titleEn}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Comment section ── */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-6">
            {t("blog_comment_heading")}
          </h3>

          <AnimatePresence mode="wait">
            {commentStatus === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center py-10"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  {t("blog_comment_success")}
                </p>
                <Button onClick={() => setCommentStatus("idle")} size="sm" variant="outline">
                  {lang === "bn" ? "আরেকটি মন্তব্য করুন" : "Post Another"}
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleCommentSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CommentField
                    label={t("blog_comment_name")}
                    placeholder={t("blog_comment_name_ph")}
                    value={comment.name}
                    onChange={(e) => setComment((p) => ({ ...p, name: e.target.value }))}
                    error={commentErrors.name}
                  />
                  <CommentField
                    label={t("blog_comment_email")}
                    placeholder={t("blog_comment_email_ph")}
                    value={comment.email}
                    onChange={(e) => setComment((p) => ({ ...p, email: e.target.value }))}
                    error={commentErrors.email}
                    type="email"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {t("blog_comment_message")} <span className="text-green-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={comment.message}
                    onChange={(e) => setComment((p) => ({ ...p, message: e.target.value }))}
                    placeholder={t("blog_comment_message_ph")}
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900/40 placeholder:text-gray-400 outline-none resize-none transition-colors
                      ${commentErrors.message ? "border-red-400" : "border-gray-200 dark:border-gray-700 focus:border-green-500"}`}
                  />
                </div>
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  disabled={commentStatus === "submitting"}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  {commentStatus === "submitting" ? t("blog_comment_submitting") : t("blog_comment_submit")}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function CommentField({ label, placeholder, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} <span className="text-green-500">*</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900/40 placeholder:text-gray-400 outline-none transition-colors
          ${error ? "border-red-400" : "border-gray-200 dark:border-gray-700 focus:border-green-500"}`}
      />
    </div>
  );
}