"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star, Sparkles } from "lucide-react";

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  const testimonials = [
    {
      name: "[Client Representative]",
      location: "[Regional Market]",
      text: "“Working with AAA CREDIT REPAIRS helped me understand errors on my report that I had overlooked for years. The team guided me step-by-step through the dispute process with clear communication.”",
      service: "Credit Profile Review & Dispute Guidance",
    },
    {
      name: "[Client Representative]",
      location: "[Regional Market]",
      text: "“The assessment gave me a clear picture of what was affecting my credit history. They were honest about what could be addressed and never made unrealistic promises.”",
      service: "Credit Assessment & Advisory",
    },
    {
      name: "[Client Representative]",
      location: "[Regional Market]",
      text: "“I appreciated their transparent approach. They explained how disputing inaccurate information works and gave me practical habits to maintain long-term credit health.”",
      service: "Credit Habit Building",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-900 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest font-manrope">
              CLIENT FEEDBACK
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-manrope tracking-tight mb-4">
            Real People. <span className="gradient-accent-teal">Real Progress.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-inter">
            Read how our transparent credit guidance helps clients achieve clarity.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={prefersReducedMotion ? {} : { y: -4 }}
              className="dark-glass-card rounded-2xl p-7 border border-slate-800 hover:border-indigo-500/50 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic mb-6 font-inter">
                  {item.text}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-sm font-bold text-white font-manrope">
                  {item.name}
                </p>
                <p className="text-xs text-slate-400 font-inter">{item.location}</p>
                <span className="inline-block mt-2 text-[10px] font-bold font-manrope text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20">
                  {item.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <span className="text-xs text-slate-400 italic font-inter">
            Note: Client representative placeholders used to strictly safeguard privacy.
          </span>
        </div>

      </div>
    </section>
  );
}
