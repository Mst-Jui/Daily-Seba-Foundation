// app/membership/register/page.jsx
"use client";
import { useState, useMemo } from "react";
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
  { key: "basic", color: "from-blue-400 to-blue-500" },
  { key: "gold", color: "from-teal-400 to-teal-500" },
  { key: "platinum", color: "from-blue-600 to-teal-600" },
];

const fieldVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

// ── Decorative background: moon, floating circles, twinkling stars ──
function BackgroundDecor() {
  const stars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 2 + 2,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute top-10 right-8 sm:right-16 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-teal-100 to-teal-300 shadow-[0_0_60px_20px_rgba(45,212,191,0.35)]"
      >
        <div className="absolute top-3 left-4 w-3 h-3 rounded-full bg-teal-400/40" />
        <div className="absolute bottom-4 right-5 w-4 h-4 rounded-full bg-teal-400/30" />
        <div className="absolute top-8 right-3 w-2 h-2 rounded-full bg-teal-400/30" />
      </motion.div>

      {/* Twinkling stars */}
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{ opacity: [0.15, 1, 0.15], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Floating glow circles */}
      <motion.div
        animate={{ y: [0, -24, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-blue-600/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 -right-20 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full border border-teal-400/40"
      />
      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/3 w-5 h-5 rounded-full border border-blue-400/30"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/5 w-6 h-6 rounded-full border border-dashed border-teal-300/30"
      />
    </div>
  );
}

export default function MembershipRegisterPage() {
  const { t } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(1);
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
    <div className="relative min-h-screen bg-gradient-to-b from-[#0b1224] via-[#0f1b38] to-[#0a1220] text-white overflow-hidden pt-10">
      <BackgroundDecor />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10 sm:py-16">
        {step !== 3 && (
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-teal-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("membership_reg_back")}
          </button>
        )}

        {step !== 3 && (
          <>
            <div className="mb-8">
              <span className="inline-block bg-teal-500/15 text-teal-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {t("membership_reg_badge")}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {t("membership_reg_heading")}
              </h1>
              <p className="text-slate-400 text-sm sm:text-base">
                {t("membership_reg_subtitle")}
              </p>
            </div>

            <div className="flex items-center gap-2 mb-10">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 transition-colors
                      ${step >= s ? "bg-teal-500 text-white" : "bg-slate-800 text-slate-500"}`}
                  >
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s === 1 && (
                    <div className="h-0.5 flex-1 bg-slate-800 overflow-hidden rounded-full">
                      <motion.div
                        className="h-full bg-teal-500"
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
          {step === 1 && (
            <motion.div
              key="step1"
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.35 }}
              className="bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-md"
            >
              <h2 className="text-lg font-semibold mb-6">{t("membership_step1_title")}</h2>
              <div className="space-y-4">
                <FormField icon={User} label={t("membership_field_name")} value={form.name} onChange={handleChange("name")} error={errors.name} />
                <FormField icon={Phone} label={t("membership_field_phone")} value={form.phone} onChange={handleChange("phone")} error={errors.phone} type="tel" />
                <FormField icon={Mail} label={t("membership_field_email")} value={form.email} onChange={handleChange("email")} optional />
                <FormField icon={MapPin} label={t("membership_field_address")} value={form.address} onChange={handleChange("address")} optional />
                <FormField icon={CreditCard} label={t("membership_field_nid")} value={form.nid} onChange={handleChange("nid")} error={errors.nid} />
              </div>
              <Button onClick={goToStep2} size="lg" className="w-full mt-8 bg-teal-600 hover:bg-teal-500">
                {t("membership_step2_title")}
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={fieldVariants} initial="hidden" animate="visible" exit="exit">
              <h2 className="text-lg font-semibold mb-6">{t("membership_step2_title")}</h2>
              <div className="space-y-4 mb-8">
                {plans.map((plan) => (
                  <button key={plan.key} onClick={() => setSelectedPlan(plan.key)} className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center justify-between ${selectedPlan === plan.key ? "border-teal-500 bg-teal-500/10" : "border-slate-800 bg-slate-900/50"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center`}><Sparkles className="w-5 h-5 text-white" /></div>
                      <div className="text-left"><p className="font-semibold">{t(`membership_plan_${plan.key}`)}</p></div>
                    </div>
                    {selectedPlan === plan.key && <Check className="text-teal-500" />}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-teal-600">Submit</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-6"><Check className="w-8 h-8 text-white" /></div>
              <h2 className="text-2xl font-bold mb-2">{t("membership_success_title")}</h2>
              <div className="w-full max-w-sm rounded-2xl bg-slate-900 p-6 my-8 border border-slate-800">
                <p className="text-teal-400 font-bold">{form.name}</p>
                <p className="text-slate-400 font-mono">{generatedId}</p>
              </div>
              <Button onClick={() => window.print()} className="w-full max-w-sm bg-teal-600">Download</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FormField({ icon: Icon, label, value, onChange, error, type = "text", optional }) {
  return (
    <div>
      <label className="block text-sm text-slate-400 mb-1">{label}</label>
      <div className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 ${error ? "border-red-500" : "border-slate-800 bg-slate-900"}`}>
        <Icon className="w-4 h-4 text-teal-500" />
        <input type={type} value={value} onChange={onChange} className="w-full bg-transparent outline-none text-white" />
      </div>
    </div>
  );
}