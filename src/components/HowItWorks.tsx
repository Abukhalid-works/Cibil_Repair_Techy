"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ClipboardCheck, FileSearch, Target, Compass, LifeBuoy, Sparkles } from "lucide-react";

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      num: "01",
      title: "FREE ASSESSMENT",
      desc: "Submit your inquiry form with basic details to begin your consultation.",
      icon: ClipboardCheck,
    },
    {
      num: "02",
      title: "CREDIT PROFILE REVIEW",
      desc: "Our team reviews your credit report factors and overall history.",
      icon: FileSearch,
    },
    {
      num: "03",
      title: "IDENTIFY AREAS TO ADDRESS",
      desc: "Highlight potentially inaccurate, outdated, or questionable entries.",
      icon: Target,
    },
    {
      num: "04",
      title: "PERSONALIZED ACTION PLAN",
      desc: "Receive clear, step-by-step guidance on disputes and credit habits.",
      icon: Compass,
    },
    {
      num: "05",
      title: "ONGOING GUIDANCE",
      desc: "Get follow-up assistance as you work toward your financial goals.",
      icon: LifeBuoy,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-900 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-manrope">
              SIMPLE ONBOARDING
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-manrope tracking-tight mb-4">
            Getting Started <span className="gradient-accent-teal">Is Simple</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-inter">
            From initial assessment to ongoing guidance, here is how we work together.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-800 -translate-x-1/2">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-blue-600 via-indigo-600 to-teal-400 origin-top h-full"
            />
          </div>

          <div className="space-y-8 lg:space-y-12">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : (isEven ? -30 : 30) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`flex flex-col lg:flex-row items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full lg:w-1/2 px-0 lg:px-8">
                    <div className="dark-glass-card rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-indigo-500/50 shadow-xl transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xs font-manrope">
                          {step.num}
                        </div>
                        <span className="text-xs font-extrabold tracking-wider text-teal-400 font-manrope uppercase">
                          Step {idx + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-white font-manrope mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed font-inter">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* Node Circle */}
                  <div className="hidden lg:flex my-4 lg:my-0 w-12 h-12 rounded-full bg-slate-900 border-2 border-indigo-500 text-teal-400 shadow-xl items-center justify-center z-10 shrink-0">
                    <StepIcon className="w-5 h-5" />
                  </div>

                  <div className="hidden lg:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
