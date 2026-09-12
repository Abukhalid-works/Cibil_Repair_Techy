"use client";

import { motion, useReducedMotion } from "framer-motion";
import { UserCheck, MessageSquare, Eye, ShieldCheck, Headphones, CheckCircle2, Sparkles } from "lucide-react";

export function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion();

  const reasons = [
    {
      title: "Personalized Guidance",
      description: "Your credit situation is unique. Get guidance tailored to your specific circumstances.",
      icon: UserCheck,
    },
    {
      title: "Clear Communication",
      description: "We explain the credit repair and review process in plain, straightforward language.",
      icon: MessageSquare,
    },
    {
      title: "Transparent Process",
      description: "Understand every step we recommend and why it matters for your profile.",
      icon: Eye,
    },
    {
      title: "Secure & Confidential",
      description: "We treat customer information responsibly with maximum privacy standards.",
      icon: ShieldCheck,
    },
    {
      title: "Dedicated Support",
      description: "Get prompt, knowledgeable support to answer questions about your next steps.",
      icon: Headphones,
    },
    {
      title: "No Unrealistic Promises",
      description: "We focus on legitimate, compliant credit guidance rather than fake guarantees.",
      icon: CheckCircle2,
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 lg:py-28 bg-slate-900 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-manrope">
              OUR COMMITMENT
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-manrope tracking-tight mb-4">
            Why Choose <span className="gradient-accent-teal">AAA CREDIT REPAIRS?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-inter">
            We stand for honesty, clarity, and genuine client support in every consultation.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, idx) => {
            const ReasonIcon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className="dark-glass-card rounded-2xl p-7 border border-slate-800 hover:border-indigo-500/50 shadow-xl transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/80 group-hover:border-indigo-500/60 flex items-center justify-center mb-5 transition-colors">
                  <ReasonIcon className="w-6 h-6 text-indigo-400 group-hover:text-teal-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white font-manrope mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-inter">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
