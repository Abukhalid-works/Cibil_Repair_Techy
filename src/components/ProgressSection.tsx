"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, CalendarCheck, ShieldAlert, Sparkles } from "lucide-react";

export function ProgressSection() {
  const prefersReducedMotion = useReducedMotion();

  const indicators = [
    {
      title: "Credit Knowledge",
      description: "Understanding your report metrics, inquiry impacts, and dispute rights.",
      icon: BookOpen,
      delay: 0.1,
      barWidth: "85%",
    },
    {
      title: "Payment Discipline",
      description: "Establishing consistent, timely payment habits and utilization ratios.",
      icon: CalendarCheck,
      delay: 0.3,
      barWidth: "90%",
    },
    {
      title: "Financial Confidence",
      description: "Moving forward with clarity when applying for credit or major purchases.",
      icon: ShieldAlert,
      delay: 0.5,
      barWidth: "95%",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="text-xs font-extrabold tracking-widest uppercase text-[#16835B] bg-[#E8F5E9] px-3.5 py-1.5 rounded-full border border-[#16835B]/20 inline-block mb-3 font-heading">
            PROGRESS & GROWTH
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1F3A] font-heading tracking-tight mb-4">
            Small Steps Can Lead to Meaningful Progress
          </h2>
          <p className="text-base text-[#475569]">
            Building long-term financial health comes from clarity, consistent habits, and active credit management.
          </p>
        </div>

        {/* 3 Progress Indicators Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {indicators.map((ind, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ind.delay }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] subtle-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E8F5E9] text-[#16835B] flex items-center justify-center mb-6">
                <ind.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-[#0B1F3A] font-heading mb-2">
                {ind.title}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed mb-6">
                {ind.description}
              </p>

              {/* Animated Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-[#0B1F3A]">
                  <span>Progress Focus</span>
                  <span className="text-[#16835B] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Growth Concept
                  </span>
                </div>
                <div className="h-3 w-full bg-[#F1F5F9] rounded-full overflow-hidden p-0.5 border border-[#E2E8F0]">
                  <motion.div
                    initial={{ width: "0%" }}
                    whileInView={{ width: ind.barWidth }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: ind.delay + 0.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#0B1F3A] to-[#16835B] rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance Labeling Note */}
        <div className="mt-12 text-center">
          <span className="text-xs font-semibold text-[#64748B] bg-white px-4 py-2 rounded-full border border-[#E2E8F0] inline-block shadow-xs">
            Illustrative concepts — individual results vary based on credit history and actions taken.
          </span>
        </div>
      </div>
    </section>
  );
}
