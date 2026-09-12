"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Search, AlertCircle, FileText, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";

export function CreditRepairSection() {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      number: "01",
      title: "Review Your Credit",
      description: "Understand what's on your credit report and what may be affecting your financial profile.",
      icon: Search,
    },
    {
      number: "02",
      title: "Identify Potential Issues",
      description: "Identify information that may be inaccurate, incomplete, outdated, or worth reviewing.",
      icon: AlertCircle,
    },
    {
      number: "03",
      title: "Dispute & Follow Up",
      description: "Receive guidance through the appropriate documentation and dispute process for information you believe is inaccurate.",
      icon: FileText,
    },
    {
      number: "04",
      title: "Build Better Credit Habits",
      description: "Learn practical habits that can help you manage credit responsibly going forward.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="credit-repair" className="py-20 lg:py-28 bg-slate-900 border-b border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-manrope">
              OUR SERVICE PROCESS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-manrope tracking-tight mb-4">
            A Clearer Path Toward <span className="gradient-accent-teal">Better Credit</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-inter">
            AAA CREDIT REPAIRS provides personalized guidance to help you understand your credit profile, identify potential issues, and take appropriate steps toward improving your financial position.
          </p>
        </div>

        {/* Process Flow Grid */}
        <div className="relative my-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={prefersReducedMotion ? {} : { y: -5 }}
                  className="relative dark-glass-card rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-indigo-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold font-manrope text-base shadow-md shadow-indigo-500/25">
                        {step.number}
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 text-teal-400 flex items-center justify-center">
                        <StepIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white font-manrope mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-inter">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-teal-400 font-manrope">
                    <span>Step {idx + 1} of 4</span>
                    {idx === 3 ? (
                      <span className="flex items-center gap-1 bg-teal-500/10 text-teal-400 font-bold px-2 py-0.5 rounded border border-teal-500/20 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Goal
                      </span>
                    ) : (
                      <span>Next →</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
