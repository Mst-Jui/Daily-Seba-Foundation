// components/home/ImpactGallerySection.jsx
"use client";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

const galleryItems = [
  {
    img: "https://dailysebafoundation.com/wp-content/uploads/2026/02/9-1.png",
    key: "gallery1",
    span: "row-span-2",
  },
  {
    img: "https://dailysebafoundation.com/wp-content/uploads/2026/02/8-1.png",
    key: "gallery2",
    span: "",
  },
  {
    img: "https://i.ibb.co/qM7K86kr/734435632-1364661918866048-5224118236519979606-n.jpg",
    key: "gallery3",
    span: "",
  },
  {
    img: "https://i.ibb.co/TDxQX4Sw/735734947-2300588507138046-5609950278956697097-n.jpg",
    key: "gallery4",
    span: "",
  },
  {
    img: "https://dailysebafoundation.com/wp-content/uploads/2026/02/7-1.png",
    key: "gallery5",
    span: "",
  },
  {
    img: "https://dailysebafoundation.com/wp-content/uploads/2026/02/5-1.png",
    key: "gallery6",
    span: "",
  },
  {
    img: "https://i.ibb.co/mrXmHr2d/730022400-1544276297406968-5924548666184233620-n.jpg",
    key: "gallery7",  // আগে gallery6 ছিল — duplicate key fix
    span: "",
  },
];

export default function ImpactGallerySection() {
  const { t } = useApp();

  return (
    <section className="w-full py-14 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-green-500 text-sm font-semibold tracking-wide mb-3">
            {t("gallery_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
            {t("gallery_heading")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{t("gallery_subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:auto-rows-[140px] lg:auto-rows-[160px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={`${item.key}-${i}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative rounded-xl sm:rounded-2xl overflow-hidden group cursor-pointer ${item.span} h-40 md:h-auto`}
            >
              <img
                src={item.img}
                alt={t(`${item.key}_label`)}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 text-white text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {t(`${item.key}_label`)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}