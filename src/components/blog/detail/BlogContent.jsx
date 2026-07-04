"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ChevronDown } from "lucide-react";

export default function BlogContent({ content, t }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="relative">
      <motion.div
        animate={{ maxHeight: expanded ? 5000 : 260 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`space-y-6 overflow-hidden relative ${!expanded ? "line-clamp-5" : ""}`}
      >
        {content.map((block, i) => {
          if (block.type === "paragraph") {
            return (
              <p
                key={i}
                className={`leading-relaxed text-sm sm:text-base ${
                  block.bold
                    ? "font-semibold text-gray-900 dark:text-white text-base sm:text-lg"
                    : "text-gray-700 dark:text-gray-300"
                } ${!expanded ? "line-clamp-5" : ""}`}
              >
                {block.text}
              </p>
            );
          }

          if (block.type === "gallery") {
            if (!expanded) return null;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8"
              >
                {block.images.map((img, j) => (
                  <div key={j} className="relative rounded-xl overflow-hidden aspect-square">
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </motion.div>
            );
          }

          if (block.type === "location") {
            if (!expanded) return null;
            return (
              <div
                key={i}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-teal-400/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 text-sm font-medium px-4 py-2 rounded-full"
              >
                <MapPin className="w-4 h-4" />
                {block.text}
              </div>
            );
          }

          if (block.type === "closing") {
            if (!expanded) return null;
            return (
              <div key={i} className="border-l-4 border-teal-500 pl-5 py-2 mt-8">
                <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 italic">
                  {block.text}
                </p>
              </div>
            );
          }

          return null;
        })}
      </motion.div>

      {!expanded && (
        <div className="absolute bottom-10 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent pointer-events-none" />
      )}

      <button
        onClick={() => setExpanded((p) => !p)}
        className="relative z-10 mt-3 inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
      >
        {expanded ? t("blog_see_less") : t("blog_see_more")}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex"
        >
          <ChevronDown className="w-4 h-4 text-teal-500" />
        </motion.span>
      </button>
    </article>
  );
}