"use client";
import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { ChevronDown, ChevronUp, Moon, Sun, Menu, X } from "lucide-react";
import NavLink from "./NavLink";
import Logo from "./Logo";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
];

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isDark = theme === "dark";
  const activeLang = languages.find((l) => l.code === lang) || languages[1];

  // ── Scroll হলে navbar blur ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = ["about", "our-team", "working-area", "blog", "contact"];

  return (
    <nav
      className={`fixed top-0 z-40 w-full transition-all duration-300
        ${scrolled
          ? `backdrop-blur-md shadow-md ${isDark ? "bg-gray-900/80" : "bg-white/80"}`
          : `${isDark ? "bg-gray-900" : "bg-white"}`
        } ${isDark ? "text-white" : "text-gray-800"}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between relative">
        {/* ── LEFT: Logo ── */}
        <Logo />

        {/* ── CENTER: Nav Links (Desktop) ── */}
        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm absolute left-1/2 -translate-x-1/2">
          {navItems.map((key) => (
            <li key={key}>
              <NavLink href={`/${key === "home" ? "" : key}`} className={isDark ? "text-gray-200" : "text-gray-700"}>
                {t(key)}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── RIGHT: Controls ── */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-full transition-colors duration-200
              ${isDark ? "bg-gray-700 text-yellow-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
          >
            {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((p) => !p)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors duration-200
                ${isDark ? "border-gray-600 text-gray-200 hover:bg-gray-700" : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
            >
              <span className="text-base leading-none">{activeLang.flag}</span>
              <span className="hidden sm:inline">{activeLang.label}</span>
              {langOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {langOpen && (
              <div
                className={`absolute right-0 mt-2 w-40 rounded-xl shadow-lg overflow-hidden z-50 border
                  ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
              >
                {languages.map(({ code, label, flag }) => (
                  <button
                    key={code}
                    onClick={() => {
                      toggleLang(code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm transition-colors
                      ${lang === code
                        ? isDark
                          ? "bg-gradient-to-r from-blue-600/30 to-teal-500/30 text-white font-semibold"
                          : "bg-gradient-to-r from-blue-50 to-teal-50 text-teal-700 font-semibold"
                        : isDark
                        ? "text-gray-200 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-50"
                      }`}
                  >
                    <span className="text-base leading-none">{flag}</span>
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          className={`lg:hidden w-full px-4 sm:px-6 py-4 flex flex-col gap-3 shadow-lg border-t
            ${isDark ? "bg-gray-900 text-white border-gray-800" : "bg-white text-gray-800 border-gray-100"}`}
        >
          {navItems.map((key) => (
            <NavLink
              key={key}
              href={`/${key === "home" ? "" : key}`}
              className="text-sm sm:text-base"
              onClick={() => setMobileOpen(false)}
            >
              {t(key)}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}