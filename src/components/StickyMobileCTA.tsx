"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const formElement = document.getElementById("assessment-form");
      if (!formElement) return;

      const rect = formElement.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/90 p-3 shadow-2xl transition-all duration-300">
      <div className="max-w-md mx-auto flex items-center gap-2">
        <a
          href="tel:9346437039"
          className="flex items-center justify-center p-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm shrink-0"
          aria-label="Call 9346437039"
        >
          <Phone className="w-5 h-5 text-teal-400" />
        </a>

        <a
          href="#assessment-form"
          className="grow gradient-btn-indigo flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold font-manrope text-sm shadow-lg"
        >
          <span>Free Credit Assessment</span>
          <ArrowRight className="w-4 h-4 text-teal-300" />
        </a>
      </div>
    </div>
  );
}
