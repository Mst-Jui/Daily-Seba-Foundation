// app/membership/register/page.jsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Check,
  Download,
  Sparkles,
} from "lucide-react";
import Button from "@/components/reusable/Button";

const plans = [
  { key: "basic", color: "from-gray-400 to-gray-500" },
  { key: "gold", color: "from-amber-400 to-yellow-500" },
  { key: "platinum", color: "from-green-400 to-emerald-600" },
];

const fieldVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function MembershipRegisterPage() {
  const { t } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: form, 2: plan, 3: success
  const [selectedPlan, setSelectedPlan] = useState("gold");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    nid: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validateStep1 = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.phone.trim()) newErrors.phone = true;
    if (!form.nid.trim()) newErrors.nid = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep2 = () => {
    if (validateStep1()) setStep(2);
  };

  const generatedId = `DSF-${form.nid.slice(-4).padStart(4, "0") || "0000"}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-emerald-950 to-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-6 py-10 sm:py-16">
        {/* ── Back ── */}
        {step !== 3 && (
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("membership_reg_back")}
          </button>
        )}

        {step !== 3 && (
          <>
            {/* ── Header ── */}
            <div className="mb-8">
              <span className="inline-block bg-green-500/15 text-green-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {t("membership_reg_badge")}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {t("membership_reg_heading")}
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                {t("membership_reg_subtitle")}
              </p>
            </div>

            {/* ── Step indicator ── */}
            <div className="flex items-center gap-2 mb-10">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors
                      ${
                        step >= s
                          ? "bg-green-500 text-white"
                          : "bg-gray-800 text-gray-500"
                      }`}
                  >
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s === 1 && (
                    <div className="h-0.5 flex-1 bg-gray-800 overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-green-500"
                        initial={{ width: "0%" }}
                        animate={{ width: step >= 2 ? "100%" : "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <AnimatePresence mode="wait">
          {/* ── STEP 1: Personal Info ── */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm"
            >
              <h2 className="text-lg font-semibold mb-6">{t("membership_step1_title")}</h2>

              <div className="space-y-4">
                <FormField
                  icon={User}
                  label={t("membership_field_name")}
                  value={form.name}
                  onChange={handleChange("name")}
                  error={errors.name}
                  errorText={t("membership_required")}
                />
                <FormField
                  icon={Phone}
                  label={t("membership_field_phone")}
                  value={form.phone}
                  onChange={handleChange("phone")}
                  error={errors.phone}
                  errorText={t("membership_required")}
                  type="tel"
                />
                <FormField
                  icon={Mail}
                  label={t("membership_field_email")}
                  value={form.email}
                  onChange={handleChange("email")}
                  type="email"
                  optional
                />
                <FormField
                  icon={MapPin}
                  label={t("membership_field_address")}
                  value={form.address}
                  onChange={handleChange("address")}
                  optional
                />
                <FormField
                  icon={CreditCard}
                  label={t("membership_field_nid")}
                  value={form.nid}
                  onChange={handleChange("nid")}
                  error={errors.nid}
                  errorText={t("membership_required")}
                />
              </div>

              <Button
                onClick={goToStep2}
                size="lg"
                variant="primary"
                className="w-full mt-8"
              >
                {t("membership_step2_title")}
              </Button>
            </motion.div>
          )}

          {/* ── STEP 2: Choose Plan ── */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <h2 className="text-lg font-semibold mb-6">{t("membership_step2_title")}</h2>

              <div className="space-y-4 mb-8">
                {plans.map((plan) => (
                  <button
                    key={plan.key}
                    onClick={() => setSelectedPlan(plan.key)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between
                      ${
                        selectedPlan === plan.key
                          ? "border-green-500 bg-green-500/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center shrink-0`}
                      >
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold">{t(`membership_plan_${plan.key}`)}</p>
                        <p className="text-sm text-gray-400">
                          {t(`membership_plan_${plan.key}_desc`)}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                        ${selectedPlan === plan.key ? "border-green-500 bg-green-500" : "border-gray-500"}`}
                    >
                      {selectedPlan === plan.key && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  size="lg"
                  variant="outline"
                  className="flex-1"
                >
                  {t("membership_reg_back")}
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  size="lg"
                  variant="primary"
                  className="flex-1"
                >
                  {t("membership_submit")}
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Success ── */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-6"
              >
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
              </motion.div>

              <h2 className="text-2xl font-bold mb-2">{t("membership_success_title")}</h2>
              <p className="text-gray-400 mb-8 max-w-sm">{t("membership_success_desc")}</p>

              {/* ── Final Card ── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl shadow-black/40 bg-white mb-8"
              >
                <div className="flex items-center gap-2 px-5 pt-5 pb-3">
                  <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-green-400" />
                  </div>
                  <span className="font-bold text-gray-900 text-sm leading-tight text-left">
                    ডেইলি <span className="text-green-500">সেবা</span>
                    <br />
                    ফাউন্ডেশন
                  </span>
                </div>
                <div className="relative bg-gray-900 px-5 pt-4 pb-6">
                  <div className="absolute top-0 right-0 w-28 h-full bg-gradient-to-bl from-green-400 to-green-600 [clip-path:polygon(45%_0,100%_0,100%_100%,15%_100%)]" />
                  <p className="relative text-white font-bold text-lg tracking-wide mb-4 text-left">
                    {t("membership_card_title")}
                  </p>
                  <div className="relative space-y-3 max-w-[65%] text-left">
                    <div>
                      <span className="text-[11px] text-gray-300">
                        {t("membership_card_name_label")}
                      </span>
                      <div className="h-7 mt-1 rounded-md bg-green-500/90 flex items-center px-2">
                        <span className="text-[11px] text-white truncate">
                          {form.name || "—"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-300">
                        {t("membership_card_id_label")}
                      </span>
                      <div className="h-7 mt-1 rounded-md bg-green-500/90 flex items-center px-2">
                        <span className="text-[11px] text-white truncate">{generatedId}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <Button size="lg" variant="primary" className="flex-1 gap-2" onClick={() => window.print()}>
                  <Download className="w-4 h-4" />
                  {t("membership_download")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/")}
                >
                  {t("membership_done")}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FormField({ icon: Icon, label, value, onChange, error, errorText, type = "text", optional }) {
  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1.5">
        {label} {!optional && <span className="text-green-400">*</span>}
      </label>
      <div
        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 transition-colors
          ${error ? "border-red-500/60 bg-red-500/5" : "border-white/10 bg-white/5 focus-within:border-green-500"}`}
      >
        <Icon className="w-4 h-4 text-gray-400 shrink-0" />
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-500"
        />
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{errorText}</p>}
    </div>
  );
}