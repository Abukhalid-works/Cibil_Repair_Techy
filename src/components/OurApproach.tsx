"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, AlertCircle, ShieldCheck, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export function OurApproach() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      stepNumber: "01",
      title: "Review Your Credit",
      subtitle: "Comprehensive Tri-Bureau Report Audit",
      icon: Search,
      badge: "STEP 1: AUDIT",
      description:
        "We begin by examining your credit reports from major credit reporting agencies to uncover discrepancies, unauthorized inquiries, duplicate listings, and inaccurate negative marks.",
      features: [
        "In-depth analysis of line items and bureau reporting records",
        "Identification of inaccurate late payment entries and charge-offs",
        "Verification of outdated entries past statutory retention limits",
      ],
      impact: "Est. Audit Time: 24-48 Hours",
    },
    {
      id: 1,
      stepNumber: "02",
      title: "Identify Potential Issues",
      subtitle: "Inaccuracy & Dispute Target Categorization",
      icon: AlertCircle,
      badge: "STEP 2: STRATEGY",
      description:
        "Our team categorizes each erroneous item, mapping out targeted dispute strategies compliant with consumer credit protection standards.",
      features: [
        "Strategic grouping of unverified collection accounts",
        "Formulation of custom dispute documentation",
        "Prioritization of high-impact negative score factors",
      ],
      impact: "Dispute Roadmap Formulated",
    },
    {
      id: 2,
      stepNumber: "03",
      title: "Dispute & Follow Up",
      subtitle: "Active Bureau & Creditor Communication",
      icon: ShieldCheck,
      badge: "STEP 3: EXECUTION",
      description:
        "We handle official dispute submissions to credit bureaus and furnishers, continuously tracking responses, verifications, and deletion confirmations.",
      features: [
        "Formal dispute communication dispatched to credit bureaus",
        "Creditor direct verification challenge requests",
        "Active monitoring of 30-day bureau response windows",
      ],
      impact: "Direct Bureau Dispute Dispatch",
    },
    {
      id: 3,
      stepNumber: "04",
      title: "Build Better Credit Habits",
      subtitle: "Long-Term Score Growth & Habit Guidance",
      icon: TrendingUp,
      badge: "STEP 4: GROWTH",
      description:
        "Beyond repair, we equip you with personalized financial habits, utilization strategies, and credit line management techniques to sustain a strong credit profile long-term.",
      features: [
        "Personalized credit utilization ratio optimization targets",
        "Positive payment history building action plan",
        "Ongoing credit health monitoring best practices",
      ],
      impact: "Sustained Score Elevation",
    },
  ];

  return (
    <section id="our-approach" className="py-20 lg:py-32 bg-slate-900 border-t border-b border-slate-800/80 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-manrope">
              OUR PROVEN WORKFLOW
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-manrope tracking-tight mb-4">
            How AAA CREDIT REPAIRS <span className="gradient-accent-teal">Elevates Your Credit</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-inter">
            Explore our structured, step-by-step credit restoration methodology designed for maximum impact and compliance.
          </p>
        </div>

        {/* 2-Column Active Interactive Step-Switcher Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Vertical Tab Strip */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              const IconComponent = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? "bg-slate-800/90 border-indigo-500/60 shadow-xl shadow-indigo-500/10"
                      : "bg-slate-800/30 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${
                        isActive
                          ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30"
                          : "bg-slate-900 border border-slate-700/60 text-slate-400 group-hover:text-white"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-bold text-teal-400 font-manrope tracking-wider">
                          {step.stepNumber}
                        </span>
                      </div>
                      <h3 className={`text-base font-bold font-manrope ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-5 h-5 transition-transform ${
                      isActive ? "text-teal-400 translate-x-1" : "text-slate-600 group-hover:text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Motion-Faded Detail Panel */}
          <div className="lg:col-span-7">
            <div className="dark-glass-card rounded-3xl p-6 sm:p-10 border border-slate-800/90 shadow-2xl relative min-h-[440px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Badge & Step Label */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 font-inter">
                    <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold font-manrope">
                      {steps[activeStep].badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      Phase {activeStep + 1} of {steps.length}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-manrope tracking-tight mb-2">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-400 font-inter">
                      {steps[activeStep].subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-inter">
                    {steps[activeStep].description}
                  </p>

                  {/* Key Action Features */}
                  <div className="space-y-3 pt-2 font-inter">
                    {steps[activeStep].features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Metric Bar */}
                  <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between font-inter">
                    <span className="text-xs font-bold text-slate-400">Target Outcome:</span>
                    <span className="text-xs font-bold text-teal-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800 font-manrope">
                      {steps[activeStep].impact}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
