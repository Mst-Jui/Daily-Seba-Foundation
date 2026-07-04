"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Phone, Mail, MapPin, Send, CheckCircle2, User, MessageSquare, Tag } from "lucide-react";
import Button from "@/components/reusable/Button";
import { FaFacebook } from "react-icons/fa";

const fieldReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: "easeOut" },
  }),
};

export default function ContactPage() {
  const { t } = useApp();
  const [form, setForm] = useState({ name: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.phone.trim()) e.phone = true;
    if (!form.message.trim()) e.message = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  };

  const contactInfo = [
    { icon: Phone, label: t("contact_phone_label"), value: "+88012345678900", href: "tel:+88012345678900" },
    { icon: Mail, label: t("contact_email_label"), value: "dailyseba@gmail.com", href: "mailto:dailyseba@gmail.com" },
    { icon: MapPin, label: t("contact_address_label"), value: t("contact_address_value"), href: null },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 overflow-hidden transition-colors duration-300">
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 sm:w-[26rem] sm:h-[26rem] bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            {t("contact_page_badge")}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t("contact_page_heading")}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 dark:text-slate-400">
            {t("contact_page_subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-4 sm:space-y-5">
            {contactInfo.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }} whileHover={{ y: -3 }} className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-600 to-teal-400 flex items-center justify-center shrink-0 shadow-md shadow-teal-500/25 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200 hover:text-teal-500 transition-colors break-all">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-200">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.5 }} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
              <p className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t("contact_social_label")}</p>
              <a href="https://facebook.com/dailysebafoundation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-teal-500 transition-colors">
                <FaFacebook className="w-4 h-4 text-blue-600" /> Daily Seba Foundation
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.6 }} className="rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 h-48 sm:h-56 md:h-64 shadow-sm">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d91.3950!3d24.9045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU0JzE2LjIiTiA5McKwMjMnNDIuMCJF!5e0!3m2!1sen!2sbd!4v1234567890" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map" />
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full flex flex-col items-center justify-center text-center py-14 sm:py-16">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }} className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 flex items-center justify-center mb-4 shadow-lg shadow-teal-500/30">
                    <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">{t("contact_success_title")}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-6">{t("contact_success_desc")}</p>
                  <Button onClick={() => setStatus("idle")} size="md" variant="outline">{t("contact_send_another")}</Button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-4">{t("contact_form_heading")}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.div custom={0} variants={fieldReveal} initial="hidden" animate="visible"><Field icon={User} label={t("contact_field_name")} placeholder={t("contact_field_name_ph")} value={form.name} onChange={handleChange("name")} error={errors.name} t={t} required /></motion.div>
                    <motion.div custom={1} variants={fieldReveal} initial="hidden" animate="visible"><Field icon={Phone} label={t("contact_field_phone")} placeholder={t("contact_field_phone_ph")} value={form.phone} onChange={handleChange("phone")} error={errors.phone} t={t} type="tel" required /></motion.div>
                  </div>
                  <motion.div custom={2} variants={fieldReveal} initial="hidden" animate="visible"><Field icon={Tag} label={t("contact_field_subject")} placeholder={t("contact_field_subject_ph")} value={form.subject} onChange={handleChange("subject")} t={t} /></motion.div>
                  <motion.div custom={3} variants={fieldReveal} initial="hidden" animate="visible">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{t("contact_field_message")} <span className="text-teal-500 ml-0.5">*</span></label>
                    <div className={`flex items-start gap-2 rounded-xl border px-3.5 py-2.5 transition-colors bg-slate-50 dark:bg-slate-800/60 ${errors.message ? "border-red-400" : "border-slate-200 dark:border-slate-700 focus-within:border-teal-500"}`}>
                      <MessageSquare className="w-4 h-4 text-blue-400 mt-1 shrink-0" />
                      <textarea rows={5} value={form.message} onChange={handleChange("message")} placeholder={t("contact_field_message_ph")} className="w-full bg-transparent outline-none resize-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400" />
                    </div>
                    {errors.message && <p className="text-xs text-red-500 mt-1">{t("contact_required")}</p>}
                  </motion.div>
                  <motion.div custom={4} variants={fieldReveal} initial="hidden" animate="visible">
                    <Button type="submit" size="md" variant="primary" disabled={status === "submitting"} className="w-full gap-2 bg-gradient-to-r from-blue-600 to-teal-500">
                      <Send className="w-4 h-4" /> {status === "submitting" ? t("contact_submitting") : t("contact_submit")}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, placeholder, value, onChange, error, type = "text", required, t }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label} {required && <span className="text-teal-500 ml-0.5">*</span>}</label>
      <div className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-colors bg-slate-50 dark:bg-slate-800/60 ${error ? "border-red-400" : "border-slate-200 dark:border-slate-700 focus-within:border-teal-500"}`}>
        {Icon && <Icon className="w-4 h-4 text-blue-400 shrink-0" />}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full bg-transparent outline-none text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400" />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{t("contact_required")}</p>}
    </div>
  );
}