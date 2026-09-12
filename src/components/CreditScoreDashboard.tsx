"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TrendingUp, ShieldCheck, CheckCircle2, ArrowUpRight } from "lucide-react";

export function CreditScoreDashboard() {
  const prefersReducedMotion = useReducedMotion();
  const [score, setScore] = useState(prefersReducedMotion ? 720 : 620);
  const targetScore = 720;
  const startScore = 620;

  useEffect(() => {
    if (prefersReducedMotion) return;

    const duration = 2000; // 2.0 seconds total animation duration
    const steps = 60;
    const intervalTime = duration / steps;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const progress = stepCount / steps;
      // Ease out quad formula for natural decelerating count-up
      const easedProgress = 1 - (1 - progress) * (1 - progress);
      const currentScore = Math.round(startScore + (targetScore - startScore) * easedProgress);

      setScore(currentScore);

      if (stepCount >= steps) {
        setScore(targetScore);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  // Calculate gauge dash offset based on score (620 to 720 score range on a 300 to 850 scale)
  const percentage = Math.min(100, Math.max(0, ((score - 300) / 550) * 100));
  const circumference = 2 * Math.PI * 70; // radius = 70, circumference ~ 439.8
  const strokeDashoffset = circumference - (percentage / 100) * (circumference * 0.75);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-lg mx-auto"
    >
      {/* Multi-Layered Glass Card Container */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl border border-[#E2E8F0] p-6 sm:p-8 luxury-card-shadow overflow-hidden"
      >
        {/* Background Ambient Radial Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#16835B]/8 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0B1F3A]/8 rounded-full blur-2xl -z-10 pointer-events-none" />

        {/* Header Badges */}
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16835B] animate-pulse" />
            <span className="text-xs font-extrabold font-heading uppercase tracking-wider text-[#0B1F3A]">
              CREDIT PROFILE
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-heading text-[#16835B] bg-[#E8F5E9] border border-[#16835B]/20 shadow-xs">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Improving</span>
          </span>
        </div>

        {/* Central Circular Gauge & Score Display */}
        <div className="relative flex flex-col items-center justify-center my-4">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Circular Gauge */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Subtle Gauge Tick Marks */}
              <circle
                cx="80"
                cy="80"
                r="77"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray="2 6"
                fill="transparent"
              />
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#F1F5F9"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * 0.25}
                strokeLinecap="round"
              />
              {/* Animated Progress Track */}
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#navyGreenGradient)"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0px 2px 4px rgba(22, 131, 91, 0.2))" }}
              />
              <defs>
                <linearGradient id="navyGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0B1F3A" />
                  <stop offset="50%" stopColor="#16325B" />
                  <stop offset="100%" stopColor="#16835B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Content: Score Number */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                Credit Score
              </span>
              <div className="flex items-baseline gap-1 my-0.5">
                <span className="text-4xl sm:text-5xl font-black text-[#0B1F3A] font-heading tracking-tight">
                  {score}
                </span>
                <ArrowUpRight className="w-6 h-6 text-[#16835B] stroke-[3]" />
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold font-heading text-[#16835B] bg-[#E8F5E9] border border-[#16835B]/30 shadow-xs">
                Example Score
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs text-[#64748B] font-medium text-center italic">
            Illustrative Credit Progress
          </p>
        </div>

        {/* Animated Credit Graph Section */}
        <div className="mt-6 pt-5 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold font-heading text-[#0B1F3A]">Illustrative Trajectory</span>
            <span className="text-[11px] font-bold text-[#16835B] bg-[#E8F5E9] px-2 py-0.5 rounded border border-[#16835B]/20 flex items-center gap-1">
              +100 pts concept <TrendingUp className="w-3 h-3" />
            </span>
          </div>

          {/* Line Graph SVG Animation */}
          <div className="relative h-16 w-full bg-[#F8FAFC] rounded-xl p-2 border border-[#E2E8F0] overflow-hidden flex items-end">
            <svg className="w-full h-12" viewBox="0 0 300 50" fill="none">
              {/* Grid Lines */}
              <line x1="0" y1="12" x2="300" y2="12" stroke="#E2E8F0" strokeDasharray="3 3" />
              <line x1="0" y1="28" x2="300" y2="28" stroke="#E2E8F0" strokeDasharray="3 3" />

              {/* Gradient Fill under Path */}
              <motion.path
                d="M 10 40 L 60 36 L 110 30 L 160 22 L 210 18 L 260 12 L 290 8 L 290 50 L 10 50 Z"
                fill="url(#greenGradientArea)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />

              {/* Animated Stroke Path */}
              <motion.path
                d="M 10 40 L 60 36 L 110 30 L 160 22 L 210 18 L 260 12 L 290 8"
                stroke="#16835B"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
              />

              {/* End Dot with pulse effect */}
              <circle cx="290" cy="8" r="4" fill="#16835B" />
              <circle cx="290" cy="8" r="8" fill="#16835B" opacity="0.3" className="animate-ping" />

              <defs>
                <linearGradient id="greenGradientArea" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#16835B" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#16835B" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-2.5 mt-5 text-[11px] font-semibold text-[#475569]">
          <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
            <CheckCircle2 className="w-4 h-4 text-[#16835B]" />
            <span>Profile Review</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-2.5 rounded-xl border border-[#E2E8F0]">
            <ShieldCheck className="w-4 h-4 text-[#0B1F3A]" />
            <span>Secure Process</span>
          </div>
        </div>

        {/* Disclaimer Footer Note */}
        <div className="mt-4 text-center">
          <span className="text-[10px] text-[#64748B] bg-[#F8FAFC] px-3 py-1 rounded-full border border-[#E2E8F0] inline-block font-medium">
            Illustrative Example — Not actual customer results
          </span>
        </div>
      </motion.div>

      {/* Outer Glow Ring */}
      <div className="absolute -inset-2 bg-gradient-to-r from-[#0B1F3A]/10 via-[#16835B]/15 to-[#0B1F3A]/10 rounded-3xl blur-2xl -z-10" />
    </motion.div>
  );
}
