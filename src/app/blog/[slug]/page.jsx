"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import Button from "@/components/reusable/Button";
import { blogPosts } from "../../../../data/blogData";
import BlogDetailHero from "@/components/blog/detail/BlogDetailHero";
import BlogDetailMeta from "@/components/blog/detail/BlogDetailMeta";
import BlogContent from "@/components/blog/detail/BlogContent";
import BlogNavigation from "@/components/blog/detail/BlogNavigation";
import BlogRelated from "@/components/blog/detail/BlogRelated";
import BlogCommentSection from "@/components/blog/detail/BlogCommentSection";

export default function BlogDetailPage() {
  const { t, lang } = useApp();
  const router = useRouter();
  const params = useParams();
  const [copied, setCopied] = useState(false);

  const post = blogPosts.find((p) => p.slug === params.slug);
  const currentIndex = blogPosts.findIndex((p) => p.slug === params.slug);
  const nextPost = blogPosts[currentIndex + 1] || null;
  const prevPost = blogPosts[currentIndex - 1] || null;
  const relatedPosts = blogPosts.filter((p) => p.slug !== params.slug).slice(0, 2);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <BlogDetailHero image={post.image} title={title} category={category} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto">
          <BlogDetailMeta post={post} readTime={readTime} date={date} onShare={handleShare} copied={copied} t={t} />
          <BlogContent content={content} t={t} />
          <BlogNavigation prevPost={prevPost} nextPost={nextPost} lang={lang} t={t} />
          <BlogRelated relatedPosts={relatedPosts} lang={lang} t={t} />
          <BlogCommentSection t={t} lang={lang} />
        </div>
      </div>
    </div>
  );
}