"use client";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { blogPosts } from "../../../data/blogData";
import BlogHero from "@/components/blog/BlogHero";
import BlogFilter from "@/components/blog/BlogFilter";
import BlogGrid from "@/components/blog/BlogGrid";

const categories = ["all", "কার্যক্রম", "স্বাস্থ্য"];
const categoriesEn = ["All", "Activity", "Health"];

export default function BlogPage() {
  const { t, lang } = useApp();
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = activeFilter === "all"
    ? blogPosts
    : blogPosts.filter((p) =>
        lang === "bn" ? p.category === activeFilter : p.categoryEn === activeFilter
      );

  const filterList = lang === "bn" ? categories : ["all", ...categoriesEn.slice(1)];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <BlogHero />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <BlogFilter filterList={filterList} activeFilter={activeFilter} setActiveFilter={setActiveFilter} t={t} />
        <BlogGrid filtered={filtered} lang={lang} t={t} />
      </div>
    </div>
  );
}