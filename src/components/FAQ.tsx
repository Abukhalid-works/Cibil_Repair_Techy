"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is credit repair?",
      answer:
        "Credit repair involves reviewing your credit profile to identify information that may be inaccurate, incomplete, outdated, or unauthorized. We provide step-by-step guidance on disputing inaccurate records with bureaus and establishing healthy credit management habits.",
    },
    {
      question: "Can you guarantee that my credit score will increase?",
      answer:
        "No. Responsible financial guidance cannot guarantee specific credit score increases or exact score point gains. Score changes depend entirely on individual credit histories, credit bureau evaluations, and future financial behavior.",
    },
    {
      question: "Can negative information be removed from my credit report?",
      answer:
        "Information that is proven to be inaccurate, outdated, incomplete, or fraudulent can be disputed and updated or removed by credit reporting agencies. However, accurate and verifiable negative information generally remains on your report for statutory periods.",
    },
    {
      question: "How long does credit repair take?",
      answer:
        "Timelines vary depending on the complexity of your credit report, the response time of credit bureaus or creditors, and the number of items being reviewed. Initial reviews take a few days, while dispute investigations typically take 30 to 60 days per cycle.",
    },
    {
      question: "What information do I need to get started?",
      answer:
        "Basic contact details and a brief description of your credit concerns are all you need for the initial free assessment form. If you proceed with a full review, we will guide you on how to safely access your credit report.",
    },
    {
      question: "Will you need my Social Security number?",
      answer:
        "No. The initial public assessment form on our website does NOT require sensitive details such as Social Security numbers, bank account numbers, or online banking passwords.",
    },
    {
      question: "How does loan assistance work?",
      answer:
        "Our loan assistance service acts as a preliminary inquiry channel. You submit your general requirements, employment status, and requested amount, and AAA CREDIT REPAIRS reviews your profile to guide you toward potential options.",
    },
    {
      question: "Does submitting a loan request guarantee approval?",
      answer:
        "No. Submitting an inquiry form does not guarantee loan approval. Approval, interest rates, and loan terms are strictly subject to lender criteria, underwriting rules, and your verified financial standing.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-900 border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-manrope">
              QUESTIONS & ANSWERS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-manrope tracking-tight mb-4">
            Frequently Asked <span className="gradient-accent-teal">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-inter">
            Clear, honest answers to help you understand credit guidance and our services.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`dark-glass-card rounded-2xl border transition-all duration-200 ${
                  isOpen ? "border-indigo-500/60 shadow-xl shadow-indigo-500/10" : "border-slate-800"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-white font-manrope text-base hover:bg-slate-800/40 transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? "text-teal-400" : "text-slate-500"}`} />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-teal-400" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-slate-300 leading-relaxed font-inter border-t border-slate-800/60 bg-slate-900/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
