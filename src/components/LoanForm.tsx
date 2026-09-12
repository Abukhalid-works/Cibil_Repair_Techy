"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2, FileText, Info } from "lucide-react";
import { loanFormSchema, type LoanFormData } from "@/lib/validation";
import { submitToFormspree } from "@/lib/forms";

export function LoanForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      loanType: "Personal Loan",
      desiredAmount: "",
      employmentStatus: "Employed",
      monthlyIncome: "",
      state: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = async (data: LoanFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const endpoint = process.env.NEXT_PUBLIC_LOAN_FORM_ENDPOINT || "https://formspree.io/f/xnpqrryb";

    const response = await submitToFormspree(endpoint, {
      ...data,
      formType: "Loan Assistance Request",
      submittedAt: new Date().toISOString(),
    });

    setIsSubmitting(false);

    if (response.success) {
      setSubmitSuccess(true);
      reset();
    } else {
      setErrorMessage(
        response.message || "Something went wrong. Please try again or contact us directly at 9346437039."
      );
    }
  };

  return (
    <div id="loan-form" className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E2E8F0] subtle-shadow">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#E2E8F0]">
          <FileText className="w-5 h-5 text-[#16835B]" />
          <h3 className="text-xl font-bold text-[#0B1F3A] font-heading">
            Loan Assistance Request Form
          </h3>
        </div>

        {submitSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#E8F5E9] border border-[#16835B]/30 rounded-2xl p-8 text-center space-y-4"
          >
            <div className="w-14 h-14 rounded-full bg-[#16835B] text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-extrabold text-[#0B1F3A] font-heading">
              Request Received
            </h4>
            <p className="text-sm text-[#475569] max-w-lg mx-auto leading-relaxed">
              Thank you! Your loan assistance request has been received. Our team will review your information and contact you.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2.5 rounded-xl text-xs font-bold font-heading text-[#0B1F3A] bg-white border border-[#E2E8F0] hover:bg-slate-50 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold font-heading uppercase tracking-wider text-[#0B1F3A] mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  placeholder="Jane Smith"
                  {...register("fullName")}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.fullName ? "border-red-400 focus:ring-red-300" : "border-[#E2E8F0]"
                  } focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none transition-all`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="loanEmail" className="block text-xs font-bold font-heading uppercase tracking-wider text-[#0B1F3A] mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="loanEmail"
                  type="email"
                  placeholder="jane.smith@example.com"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email ? "border-red-400 focus:ring-red-300" : "border-[#E2E8F0]"
                  } focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none transition-all`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Phone & Loan Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="loanPhone" className="block text-xs font-bold font-heading uppercase tracking-wider text-[#0B1F3A] mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="loanPhone"
                  type="tel"
                  placeholder="9346437039"
                  {...register("phone")}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.phone ? "border-red-400 focus:ring-red-300" : "border-[#E2E8F0]"
                  } focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none transition-all`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="loanType" className="block text-xs font-bold font-heading uppercase tracking-wider text-[#0B1F3A] mb-2">
                  Loan Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="loanType"
                  {...register("loanType")}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none transition-all"
                >
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Business Loan">Business Loan</option>
                  <option value="Auto Loan">Auto Loan</option>
                  <option value="Debt Consolidation">Debt Consolidation</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Row 3: Desired Amount & Employment Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="desiredAmount" className="block text-xs font-bold font-heading uppercase tracking-wider text-[#0B1F3A] mb-2">
                  Desired Loan Amount <span className="text-red-500">*</span>
                </label>
                <input
                  id="desiredAmount"
                  type="text"
                  placeholder="e.g. ₹5,00,000 or ₹10,00,000"
                  {...register("desiredAmount")}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.desiredAmount ? "border-red-400 focus:ring-red-300" : "border-[#E2E8F0]"
                  } focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none transition-all`}
                />
                {errors.desiredAmount && (
                  <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.desiredAmount.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="employmentStatus" className="block text-xs font-bold font-heading uppercase tracking-wider text-[#0B1F3A] mb-2">
                  Employment Status <span className="text-red-500">*</span>
                </label>
                <select
                  id="employmentStatus"
                  {...register("employmentStatus")}
                  className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none transition-all"
                >
                  <option value="Employed">Employed (Salaried)</option>
                  <option value="Self-Employed">Self-Employed Professional</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Row 4: Monthly Income & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="monthlyIncome" className="block text-xs font-bold font-heading uppercase tracking-wider text-[#0B1F3A] mb-2">
                  Approximate Monthly Income <span className="text-red-500">*</span>
                </label>
                <input
                  id="monthlyIncome"
                  type="text"
                  placeholder="e.g. ₹65,000 / month"
                  {...register("monthlyIncome")}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.monthlyIncome ? "border-red-400 focus:ring-red-300" : "border-[#E2E8F0]"
                  } focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none transition-all`}
                />
                {errors.monthlyIncome && (
                  <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.monthlyIncome.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="state" className="block text-xs font-bold font-heading uppercase tracking-wider text-[#0B1F3A] mb-2">
                  State / Region <span className="text-red-500">*</span>
                </label>
                <input
                  id="state"
                  type="text"
                  placeholder="e.g. Maharashtra, Telangana, Delhi"
                  {...register("state")}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.state ? "border-red-400 focus:ring-red-300" : "border-[#E2E8F0]"
                  } focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none transition-all`}
                />
                {errors.state && (
                  <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="loanMessage" className="block text-xs font-bold font-heading uppercase tracking-wider text-[#0B1F3A] mb-2">
                Additional Details / Message <span className="text-[#64748B] font-normal">(Optional)</span>
              </label>
              <textarea
                id="loanMessage"
                rows={3}
                placeholder="Mention any specific loan requirements or timeline..."
                {...register("message")}
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#0B1F3A]/20 focus:border-[#0B1F3A] bg-[#F8FAFC] text-sm text-[#0F172A] focus:outline-none transition-all resize-y"
              />
            </div>

            {/* Consent Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("consent")}
                  className="mt-1 w-4 h-4 rounded text-[#0B1F3A] border-[#E2E8F0] focus:ring-[#0B1F3A]"
                />
                <span className="text-xs text-[#475569] leading-relaxed">
                  I consent to allow <strong>AAA CREDIT REPAIRS</strong> to review my loan assistance request and contact me regarding available options. <span className="text-red-500">*</span>
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.consent.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl text-base font-bold font-heading text-white bg-[#0B1F3A] hover:bg-[#16325B] shadow-md hover:shadow-lg disabled:opacity-60 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#16835B]" />
                  <span>Submitting Loan Request...</span>
                </>
              ) : (
                <span>Submit Loan Request</span>
              )}
            </button>
          </form>
        )}

        {/* Loan Disclaimer Note */}
        <div className="mt-6 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#64748B]">
          <Info className="w-4 h-4 text-[#0B1F3A] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Disclaimer:</strong> Submitting this form does not guarantee loan approval. Loan availability, rates, terms, and approval are subject to applicable eligibility requirements and lender criteria.
          </p>
        </div>
      </div>
    </div>
  );
}
