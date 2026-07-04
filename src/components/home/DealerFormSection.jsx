"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Phone, Mail, User, MapPin, Building2, CheckCircle2 } from "lucide-react";
import Button from "../reusable/Button";

const districts = ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Mymensingh"];
const divisions = ["Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Mymensingh"];

const initialForm = { name: "", phone: "", district: "", address: "", city: "", state: "", zip: "" };

const fieldReveal = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" } }),
};

export default function DealerFormSection() {
  const { t } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = t("dealer_required");
    if (!form.phone.trim()) newErrors.phone = t("dealer_required");
    else if (!/^[\d+\-\s]{6,}$/.test(form.phone)) newErrors.phone = t("dealer_invalid_phone");
    if (!form.district) newErrors.district = t("dealer_required");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/dealer-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch (err) {
      setStatus("idle");
    }
  };

  const resetForm = () => { setForm(initialForm); setStatus("idle"); };

  return (
    <section id="dealer_form" className="relative w-full py-14 sm:py-20 md:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl sm:rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-[1fr_1.4fr] bg-white dark:bg-gray-800 overflow-hidden"
        >
          <div className="relative bg-gradient-to-br from-blue-600 to-teal-500 p-8 sm:p-10 flex flex-col justify-center text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">{t("dealer_heading")}</h3>
            <p className="text-blue-50 text-sm sm:text-base mb-8">{t("dealer_subtitle")}</p>
            <div className="space-y-4">
              <a href={`tel:${t("dealer_phone").replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm sm:text-base hover:opacity-80">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0"><Phone className="w-4 h-4" /></span>
                {t("dealer_phone")}
              </a>
              <a href={`mailto:${t("dealer_email")}`} className="flex items-center gap-3 text-sm sm:text-base hover:opacity-80 break-all">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0"><Mail className="w-4 h-4" /></span>
                {t("dealer_email")}
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10 text-center">
                  <CheckCircle2 className="w-14 h-14 sm:w-16 sm:h-16 text-teal-500 mb-4" />
                  <h4 className="text-lg sm:text-xl font-bold mb-2">{t("dealer_success_title")}</h4>
                  <Button onClick={resetForm} variant="outline" className="mt-4">{t("dealer_success_btn")}</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field custom={0} icon={User} label={t("dealer_field_name")} value={form.name} onChange={handleChange("name")} error={errors.name} />
                    <Field custom={1} icon={Phone} label={t("dealer_field_phone")} value={form.phone} onChange={handleChange("phone")} error={errors.phone} type="tel" />
                  </div>
                  <SelectField custom={2} icon={MapPin} label={t("dealer_field_district")} value={form.district} onChange={handleChange("district")} options={districts} error={errors.district} />
                  <Field custom={3} icon={Building2} label={t("dealer_field_address")} value={form.address} onChange={handleChange("address")} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field custom={4} label={t("dealer_field_city")} value={form.city} onChange={handleChange("city")} />
                    <SelectField custom={5} label={t("dealer_field_state")} value={form.state} onChange={handleChange("state")} options={divisions} />
                  </div>
                  <Button type="submit" disabled={status === "submitting"} className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                    {status === "submitting" ? t("dealer_submitting") : t("dealer_submit")}
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ icon: Icon, label, value, onChange, error, type = "text", custom = 0 }) {
  return (
    <motion.div custom={custom} variants={fieldReveal} initial="hidden" animate="visible">
      <label className="block text-xs sm:text-sm font-semibold mb-1 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{label}</label>
      <div className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${error ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}>
        {Icon && <Icon className="w-4 h-4 text-blue-400" />}
        <input type={type} value={value} onChange={onChange} className="w-full bg-transparent outline-none text-sm" />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </motion.div>
  );
}

function SelectField({ icon: Icon, label, value, onChange, options, error, custom = 0 }) {
  return (
    <motion.div custom={custom} variants={fieldReveal} initial="hidden" animate="visible">
      <label className="block text-xs sm:text-sm font-semibold mb-1 bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{label}</label>
      <div className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 ${error ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}>
        {Icon && <Icon className="w-4 h-4 text-blue-400" />}
        <select value={value} onChange={onChange} className="w-full bg-transparent outline-none text-sm cursor-pointer">
          <option value="" disabled>Select...</option>
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </motion.div>
  );
}