"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FileSearch, UserX, Compass, HelpCircle, ArrowUpRight, Sparkles } from "lucide-react";

export function ProblemSection() {
  const prefersReducedMotion = useReducedMotion();

  const problems = [
    {
      title: "Credit Report Errors",
      description: "Identify information that may be inaccurate, incomplete, or incorrectly reported.",
      icon: FileSearch,
    },
    {
      title: "Unfamiliar Accounts",
      description: "Get help understanding accounts, duplicate entries, or inquiries you don't recognize.",
      icon: UserX,
    },
    {
      title: "Past Financial Challenges",
      description: "Create a clearer path forward based on your individual situation and credit history.",
      icon: Compass,
    },
    {
      title: "Credit Confusion",
      description: "Understand key factors, ratios, and report elements that may affect your credit profile.",
      icon: HelpCircle,
    },
  ];

  return (
    <section id="credit-problems" className="py-20 lg:py-28 bg-slate-900 border-b border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-manrope">
              UNDERSTANDING YOUR CREDIT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-manrope tracking-tight mb-4">
            Your Credit Report <span className="gradient-accent-teal">Shouldn't Hold You Back</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-inter">
            Understanding your credit report can be difficult. When information is confusing, unfamiliar, or potentially inaccurate, knowing what to do next isn't always easy.
          </p>
        </div>

        {/* 4 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {problems.map((item, idx) => {
            const ProblemIcon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
                className="group dark-glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-indigo-500/50 shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/80 group-hover:border-indigo-500/60 flex items-center justify-center mb-6 transition-all duration-300 shadow-md">
                    <ProblemIcon className="w-6 h-6 text-indigo-400 group-hover:text-teal-400 transition-colors duration-300" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg font-bold text-white font-manrope mb-2 flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:text-teal-400 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>

                  {/* Card Description */}
                  <p className="text-sm text-slate-400 leading-relaxed font-inter">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center text-xs font-bold font-manrope text-teal-400 group-hover:translate-x-1 transition-transform">
                  <span>Learn how we address this</span>
                  <span className="ml-1">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
