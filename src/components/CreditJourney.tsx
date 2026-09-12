"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertCircle, FileSearch, Compass, TrendingUp, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export function CreditJourney() {
  const prefersReducedMotion = useReducedMotion();

  const journeySteps = [
    {
      title: "Credit Concerns",
      desc: "Uncertainty about report entries or inaccuracies",
      icon: AlertCircle,
    },
    {
      title: "Credit Review",
      desc: "Detailed profile assessment & verification",
      icon: FileSearch,
    },
    {
      title: "Action Plan",
      desc: "Structured dispute guidance & document prep",
      icon: Compass,
    },
    {
      title: "Better Habits",
      desc: "Responsible payment discipline & management",
      icon: TrendingUp,
    },
    {
      title: "Financial Confidence",
      desc: "Clearer path forward for future credit goals",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-900 border-b border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-manrope">
              YOUR PATH FORWARD
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-manrope tracking-tight mb-4">
            The AAA Credit Repair <span className="gradient-accent-teal">Journey</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-inter">
            A step-by-step conceptual roadmap designed to move you from confusion to clarity.
          </p>
        </div>

        {/* Journey Nodes Flow */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {journeySteps.map((step, idx) => {
              const JourneyIcon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  whileHover={prefersReducedMotion ? {} : { y: -4 }}
                  className="dark-glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between relative group hover:border-indigo-500/50 transition-all"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-teal-400 group-hover:border-indigo-500/60 flex items-center justify-center mb-4 transition-all shadow-md">
                      <JourneyIcon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-extrabold font-manrope tracking-wider uppercase text-teal-400">
                      Stage 0{idx + 1}
                    </span>

                    <h3 className="text-base font-bold text-white font-manrope mt-1 mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-inter">
                      {step.desc}
                    </p>
                  </div>

                  {idx < journeySteps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 shadow-md">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="mt-12 text-center">
          <span className="text-xs text-slate-400 italic bg-slate-800/80 px-4 py-2 rounded-full border border-slate-700/80 inline-block font-inter">
            Illustrative concept — individual journey steps and timelines vary based on credit profiles.
          </span>
        </div>

      </div>
    </section>
  );
}
