"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Decorative Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 shadow-lg">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-manrope">
              TAKE THE FIRST STEP TODAY
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-manrope tracking-tight text-white leading-tight">
            Your Credit Journey <span className="gradient-accent-teal">Starts Here</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-inter">
            Take the first step toward understanding your credit report and creating a clearer financial plan with AAA CREDIT REPAIRS.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#assessment-form"
              className="gradient-btn-indigo w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold font-manrope text-white shadow-xl cursor-pointer group"
            >
              <span>Get My Free Credit Assessment</span>
              <ArrowRight className="w-5 h-5 text-teal-300 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#loan-assistance"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold font-manrope text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all cursor-pointer"
            >
              <span>Loan Assistance</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
