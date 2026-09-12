"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Phone,
  Sparkles,
  FileSearch,
} from "lucide-react";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [simulatedScore, setSimulatedScore] = useState<number>(750);

  const getScoreRating = (score: number) => {
    if (score < 650) return { label: "Needs Repair", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" };
    if (score < 700) return { label: "Fair", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" };
    if (score < 750) return { label: "Good", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30" };
    return { label: "Excellent", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" };
  };

  const currentRating = getScoreRating(simulatedScore);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80 bg-[#0b0f19] hero-glow-dark">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
            >
              <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-200 font-manrope">
                Professional CIBIL & Credit Advisory
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-manrope tracking-tight leading-[1.15] text-white"
            >
              Transform Your Credit Profile with <span className="gradient-accent-teal">Institutional Precision</span>
            </motion.h1>

            {/* Subtitle / Description */}
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-slate-300 font-inter max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Resolve inaccurate report entries, dispute discrepancies, and pave a clear path toward loan eligibility with expert credit profile analysis.
            </motion.p>

            {/* Feature Highlights Grid */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left"
            >
              {[
                "Comprehensive CIBIL Audit",
                "Discrepancy & Error Disputes",
                "Personalized Score Strategy",
                "100% Confidential Support",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <a
                href="#assessment-form"
                className="w-full sm:w-auto gradient-btn-indigo flex items-center justify-center gap-3 py-4 px-8 rounded-2xl text-white font-bold font-manrope text-base shadow-xl hover:shadow-indigo-500/25 transition-all"
              >
                <span>Get Free Credit Review</span>
                <ArrowRight className="w-5 h-5 text-teal-300" />
              </a>

              <a
                href="tel:9346437039"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-teal-400/50 text-slate-200 font-semibold font-manrope text-base transition-all group"
              >
                <Phone className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                <span>Call Advisor: 9346437039</span>
              </a>
            </motion.div>

            {/* Proof Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 border-t border-slate-800/60 text-slate-400 text-xs font-inter">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Bank-Grade Data Security</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Expert Financial Consultants</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Fast 24-48 Hour Turnaround</span>
              </div>
            </div>

          </div>

          {/* Right Visual: Live Animated Interactive Credit Score Gauge */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="dark-glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative">
              
              {/* Top Card Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                    <TrendingUp className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-manrope">Live Credit Gauge Simulator</h3>
                    <p className="text-xs text-slate-400">Interactive CIBIL Score Spectrum</p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentRating.bg} ${currentRating.color}`}>
                  {currentRating.label}
                </span>
              </div>

              {/* Gauge Arc Graphic */}
              <div className="relative flex flex-col items-center justify-center my-4">
                <svg className="w-56 h-36 transform overflow-visible" viewBox="0 0 180 100">
                  {/* Gauge Track Background Arc */}
                  <path
                    d="M 20 90 A 70 70 0 0 1 160 90"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  {/* Gauge Colored Gradient Arc */}
                  <path
                    d="M 20 90 A 70 70 0 0 1 160 90"
                    fill="none"
                    stroke="url(#score-gradient)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray="220"
                    strokeDashoffset={220 - ((simulatedScore - 300) / 600) * 220}
                    className="transition-all duration-500 ease-out"
                  />
                  <defs>
                    <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="35%" stopColor="#f59e0b" />
                      <stop offset="70%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Score Number Display */}
                <div className="absolute bottom-2 text-center">
                  <span className="text-4xl font-extrabold text-white font-manrope tracking-tight">
                    {simulatedScore}
                  </span>
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    CIBIL Score Target
                  </span>
                </div>
              </div>

              {/* Score Range Interactive Slider */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-400">Drag to Simulate:</span>
                  <span className="text-teal-400 font-mono font-bold">{simulatedScore} / 900</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="900"
                  step="5"
                  value={simulatedScore}
                  onChange={(e) => setSimulatedScore(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>300 (Poor)</span>
                  <span>650 (Fair)</span>
                  <span>750 (Good)</span>
                  <span>900 (Excellent)</span>
                </div>
              </div>

              {/* Bottom Target Callout */}
              <div className="mt-6 p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-400" />
                  <span className="text-slate-300 font-medium">Target Eligibility Goal</span>
                </div>
                <span className="font-bold text-white font-manrope">750+ CIBIL</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

