"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Search,
  FileText,
  TrendingUp,
  Sparkles,
  Check,
  Building2,
} from "lucide-react";
import { submitToFormspree } from "@/lib/forms";

const wizardSchema = z.object({
  serviceType: z.string().min(1, "Please select what you'd like help with"),
  primaryConcern: z.string().min(1, "Please select your primary credit concern"),
  situationDetails: z.string().trim().optional(),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(15, "Phone number is too long"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to allow AAA CREDIT REPAIRS to contact you regarding your request.",
  }),
});

export type WizardFormData = z.infer<typeof wizardSchema>;

export function MultiStepWizard() {
  const prefersReducedMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      serviceType: "Credit Repair & Dispute Guidance",
      primaryConcern: "Inaccurate Late Payments or Accounts",
      situationDetails: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      consent: false,
    },
  });

  const selectedService = watch("serviceType");
  const selectedConcern = watch("primaryConcern");

  const serviceOptions = [
    {
      title: "Credit Repair & Dispute Guidance",
      desc: "Identify and dispute potentially inaccurate, incomplete, or outdated report entries.",
      icon: Search,
    },
    {
      title: "Credit Profile Audit & Review",
      desc: "Comprehensive evaluation of factors impacting your credit report and metrics.",
      icon: FileText,
    },
    {
      title: "Credit Improvement Habits",
      desc: "Personalized advice on building payment discipline and managing credit lines.",
      icon: TrendingUp,
    },
    {
      title: "Loan Assistance Inquiry",
      desc: "Review available options for personal, business, or auto loan guidance.",
      icon: Building2,
    },
  ];

  const concernOptions = [
    "Inaccurate Late Payments or Accounts",
    "Unrecognized Inquiries / Accounts",
    "Collection or Charge-Off Errors",
    "Duplicate Bureau Listings",
    "General Credit Confusion & Guidance",
  ];

  const handleNextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger("serviceType");
    } else if (currentStep === 2) {
      isValid = await trigger(["primaryConcern", "situationDetails"]);
    } else if (currentStep === 3) {
      isValid = await trigger(["firstName", "lastName", "email", "phone"]);
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: WizardFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const endpoint =
      process.env.NEXT_PUBLIC_CREDIT_FORM_ENDPOINT || "https://formspree.io/f/xwlkzzjo";

    const response = await submitToFormspree(endpoint, {
      ...data,
      formType: "Interactive Multi-Step Lead Assessment",
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
    <div id="assessment-form" className="py-16 lg:py-24 bg-slate-900 border-b border-slate-800/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="dark-glass-card rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800/90 shadow-2xl relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-extrabold font-manrope tracking-wider uppercase mb-3 shadow-md">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-slate-200">INTERACTIVE ASSESSMENT WIZARD</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-manrope tracking-tight mb-3">
              Get Your Free Credit Assessment
            </h2>
            <p className="text-base text-slate-400 font-inter">
              Complete our 4-step guided assessment to help AAA CREDIT REPAIRS evaluate your credit goals.
            </p>
          </div>

          {/* Progress Tracker */}
          {!submitSuccess && (
            <div className="mb-10 max-w-xl mx-auto space-y-3">
              <div className="flex items-center justify-between text-xs font-bold font-manrope text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px]">
                    {currentStep}
                  </span>
                  <span>Step {currentStep} of {totalSteps}</span>
                </span>
                <span className="text-teal-400">
                  {currentStep === 1 && "Goal Selection"}
                  {currentStep === 2 && "Situation Details"}
                  {currentStep === 3 && "Contact Details"}
                  {currentStep === 4 && "Review & Consent"}
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                <motion.div
                  initial={false}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
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
                Thank You! Request Submitted
              </h3>
              <p className="text-base text-slate-300 max-w-lg mx-auto leading-relaxed font-inter">
                Your assessment details have been successfully received. A dedicated specialist from <strong>AAA CREDIT REPAIRS</strong> will review your request and reach out soon.
              </p>
              <div className="pt-2">
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
                <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 flex items-start gap-3 text-red-200 text-sm">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* STEP 1: Service Type Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white font-manrope mb-1">
                        What would you like help with?
                      </h3>
                      <p className="text-xs text-slate-400">
                        Select the primary area you want to address with AAA CREDIT REPAIRS.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {serviceOptions.map((option) => {
                        const isSelected = selectedService === option.title;
                        const ServiceIcon = option.icon;
                        return (
                          <div
                            key={option.title}
                            onClick={() => setValue("serviceType", option.title)}
                            className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                              isSelected
                                ? "bg-slate-800 border-indigo-500 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/20"
                                : "bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700"
                            }`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white" : "bg-slate-800 border border-slate-700 text-slate-300"}`}>
                                <ServiceIcon className="w-5 h-5" />
                              </div>
                              {isSelected && (
                                <span className="w-6 h-6 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center">
                                  <Check className="w-4 h-4 stroke-[3]" />
                                </span>
                              )}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white font-manrope mb-1">
                                {option.title}
                              </h4>
                              <p className="text-xs text-slate-400 leading-relaxed font-inter">
                                {option.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {errors.serviceType && (
                      <p className="text-xs text-red-400 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {errors.serviceType.message}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* STEP 2: Credit Concerns & Details */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white font-manrope mb-1">
                        Select your primary credit concern
                      </h3>
                      <p className="text-xs text-slate-400">
                        Choose the topic that best describes what you'd like to address.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {concernOptions.map((concern) => {
                        const isSelected = selectedConcern === concern;
                        return (
                          <div
                            key={concern}
                            onClick={() => setValue("primaryConcern", concern)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? "bg-slate-800 border-indigo-500 ring-2 ring-indigo-500/20 font-bold"
                                : "bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700"
                            }`}
                          >
                            <span className="text-sm text-slate-200 font-medium">{concern}</span>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? "bg-teal-400 border-teal-400 text-slate-950" : "border-slate-700"}`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div>
                      <label htmlFor="wizardSituationDetails" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                        Additional details <span className="text-slate-500 font-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="wizardSituationDetails"
                        rows={3}
                        placeholder="Describe any specific credit concerns or goals..."
                        {...register("situationDetails")}
                        className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all resize-y"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Personal & Contact Information */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white font-manrope mb-1">
                        Where should we send your assessment?
                      </h3>
                      <p className="text-xs text-slate-400">
                        Provide your basic contact information so an advisor can follow up.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="wizardFirstName" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                          First Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="wizardFirstName"
                          type="text"
                          placeholder="John"
                          {...register("firstName")}
                          className={`w-full px-4 py-3.5 rounded-xl border ${errors.firstName ? "border-red-500" : "border-slate-700"} bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all`}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="wizardLastName" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                          Last Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="wizardLastName"
                          type="text"
                          placeholder="Doe"
                          {...register("lastName")}
                          className={`w-full px-4 py-3.5 rounded-xl border ${errors.lastName ? "border-red-500" : "border-slate-700"} bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all`}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="wizardEmail" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="wizardEmail"
                          type="email"
                          placeholder="john.doe@example.com"
                          {...register("email")}
                          className={`w-full px-4 py-3.5 rounded-xl border ${errors.email ? "border-red-500" : "border-slate-700"} bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="wizardPhone" className="block text-xs font-bold font-manrope uppercase tracking-wider text-slate-300 mb-2">
                          Phone Number <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="wizardPhone"
                          type="tel"
                          placeholder="9346437039"
                          {...register("phone")}
                          className={`w-full px-4 py-3.5 rounded-xl border ${errors.phone ? "border-red-500" : "border-slate-700"} bg-slate-900 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-all`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400">
                      <Lock className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>
                        <strong>Strict Data Protection:</strong> Your PAN, Aadhaar numbers, online banking credentials, or OTPs are never required for this assessment.
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Review Summary & Submission */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-white font-manrope mb-1">
                        Review & Submit Request
                      </h3>
                      <p className="text-xs text-slate-400">
                        Confirm your assessment summary before submitting.
                      </p>
                    </div>

                    <div className="bg-slate-900/80 rounded-2xl p-5 border border-slate-800 space-y-3 text-xs">
                      <div className="flex justify-between pb-2 border-b border-slate-800">
                        <span className="font-bold text-slate-300">Service Requested:</span>
                        <span className="text-teal-400 font-bold">{selectedService}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-slate-800">
                        <span className="font-bold text-slate-300">Primary Concern:</span>
                        <span className="text-slate-400">{selectedConcern}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-300">Contact Name:</span>
                        <span className="text-slate-400">
                          {watch("firstName")} {watch("lastName")}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          {...register("consent")}
                          className="mt-1 w-4 h-4 rounded text-indigo-600 border-slate-700 bg-slate-900 focus:ring-indigo-500"
                        />
                        <span className="text-xs text-slate-400 leading-relaxed font-inter">
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
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Controls */}
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
                        <span>Submit Free Assessment</span>
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
    </div>
  );
}
