"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Phone, Mail, MapPin, Send, CheckCircle2} from "lucide-react";
import Button from "@/components/reusable/Button";
import { FaFacebook } from "react-icons/fa";

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 sm:pt-28 md:pt-32 pb-20 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-green-500 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 block">
            {t("contact_page_badge")}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("contact_page_heading")}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {t("contact_page_subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {[
              { icon: Phone, label: t("contact_phone_label"), value: "+880 1401-884409", href: "tel:+8801401884409" },
              { icon: Mail, label: t("contact_email_label"), value: "dailysebafoundation@gmail.com", href: "mailto:dailysebafoundation@gmail.com" },
              { icon: MapPin, label: t("contact_address_label"), value: t("contact_address_value"), href: null },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 flex items-start gap-4"
              >
                <span className="w-11 h-11 rounded-xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-green-500" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-1 uppercase tracking-wide">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 hover:text-green-500 transition-colors break-all"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200">
                      {item.value}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5"
            >
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wide">
                {t("contact_social_label")}
              </p>
              <a
                href="https://facebook.com/dailysebafoundation"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-green-500 transition-colors"
              >
                <FaFacebook className="w-4 h-4 text-blue-600" />
                Daily Seba Foundation
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 }}
              className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 h-48 sm:h-56"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0!2d91.3950!3d24.9045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU0JzE2LjIiTiA5McKwMjMnNDIuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-7 h-7 text-green-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t("contact_success_title")}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">
                    {t("contact_success_desc")}
                  </p>
                  <Button onClick={() => setStatus("idle")} size="md" variant="outline">
                    {t("contact_send_another")}
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6">
                    {t("contact_form_heading")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label={t("contact_field_name")} placeholder={t("contact_field_name_ph")} value={form.name} onChange={handleChange("name")} error={errors.name} t={t} required />
                    <Field label={t("contact_field_phone")} placeholder={t("contact_field_phone_ph")} value={form.phone} onChange={handleChange("phone")} error={errors.phone} t={t} type="tel" required />
                  </div>
                  <Field label={t("contact_field_subject")} placeholder={t("contact_field_subject_ph")} value={form.subject} onChange={handleChange("subject")} t={t} />
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      {t("contact_field_message")}
                      <span className="text-green-500 ml-0.5">*</span>
                    </label>
                    <textarea rows={5} value={form.message} onChange={handleChange("message")} placeholder={t("contact_field_message_ph")} className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900/40 placeholder:text-gray-400 outline-none resize-none transition-colors ${errors.message ? "border-red-400" : "border-gray-200 dark:border-gray-700 focus:border-green-500"}`} />
                    {errors.message && <p className="text-xs text-red-500 mt-1">{t("contact_required")}</p>}
                  </div>
                  <Button type="submit" size="md" variant="primary" disabled={status === "submitting"} className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    {status === "submitting" ? t("contact_submitting") : t("contact_submit")}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, error, type = "text", required, t }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
        {required && <span className="text-green-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-900/40 placeholder:text-gray-400 outline-none transition-colors ${error ? "border-red-400" : "border-gray-200 dark:border-gray-700 focus:border-green-500"}`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{t("contact_required")}</p>}
    </div>
  );
}