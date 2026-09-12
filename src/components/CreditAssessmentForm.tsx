"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, AlertCircle, Loader2, Lock, HeartHandshake, Sparkles, SlidersHorizontal } from "lucide-react";
import { creditFormSchema, type CreditFormData } from "@/lib/validation";
import { submitToFormspree } from "@/lib/forms";
import { MultiStepWizard } from "@/components/MultiStepWizard";

export function CreditAssessmentForm() {
  const [formMode, setFormMode] = useState<"wizard" | "quick">("wizard");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreditFormData>({
    resolver: zodResolver(creditFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      helpType: "Credit Repair",
      situation: "",
      consent: false,
    },
  });

  const onSubmit = async (data: CreditFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const endpoint = process.env.NEXT_PUBLIC_CREDIT_FORM_ENDPOINT || "https://formspree.io/f/xwlkzzjo";

    const response = await submitToFormspree(endpoint, {
      ...data,
      formType: "Quick Credit Assessment",
      submittedAt: new Date().toISOString(),
    });

    setIsSubmitting(false);

    if (response.success) {
      setSubmitSuccess(true);
      reset(); // Clear form only on success
    } else {
      setErrorMessage(
        response.message || "Something went wrong. Please try again or contact us directly at 9346437039."
      );
    }
  };

  return (
    <section id="assessment-form" className="relative scroll-mt-20 py-12 bg-slate-900 border-b border-slate-800/80">
      {/* Mode Switcher Toggle Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-center">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-xl">
          <button
            type="button"
            onClick={() => setFormMode("wizard")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-manrope transition-all cursor-pointer ${
              formMode === "wizard"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Interactive Guided Assessment</span>
          </button>
          <button
            type="button"
            onClick={() => setFormMode("quick")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-manrope transition-all cursor-pointer ${
              formMode === "quick"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-teal-400" />
            <span>Quick 1-Page Form</span>
          </button>
        </div>
      </div>

      {formMode === "wizard" ? (
        <MultiStepWizard />
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="dark-glass-card rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800/90 shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-extrabold font-manrope tracking-wider uppercase mb-3 shadow-md">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span className="text-slate-200">QUICK ASSESSMENT FORM</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-manrope tracking-tight mb-3">
                Get Your Free Credit Assessment
              </h2>
              <p className="text-base text-slate-400 font-inter">
                Tell us a little about yourself and what you'd like help with. A member of AAA CREDIT REPAIRS will follow up with you promptly.
              </p>
            </div>

            {/* Success Banner */}
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-800/60 border border-teal-500/30 rounded-2xl p-8 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
                  <CheckCircle2 className="w-10 h-10 text-teal-300" />
                </div>
                <h3 className="text-2xl font-extrabold text-white font-manrope">
                  Thank You! Request Received
                </h3>
                <p className="text-base text-slate-300 max-w-lg mx-auto leading-relaxed font-inter">
                  Your assessment request has been successfully submitted. A credit specialist from <strong>AAA CREDIT REPAIRS</strong> will review your details and be in touch soon.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold font-manrope text-slate-200 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                {/* Network / Global Error Message */}
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 flex items-start gap-3 text-red-200 text-sm font-inter">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name Fields Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                      First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      {...register("firstName")}
                      className={`w-full px-4 py-3.5 rounded-xl border ${
                        errors.firstName ? "border-red-500" : "border-slate-700"
                      } bg-slate-900 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all`}
                    />
                    {errors.firstName && (
                      <p className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                      Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      {...register("lastName")}
                      className={`w-full px-4 py-3.5 rounded-xl border ${
                        errors.lastName ? "border-red-500" : "border-slate-700"
                      } bg-slate-900 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all`}
                    />
                    {errors.lastName && (
                      <p className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Fields Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      {...register("email")}
                      className={`w-full px-4 py-3.5 rounded-xl border ${
                        errors.email ? "border-red-500" : "border-slate-700"
                      } bg-slate-900 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all`}
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="9346437039"
                      {...register("phone")}
                      className={`w-full px-4 py-3.5 rounded-xl border ${
                        errors.phone ? "border-red-500" : "border-slate-700"
                      } bg-slate-900 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Inquiry Dropdown */}
                <div className="font-inter">
                  <label htmlFor="helpType" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                    What would you like help with? <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="helpType"
                    {...register("helpType")}
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                  >
                    <option value="Credit Repair">Credit Repair</option>
                    <option value="Understanding My Credit">Understanding My Credit</option>
                    <option value="Credit Improvement Guidance">Credit Improvement Guidance</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Situation Textarea */}
                <div className="font-inter">
                  <label htmlFor="situation" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                    Tell us about your situation <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="situation"
                    rows={4}
                    placeholder="Describe any credit concerns, report errors, or goals you'd like to discuss..."
                    {...register("situation")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all resize-y"
                  />
                </div>

                {/* Security Banner Note */}
                <div className="flex items-center gap-2.5 p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400 font-inter">
                  <Lock className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>
                    <strong>Privacy Guaranteed:</strong> We will never ask for your PAN, Aadhaar numbers, banking passwords, or OTPs through this initial public inquiry form.
                  </span>
                </div>

                {/* Consent Checkbox */}
                <div className="font-inter">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("consent")}
                      className="mt-1 w-4 h-4 rounded text-indigo-600 border-slate-700 bg-slate-900 focus:ring-indigo-500"
                    />
                    <span className="text-xs text-slate-400 leading-relaxed">
                      I consent to allow <strong>AAA CREDIT REPAIRS</strong> to contact me regarding my assessment request via phone, SMS, or email. <span className="text-red-400">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-1 text-xs text-red-400 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.consent.message}
                    </p>
                  )}
                </div>

                {/* Form Reassurance Note */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 font-inter">
                  <HeartHandshake className="w-4 h-4 text-teal-400" />
                  <span>Your information is handled responsibly and confidentially.</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gradient-btn-indigo w-full py-4 rounded-xl text-base font-bold font-manrope text-white shadow-lg disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-teal-300" />
                      <span>Submitting Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Get Your Free Credit Assessment</span>
                      <ShieldCheck className="w-5 h-5 text-teal-300" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}


