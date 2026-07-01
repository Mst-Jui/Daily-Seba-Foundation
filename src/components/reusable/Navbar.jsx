"use client";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { ChevronDown, ChevronUp, House, Moon, Sun } from "lucide-react";
import NavLink from "./NavLink";
import Logo from "./Logo";


// ── Sun Icon ─────────────────────────────────────────────────
function SunIcon() {
  return (
    <Sun />
  );
}

// ── Moon Icon ─────────────────────────────────────────────────
function MoonIcon() {
  return (
    <Moon />
  );
}

// ── Navbar ────────────────────────────────────────────────────
export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang, t } = useApp();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = theme === "dark";

  return (
    <nav className={`fixed top-0 z-40 w-full px-6 py-3 flex items-center justify-between shadow-md transition-colors duration-300
      ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>

      {/* ── LEFT: Logo ── */}
 
        <Logo />

      {/* ── CENTER: Nav Links (Desktop) ── */}
      <ul className="hidden md:flex items-center gap-8 font-medium text-sm absolute left-1/2 -translate-x-1/2">
        {["about", "our-team", "working-area", "blog", "contact"].map((key) => (
          <li key={key}>
            <NavLink
              href={`/${key === "home" ? "" : key}`}
              className={isDark ? "text-gray-200" : "text-gray-700"}
            >
              {t(key)}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* ── RIGHT: Controls ── */}
      <div className="flex items-center gap-3">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`p-2 rounded-full transition-colors duration-200
            ${isDark
              ? "bg-gray-700 text-yellow-300 hover:bg-gray-600"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setLangOpen((p) => !p)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200
              ${isDark
                ? "border-gray-600 text-gray-200 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
          >
            {lang === "en" ? "English" : "বাংলা"}
            <span className="ml-1 text-xs">{langOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
          </button>

          {langOpen && (
            <div className={`absolute right-0 mt-2 w-36 rounded-xl shadow-lg overflow-hidden z-50 border
              ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
              {[
                { code: "en", label: "🇬🇧 English" },
                { code: "bn", label: "🇧🇩 বাংলা" },
              ].map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => { toggleLang(code); setLangOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                    ${lang === code
                      ? isDark ? "bg-green-700 text-white" : "bg-green-50 text-green-700 font-semibold"
                      : isDark ? "text-gray-200 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-50"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="md:hidden p-2 rounded-lg"
          aria-label="Toggle menu"
        >
          <div className={`w-5 h-0.5 mb-1 transition-all ${isDark ? "bg-white" : "bg-gray-800"}`} />
          <div className={`w-5 h-0.5 mb-1 transition-all ${isDark ? "bg-white" : "bg-gray-800"}`} />
          <div className={`w-5 h-0.5 transition-all ${isDark ? "bg-white" : "bg-gray-800"}`} />
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className={`absolute top-16 left-0 w-full z-40 px-6 py-4 flex flex-col gap-4 shadow-lg md:hidden
          ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
          {["about", "our-team", "working-area", "blog", "contact"].map((key) => (
            <NavLink
              key={key}
              href={`/${key === "home" ? "" : key}`}
              className="text-base"
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