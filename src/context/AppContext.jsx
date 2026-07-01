"use client";
import { createContext, useContext, useState, useEffect } from "react";

import { BannerEn } from "@/components/english/BannerEn";
import { ProductPackageEn } from "@/components/english/ProductPackageEn";
import { MembershipEn } from "@/components/english/MembershipEn";
import { ChairmanEn } from "@/components/english/ChairmanEn";
import { DealerFormEn } from "@/components/english/DealerFormEn";
import { FaqEn } from "@/components/english/FaqEn";
import { FooterEn } from "@/components/english/FooterEn";
import { AboutEn } from "@/components/english/AboutEn";
// import { ChairmanAboutEn } from "@/components/english/ChairmanAboutEn";
import { HomeExtraEn } from "@/components/english/HomeExtraEn";
import { TeamEn } from "@/components/english/TeamEn";

import { BannerBn } from "@/components/bangla/BannerBn";
import { ProductPackageBn } from "@/components/bangla/ProductPackageBn";
import { MembershipBn } from "@/components/bangla/MembershipBn";
import { ChairmanBn } from "@/components/bangla/ChairmanBn";
import { DealerFormBn } from "@/components/bangla/DealerFormBn";
import { FaqBn } from "@/components/bangla/FaqBn";
import { FooterBn } from "@/components/bangla/FooterBn";
import { AboutBn } from "@/components/bangla/AboutBn";
// import { ChairmanAboutBn } from "@/components/bangla/ChairmanAboutBn";
import { HomeExtraBn } from "@/components/bangla/HomeExtraBn";
import { TeamBn } from "@/components/bangla/TeamBn";
import { ImpactGalleryEn } from "@/components/english/ImpactEn";
import { ImpactGalleryBn } from "@/components/bangla/ImpactBn";
import { ContactEn } from "@/components/english/ContactEn";
import { ContactBn } from "@/components/bangla/ContactBn";
import { WorkingAreaEn } from "@/components/english/WorkingAreaEn";
import { WorkingAreaBn } from "@/components/bangla/WorkingAreaBn";
import { BlogEn } from "@/components/english/BlogEn";
import { BlogBn } from "@/components/bangla/BlogBn";

const AppContext = createContext();

export const translations = {
  en: {
    ...BannerEn.en,
    ...ProductPackageEn.en,
    ...MembershipEn.en,
    ...ChairmanEn.en,
    ...DealerFormEn.en,
    ...FaqEn.en,
    ...FooterEn.en,
    ...AboutEn.en,
    // ...ChairmanAboutEn.en,
    ...HomeExtraEn.en,
    ...TeamEn.en,
    ...ImpactGalleryEn.en,
    ...ContactEn.en,
    ...WorkingAreaEn.en,
    ...BlogEn.en, 
  },
  bn: {
    ...BannerBn.bn,
    ...ProductPackageBn.bn,
    ...MembershipBn.bn,
    ...ChairmanBn.bn,
    ...DealerFormBn.bn,
    ...FaqBn.bn,
    ...FooterBn.bn,
    ...AboutBn.bn,
    // ...ChairmanAboutBn.bn,
    ...HomeExtraBn.bn,
    ...TeamBn.bn,
    ...ImpactGalleryBn.bn,
    ...ContactBn.bn,
    ...WorkingAreaBn.bn,
    ...BlogBn.en,
  },
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleLang = (selected) => setLang(selected);
  const t = (key) => translations[lang]?.[key] || key;

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);