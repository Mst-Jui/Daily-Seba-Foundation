"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight } from "lucide-react";
import Button from "@/components/reusable/Button";

const packagesConfig = [
  { prefix: "package1", featured: false },
  { prefix: "package2", featured: true },
  { prefix: "package3", featured: false },
];

function PackageCard({ config, index, isSelected, onSelect }) {
  const { t } = useApp();
  const router = useRouter();
  const p = config.prefix;
  const items = t(`${p}_items`);
  const itemList = Array.isArray(items) ? items : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onClick={() => onSelect(p)}
      className={`relative flex flex-col rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 cursor-pointer transition-all duration-500 overflow-hidden border-2
        ${isSelected ? "border-teal-400 shadow-2xl shadow-teal-500/20" : "border-slate-100 hover:border-blue-200 shadow-lg"}`}
    >
      {config.featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-teal-400 text-white text-[10px] sm:text-xs font-bold px-4 sm:px-6 py-1.5 sm:py-2 rounded-bl-2xl z-10">
          {t("package_table_item") === "Item Name" ? "MOST POPULAR" : "জনপ্রিয়"}
        </div>
      )}

      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
          <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold">{t(`${p}_name`)}</h3>
        <p className="text-xs sm:text-sm text-slate-400">{t("package_project")}</p>
      </div>

      <div className="flex-1 overflow-y-auto mb-6 sm:mb-8">
        <table className="w-full text-xs sm:text-sm">
          <tbody>
            {itemList.map((item, i) => (
              <tr key={i} className="border-b border-slate-50">
                <td className="py-2 text-slate-400 w-8">{i + 1}</td>
                <td className="py-2">{item.name} <span className="text-slate-400">({item.qty})</span></td>
                <td className="py-2 text-right font-medium">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-auto pt-6 border-t border-slate-100">
        <div className="text-2xl sm:text-3xl font-black mb-6">{t(`${p}_total`)}</div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/package/${p}`);
          }}
          variant={isSelected ? "primary" : "outline"}
          className="w-full h-12 sm:h-14 rounded-xl text-base sm:text-lg font-bold"
        >
          {t("package_cta")} <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </motion.div>
  );
}

export default function PackageSection() {
  const { t } = useApp();
  const [selected, setSelected] = useState("package2");

  return (
    <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            {t("package_heading_normal")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
              {t("package_heading_highlight")}
            </span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg">{t("package_subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
          {packagesConfig.map((pkg, i) => (
            <PackageCard
              key={pkg.prefix}
              config={pkg}
              index={i}
              isSelected={selected === pkg.prefix}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>
    </section>
  );
}