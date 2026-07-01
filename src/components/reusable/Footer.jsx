// components/Footer.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import {
  House,
  Phone,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import Button from "./Button";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import Logo from "./Logo";
// import Button from "./reusable/Button";

export default function Footer() {
  const { t } = useApp();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    // TODO: backend/newsletter API connect korle ekhane call hobe
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

  return (
    <footer className="w-full bg-gray-950 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* ── Brand ── */}
          <div className="lg:col-span-1">
            <Logo />

            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              {t("footer_tagline")}
            </p>

            <div className="flex items-center gap-3">
              {/* facebook  */}
              <Link
                href="https://www.facebook.com/dailysebafoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-green-400 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </Link>

              {/* linkedin  */}
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-green-400 flex items-center justify-center transition-colors"
                aria-label="linkedin"
              >
                <FaLinkedin />
              </Link>

              {/* tiktok  */}
              <Link
                href="https://www.tiktok.com/@dailysebafoundation?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-green-400 flex items-center justify-center transition-colors"
                aria-label="tiktok"
              >
                <AiFillTikTok />
              </Link>

              {/* youtube  */}
              <Link
                href="https://www.youtube.com/@dailysebafoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-green-400 flex items-center justify-center transition-colors"
                aria-label="tiktok"
              >
                <FaYoutube />
              </Link>













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
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Company ── */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm sm:text-base">
              {t("footer_company")}
            </h4>

            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3">
              <a
                href="tel:+8801401884409"
                className="flex items-start gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors"
              >
                <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                <span>+880 1401-884409</span>
              </a>

              <a
                href="mailto:dailysebafoundation@gmail.com"
                className="flex items-start gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors break-all"
              >
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <span>dailysebafoundation@gmail.com</span>
              </a>

              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
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
              <p className="text-sm text-green-400 font-medium">
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
                  className="w-full px-3.5 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white placeholder:text-gray-500 outline-none focus:border-green-500 transition-colors"
                />

                <Button
                  type="submit"
                  size="sm"
                  variant="primary"
                  className="w-full gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  {t("footer_subscribe")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} {t("footer_copyright")}
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs sm:text-sm text-gray-500 hover:text-green-400 transition-colors"
            >
              {t("footer_privacy")}
            </Link>

            <Link
              href="/terms"
              className="text-xs sm:text-sm text-gray-500 hover:text-green-400 transition-colors"
            >
              {t("footer_terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}