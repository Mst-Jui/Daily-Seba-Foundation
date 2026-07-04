"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import Button from "@/components/reusable/Button";

function CommentField({ label, placeholder, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label} <span className="text-teal-500">*</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900/40 placeholder:text-gray-400 outline-none transition-colors
          ${error ? "border-red-400" : "border-gray-200 dark:border-gray-700 focus:border-teal-500"}`}
      />
    </div>
  );
}

export default function BlogCommentSection({ t, lang }) {
  const [comment, setComment] = useState({ name: "", email: "", message: "" });
  const [commentErrors, setCommentErrors] = useState({});
  const [commentStatus, setCommentStatus] = useState("idle");

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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 flex items-center justify-center mb-3 shadow-lg shadow-teal-500/30"
            >
              <CheckCircle2 className="w-6 h-6 text-white" />
            </motion.div>
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
                {t("blog_comment_message")} <span className="text-teal-500">*</span>
              </label>
              <textarea
                rows={4}
                value={comment.message}
                onChange={(e) => setComment((p) => ({ ...p, message: e.target.value }))}
                placeholder={t("blog_comment_message_ph")}
                className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900/40 placeholder:text-gray-400 outline-none resize-none transition-colors
                  ${commentErrors.message ? "border-red-400" : "border-gray-200 dark:border-gray-700 focus:border-teal-500"}`}
              />
            </div>
            <Button
              type="submit"
              size="md"
              variant="primary"
              disabled={commentStatus === "submitting"}
              className="gap-2 bg-gradient-to-r from-blue-600 to-teal-500"
            >
              <Send className="w-4 h-4" />
              {commentStatus === "submitting" ? t("blog_comment_submitting") : t("blog_comment_submit")}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}