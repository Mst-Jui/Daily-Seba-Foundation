// components/DealerFormSection.jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { Phone, Mail, User, MapPin, Building2, CheckCircle2 } from "lucide-react";
import Button from "../reusable/Button";
// import Button from "./reusable/Button";

const districts = [
  "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet",
  "Barisal", "Rangpur", "Mymensingh",
];

const divisions = [
  "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet",
  "Barisal", "Rangpur", "Mymensingh",
];

const initialForm = {
  name: "",
  phone: "",
  district: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

export default function DealerFormSection() {
  const { t } = useApp();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = t("dealer_required");
    if (!form.phone.trim()) {
      newErrors.phone = t("dealer_required");
    } else if (!/^[\d+\-\s]{6,}$/.test(form.phone)) {
      newErrors.phone = t("dealer_invalid_phone");
    }
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
      console.error(err);
      setStatus("idle");
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="dealer_form" className="w-full py-14 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-[1fr_1.4fr] bg-white dark:bg-gray-800"
        >
          {/* ── Left: Info panel ── */}
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 p-8 sm:p-10 flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <h3 className="relative text-2xl sm:text-3xl font-bold text-white leading-snug mb-4">
              {t("dealer_heading")}
            </h3>
            <p className="relative text-green-50 text-sm sm:text-base leading-relaxed mb-8">
              {t("dealer_subtitle")}
            </p>

            <div className="relative space-y-4">
              <a
                href={`tel:${t("dealer_phone").replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-white text-sm sm:text-base hover:opacity-80 transition-opacity"
              >
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                {t("dealer_phone")}
              </a>

              <a
                href={`mailto:${t("dealer_email")}`}
                className="flex items-center gap-3 text-white text-sm sm:text-base hover:opacity-80 transition-opacity break-all"
              >
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
                {t("dealer_email")}
              </a>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col items-center justify-center text-center py-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
                    className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 className="w-7 h-7 text-green-500" />
                  </motion.div>
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t("dealer_success_title")}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">
                    {t("dealer_success_desc")}
                  </p>
                  <Button onClick={resetForm} size="md" variant="outline">
                    {t("dealer_success_btn")}
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      icon={User}
                      label={t("dealer_field_name")}
                      placeholder={t("dealer_field_name_ph")}
                      value={form.name}
                      onChange={handleChange("name")}
                      error={errors.name}
                    />
                    <Field
                      icon={Phone}
                      label={t("dealer_field_phone")}
                      placeholder={t("dealer_field_phone_ph")}
                      value={form.phone}
                      onChange={handleChange("phone")}
                      error={errors.phone}
                      type="tel"
                    />
                  </div>

                  <SelectField
                    icon={MapPin}
                    label={t("dealer_field_district")}
                    placeholder={t("dealer_field_district_ph")}
                    value={form.district}
                    onChange={handleChange("district")}
                    options={districts}
                    error={errors.district}
                  />

                  <Field
                    icon={Building2}
                    label={t("dealer_field_address")}
                    placeholder={t("dealer_field_address_ph")}
                    value={form.address}
                    onChange={handleChange("address")}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field
                      label={t("dealer_field_city")}
                      placeholder={t("dealer_field_city_ph")}
                      value={form.city}
                      onChange={handleChange("city")}
                    />
                    <SelectField
                      label={t("dealer_field_state")}
                      placeholder={t("dealer_field_state_ph")}
                      value={form.state}
                      onChange={handleChange("state")}
                      options={divisions}
                    />
                  </div>

                  <Field
                    label={t("dealer_field_zip")}
                    placeholder={t("dealer_field_zip_ph")}
                    value={form.zip}
                    onChange={handleChange("zip")}
                  />

                  <Button
                    type="submit"
                    size="md"
                    variant="primary"
                    disabled={status === "submitting"}
                    className="w-full mt-2"
                  >
                    {status === "submitting" ? t("dealer_submitting") : t("dealer_submit")}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Reusable text input ──
function Field({ icon: Icon, label, placeholder, value, onChange, error, type = "text" }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-colors bg-gray-50 dark:bg-gray-900/40
          ${
            error
              ? "border-red-400"
              : "border-gray-200 dark:border-gray-700 focus-within:border-green-500"
          }`}
      >
        {Icon && <Icon className="w-4 h-4 text-gray-400 shrink-0" />}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

// ── Reusable select input ──
function SelectField({ icon: Icon, label, placeholder, value, onChange, options, error }) {
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-colors bg-gray-50 dark:bg-gray-900/40
          ${
            error
              ? "border-red-400"
              : "border-gray-200 dark:border-gray-700 focus-within:border-green-500"
          }`}
      >
        {Icon && <Icon className="w-4 h-4 text-gray-400 shrink-0" />}
        <select
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-sm text-gray-800 dark:text-gray-100 appearance-none cursor-pointer"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}