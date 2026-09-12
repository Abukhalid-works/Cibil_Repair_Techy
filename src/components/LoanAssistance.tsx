"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Building2,
  Car,
  Layers,
  HelpCircle,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { loanFormSchema, type LoanFormData } from "@/lib/validation";
import { submitToFormspree } from "@/lib/forms";

export function LoanAssistance() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<LoanFormData>({
    resolver: zodResolver(loanFormSchema),
    defaultValues: {
      loanType: "Personal Loan",
      desiredAmount: "₹5 Lakhs - ₹15 Lakhs",
      employmentStatus: "Salaried (Private / Govt)",
      monthlyIncome: "₹50,000 - ₹1,00,000",
      state: "",
      fullName: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
    },
  });

  const selectedLoanType = watch("loanType");

  const loanCategories = [
    {
      type: "Personal Loan",
      desc: "Unsecured loan guidance for personal expense consolidation.",
      icon: User,
    },
    {
      type: "Business Loan",
      desc: "Capital assistance and commercial credit line guidance.",
      icon: Building2,
    },
    {
      type: "Auto Loan",
      desc: "Vehicle financing and re-financing consulting.",
      icon: Car,
    },
    {
      type: "Debt Consolidation",
      desc: "Streamline high-interest debts into manageable payoff schedules.",
      icon: Layers,
    },
    {
      type: "Other Inquiry",
      desc: "Custom financial assistance and loan qualification guidance.",
      icon: HelpCircle,
    },
  ];

  const handleCategorySelect = (categoryType: string) => {
    setValue("loanType", categoryType);
    setCurrentStep(2);
  };

  const handleNextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger("loanType");
    } else if (currentStep === 2) {
      isValid = await trigger(["desiredAmount", "employmentStatus", "monthlyIncome", "state"]);
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: LoanFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const endpoint =
      process.env.NEXT_PUBLIC_LOAN_FORM_ENDPOINT || "https://formspree.io/f/xnpqrryb";

    const response = await submitToFormspree(endpoint, {
      ...data,
      formType: "Loan Assistance Lead Capture",
      submittedAt: new Date().toISOString(),
    });

    setIsSubmitting(false);

    if (response.success) {
      setSubmitSuccess(true);
      reset();
    } else {
      setErrorMessage(
        response.message ||
          "Something went wrong. Please try again or contact us directly at 9346437039."
      );
    }
  };

  return (
    <section id="loan-assistance" className="py-20 lg:py-32 bg-slate-900 border-b border-slate-800/80 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-manrope">
              SECONDARY LEAD SERVICE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-manrope tracking-tight mb-4">
            Loan Assistance <span className="gradient-accent-teal">Consulting</span>
          </h2>
          <p className="text-base text-slate-400 font-inter">
            Explore options for personal, business, auto, or debt consolidation loans tailored to your situation.
          </p>
        </div>

        {/* Form Container */}
        <div className="dark-glass-card rounded-3xl p-6 sm:p-10 border border-slate-800/90 shadow-2xl relative overflow-hidden">
          
          {/* Progress Tracker */}
          {!submitSuccess && (
            <div className="mb-8 max-w-xl mx-auto space-y-2">
              <div className="flex items-center justify-between text-xs font-bold font-manrope text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                    {currentStep}
                  </span>
                  <span>Step {currentStep} of {totalSteps}</span>
                </span>
                <span className="text-teal-400">
                  {currentStep === 1 && "Select Loan Type"}
                  {currentStep === 2 && "Financial Parameters"}
                  {currentStep === 3 && "Contact & Authorize"}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-400 rounded-full"
                />
              </div>
            </div>
          )}

          {/* Success Screen */}
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
                Loan Request Submitted!
              </h3>
              <p className="text-base text-slate-300 max-w-lg mx-auto leading-relaxed font-inter">
                Your details have been recorded. A loan assistance specialist from <strong>AAA CREDIT REPAIRS</strong> will evaluate your parameters and contact you shortly.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitSuccess(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold font-manrope text-slate-200 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 flex items-start gap-3 text-red-200 text-sm font-inter">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <AnimatePresence mode="wait">
                
                {/* STEP 1: Loan Type Cards */}
                {currentStep === 1 && (
                  <motion.div
                    key="loanStep1"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white font-manrope mb-1">
                        Select What Type of Financing You Need
                      </h3>
                      <p className="text-xs text-slate-400 font-inter">
                        Click a category card below to proceed.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {loanCategories.map((cat) => {
                        const isSelected = selectedLoanType === cat.type;
                        const CategoryIcon = cat.icon;

                        return (
                          <div
                            key={cat.type}
                            onClick={() => handleCategorySelect(cat.type)}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                              isSelected
                                ? "bg-slate-800 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/20"
                                : "bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                  isSelected
                                    ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white"
                                    : "bg-slate-800 border border-slate-700 text-slate-300"
                                }`}
                              >
                                <CategoryIcon className="w-5 h-5" />
                              </div>
                              {isSelected && (
                                <span className="w-6 h-6 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center">
                                  <Check className="w-4 h-4 stroke-[3]" />
                                </span>
                              )}
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-white font-manrope mb-1">
                                {cat.type}
                              </h4>
                              <p className="text-xs text-slate-400 leading-relaxed font-inter">
                                {cat.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Financial Parameters */}
                {currentStep === 2 && (
                  <motion.div
                    key="loanStep2"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white font-manrope mb-1">
                        Financial Profile Parameters
                      </h3>
                      <p className="text-xs text-slate-400 font-inter">
                        Help us understand your request parameters for proper loan guidance.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
                      <div>
                        <label className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                          Desired Amount <span className="text-red-400">*</span>
                        </label>
                        <select
                          {...register("desiredAmount")}
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                        >
                          <option value="₹1 Lakh - ₹5 Lakhs">₹1 Lakh - ₹5 Lakhs</option>
                          <option value="₹5 Lakhs - ₹15 Lakhs">₹5 Lakhs - ₹15 Lakhs</option>
                          <option value="₹15 Lakhs - ₹30 Lakhs">₹15 Lakhs - ₹30 Lakhs</option>
                          <option value="₹30 Lakhs - ₹50 Lakhs">₹30 Lakhs - ₹50 Lakhs</option>
                          <option value="₹50 Lakhs+">₹50 Lakhs+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                          Employment Status <span className="text-red-400">*</span>
                        </label>
                        <select
                          {...register("employmentStatus")}
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all"
                        >
                          <option value="Salaried (Private / Govt)">Salaried (Private / Govt)</option>
                          <option value="Self-Employed / Business Owner">Self-Employed / Business Owner</option>
                          <option value="Professional (Doctor, CA, etc.)">Professional (Doctor, CA, etc.)</option>
                          <option value="Freelancer / Contractor">Freelancer / Contractor</option>
                          <option value="Retired">Retired</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-inter">
                      <div>
                        <label className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                          Estimated Monthly Income <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. ₹50,000 / month"
                          {...register("monthlyIncome")}
                          className={`w-full px-4 py-3.5 rounded-xl border ${
                            errors.monthlyIncome ? "border-red-500" : "border-slate-700"
                          } bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all`}
                        />
                        {errors.monthlyIncome && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.monthlyIncome.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                          State / Region <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Maharashtra, Telangana, Delhi"
                          {...register("state")}
                          className={`w-full px-4 py-3.5 rounded-xl border ${
                            errors.state ? "border-red-500" : "border-slate-700"
                          } bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all`}
                        />
                        {errors.state && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Contact & Authorization */}
                {currentStep === 3 && (
                  <motion.div
                    key="loanStep3"
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -25 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white font-manrope mb-1">
                        Where Should We Send Your Loan Guidance?
                      </h3>
                      <p className="text-xs text-slate-400 font-inter">
                        Provide your contact details so an advisor can follow up.
                      </p>
                    </div>

                    <div className="space-y-4 font-inter">
                      <div>
                        <label className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                          Full Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          {...register("fullName")}
                          className={`w-full px-4 py-3.5 rounded-xl border ${
                            errors.fullName ? "border-red-500" : "border-slate-700"
                          } bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all`}
                        />
                        {errors.fullName && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="john@example.com"
                            {...register("email")}
                            className={`w-full px-4 py-3.5 rounded-xl border ${
                              errors.email ? "border-red-500" : "border-slate-700"
                            } bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                            Phone Number <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            placeholder="9346437039"
                            {...register("phone")}
                            className={`w-full px-4 py-3.5 rounded-xl border ${
                              errors.phone ? "border-red-500" : "border-slate-700"
                            } bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all`}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            {...register("consent")}
                            className="mt-1 w-4 h-4 rounded text-indigo-600 border-slate-700 bg-slate-900 focus:ring-indigo-500"
                          />
                          <span className="text-xs text-slate-400 leading-relaxed font-inter">
                            I consent to allow <strong>AAA CREDIT REPAIRS</strong> to review my details and contact me regarding loan assistance guidance. <span className="text-red-400">*</span>
                          </span>
                        </label>
                        {errors.consent && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.consent.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center gap-2.5 text-xs text-slate-400 font-inter">
                      <Lock className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>
                        <strong>No Direct Lender Approval Guarantee:</strong> AAA CREDIT REPAIRS provides lead consulting and referral guidance.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold font-manrope text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="gradient-btn-indigo flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white font-manrope cursor-pointer"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-4 h-4 text-teal-300" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="gradient-btn-indigo flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white font-manrope disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-teal-300" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Loan Request</span>
                        <ShieldCheck className="w-4 h-4 text-teal-300" />
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
