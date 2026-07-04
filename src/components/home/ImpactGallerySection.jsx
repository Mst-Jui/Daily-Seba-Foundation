"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { Expand, X, Images } from "lucide-react";

const galleryItems = [
  { img: "https://dailysebafoundation.com/wp-content/uploads/2026/02/9-1.png", key: "gallery1", span: "row-span-2" },
  { img: "https://dailysebafoundation.com/wp-content/uploads/2026/02/8-1.png", key: "gallery2", span: "" },
  { img: "https://i.ibb.co/qM7K86kr/734435632-1364661918866048-5224118236519979606-n.jpg", key: "gallery3", span: "" },
  { img: "https://i.ibb.co/TDxQX4Sw/735734947-2300588507138046-5609950278956697097-n.jpg", key: "gallery4", span: "" },
  { img: "https://dailysebafoundation.com/wp-content/uploads/2026/02/7-1.png", key: "gallery5", span: "" },
  { img: "https://dailysebafoundation.com/wp-content/uploads/2026/02/5-1.png", key: "gallery6", span: "" },
  { img: "https://i.ibb.co/mrXmHr2d/730022400-1544276297406968-5924548666184233620-n.jpg", key: "gallery7", span: "" },
];

export default function ImpactGallerySection() {
  const { t } = useApp();
  const [activeIndex, setActiveIndex] = useState(null);

  const openLightbox = (i) => setActiveIndex(i);
  const closeLightbox = () => setActiveIndex(null);

  return (
    <section className="relative w-full py-14 sm:py-20 md:py-24 bg-gray-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 sm:w-[26rem] sm:h-[26rem] bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/10 to-teal-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Images className="w-3.5 h-3.5" />
            {t("gallery_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            {t("gallery_heading")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base md:text-lg">
            {t("gallery_subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[130px] sm:auto-rows-[150px] md:auto-rows-[160px] lg:auto-rows-[170px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={`${item.key}-${i}`}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              onClick={() => openLightbox(i)}
              className={`relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer ring-1 ring-black/5 dark:ring-white/10 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-shadow duration-300 ${item.span}`}
            >
              <Image
                src={item.img}
                alt={t(`${item.key}_label`)}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 ring-2 ring-inset ring-teal-400/0 group-hover:ring-teal-400/60 rounded-xl sm:rounded-2xl transition-all duration-300" />
              <span className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <Expand className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </span>
              <span className="absolute bottom-2.5 left-3 right-3 sm:bottom-3 text-white text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 line-clamp-2">
                {t(`${item.key}_label`)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4 py-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-white/10 shadow-2xl"
            >
              <button
                onClick={closeLightbox}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-400 backdrop-blur-sm flex items-center justify-center transition-colors duration-300"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              <div className="relative w-full h-[55vh] sm:h-[65vh]">
                <Image
                  src={galleryItems[activeIndex].img}
                  alt={t(`${galleryItems[activeIndex].key}_label`)}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-600/10 to-teal-400/10">
                <p className="text-white font-medium text-sm sm:text-base">
                  {t(`${galleryItems[activeIndex].key}_label`)}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}