// components/Footer.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import Button from "./Button";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const quickLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "our-team", href: "/our-team" },
    { key: "blog", href: "/blog" },
  ];

  const companyLinks = [
    { key: "working-area", href: "/working-area" },
    { key: "contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "https://www.facebook.com/dailysebafoundation", label: "Facebook" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: AiFillTikTok, href: "https://www.tiktok.com/@dailysebafoundation?is_from_webapp=1&sender_device=pc", label: "TikTok" },
    { icon: FaYoutube, href: "https://www.youtube.com/@dailysebafoundation", label: "YouTube" },
  ];

  return (
    <footer className="relative w-full bg-gray-950 text-gray-300 overflow-hidden">
      {/* decorative theme glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">
          {/* ── Brand ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-sm text-gray-400 leading-relaxed mb-5 mt-3 max-w-xs">
              {t("footer_tagline")}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-gradient-to-br hover:from-blue-600 hover:to-teal-400 flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">
              {t("footer_quick_links")}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-teal-400 transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company & Contact ── */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">
              {t("footer_company")}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-teal-400 transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              <a href="tel:+8801401884409" className="flex items-start gap-2 text-sm text-gray-400 hover:text-teal-400 transition-colors">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                <span>+880 1401-884409</span>
              </a>
              <a href="mailto:dailysebafoundation@gmail.com" className="flex items-start gap-2 text-sm text-gray-400 hover:text-teal-400 transition-colors break-all">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                <span>dailysebafoundation@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                <span>{t("footer_address")}</span>
              </div>
            </div>
          </div>

          {/* ── Newsletter ── */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">
              {t("footer_newsletter")}
            </h4>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              {t("footer_newsletter_desc")}
            </p>
            {subscribed ? (
              <p className="text-sm font-medium bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                ✓ Subscribed!
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer_email_placeholder")}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white placeholder:text-gray-500 outline-none focus:border-teal-500 transition-colors"
                />
                <Button type="submit" size="sm" variant="primary" className="w-full gap-1.5 bg-gradient-to-r from-blue-600 to-teal-500">
                  <Send className="w-3.5 h-3.5" />
                  {t("footer_subscribe")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} {t("footer_copyright")}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs sm:text-sm text-gray-500 hover:text-teal-400 transition-colors">
              {t("footer_privacy")}
            </Link>
            <Link href="/terms" className="text-xs sm:text-sm text-gray-500 hover:text-teal-400 transition-colors">
              {t("footer_terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}