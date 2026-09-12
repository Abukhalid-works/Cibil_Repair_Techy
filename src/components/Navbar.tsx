"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Phone, Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#credit-repair" },
    { name: "Our Approach", href: "#our-approach" },
    { name: "Process", href: "#how-it-works" },
    { name: "Why Us", href: "#why-choose-us" },
    { name: "Loan Assistance", href: "#loan-assistance" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b0f19]/90 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl py-3"
          : "bg-[#0b0f19]/60 backdrop-blur-md border-b border-slate-800/40 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-teal-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-white font-manrope tracking-tight leading-tight">
                AAA CREDIT <span className="text-teal-400">REPAIRS</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase text-teal-400 font-manrope">
                Institutional Credit Consulting
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium font-inter">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-teal-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="tel:9346437039"
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-teal-400 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <Phone className="w-4 h-4 text-teal-400" />
              <span>9346437039</span>
            </a>

            <a
              href="#assessment-form"
              className="gradient-btn-indigo flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white font-manrope shadow-md hover:shadow-indigo-500/20 transition-all"
            >
              <span>Free Assessment</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-teal-400" /> : <Menu className="w-6 h-6 text-slate-300" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3 font-inter">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium text-slate-300 hover:text-teal-400 transition-colors border-b border-slate-900"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:9346437039"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm font-semibold"
                >
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>Call: 9346437039</span>
                </a>
                <a
                  href="#assessment-form"
                  onClick={() => setMobileMenuOpen(false)}
                  className="gradient-btn-indigo flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-bold font-manrope shadow-lg"
                >
                  <span>Get Free Assessment</span>
                  <ArrowRight className="w-4 h-4 text-teal-300" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

