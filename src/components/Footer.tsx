"use client";

import { useState } from "react";
import { ShieldCheck, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { PolicyModal } from "./PolicyModal";

export function Footer() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  const quickLinks = [
    { name: "Services", href: "#credit-repair" },
    { name: "Our Approach", href: "#our-approach" },
    { name: "Process", href: "#how-it-works" },
    { name: "Why Choose Us", href: "#why-choose-us" },
    { name: "Loan Assistance", href: "#loan-assistance" },
    { name: "FAQ", href: "#faq" },
    { name: "Free Assessment", href: "#assessment-form" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
                <ShieldCheck className="w-6 h-6 text-teal-300" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white font-manrope tracking-tight leading-tight">
                  AAA CREDIT <span className="text-teal-400">REPAIRS</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-teal-400 font-manrope">
                  Institutional Credit Consulting
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md font-inter">
              AAA CREDIT REPAIRS provides personalized credit guidance to help you better understand your credit profile, address potential errors, and build stronger financial habits.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-sm font-inter">
              <a
                href="tel:9346437039"
                className="flex items-center gap-2.5 text-slate-200 hover:text-teal-400 transition-colors w-fit"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>Phone: 9346437039</span>
              </a>

              <a
                href="mailto:khalid302330@gmail.com"
                className="flex items-center gap-2.5 text-slate-200 hover:text-teal-400 transition-colors w-fit"
              >
                <Mail className="w-4 h-4 text-teal-400" />
                <span>Email: khalid302330@gmail.com</span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-400 text-xs">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>Location: Consulting Services Division</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-4 font-inter">
            <h3 className="text-white font-bold font-manrope text-base tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-teal-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policy */}
          <div className="lg:col-span-4 space-y-4 font-inter">
            <h3 className="text-white font-bold font-manrope text-base tracking-wide uppercase">
              Legal & Policy
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("privacy")}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveModal("terms")}
                  className="hover:text-teal-400 transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="font-bold text-white block font-manrope">Ethical Credit Practice</span>
              <p>
                We strictly adhere to fair credit reporting principles. No guaranteed score gains are promised or implied.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Legal Disclaimer */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 leading-relaxed mb-8 font-inter">
          <p className="font-semibold text-slate-200 mb-1 font-manrope">Important Disclosure:</p>
          <p>
            Disclaimer: Results vary based on individual circumstances. AAA CREDIT REPAIRS does not guarantee specific credit score increases, removal of accurate negative information, loan approval, loan amounts, interest rates, or specific financial outcomes. Services are subject to applicable laws and regulations.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 pt-4 font-inter">
          <p>© 2026 AAA CREDIT REPAIRS. All rights reserved.</p>
          <p className="text-slate-400">
            Institutional Credit Consulting & Optimization.
          </p>
        </div>
      </div>

      {/* Policy Modal Dialog */}
      <PolicyModal
        isOpen={!!activeModal}
        type={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </footer>
  );
}
