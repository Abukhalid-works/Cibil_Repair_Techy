"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck } from "lucide-react";

interface PolicyModalProps {
  isOpen: boolean;
  type: "privacy" | "terms" | null;
  onClose: () => void;
}

export function PolicyModal({ isOpen, type, onClose }: PolicyModalProps) {
  if (!isOpen || !type) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border border-[#E2E8F0] shadow-2xl relative"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] mb-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#16835B]" />
              <h3 className="text-xl font-bold text-[#0B1F3A] font-heading">
                {type === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0B1F3A] transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-sm text-[#475569] space-y-4 leading-relaxed">
            {type === "privacy" ? (
              <>
                <p>
                  At <strong>AAA CREDIT REPAIRS</strong>, protecting your privacy and personal data is a foundational priority.
                </p>
                <h4 className="font-bold text-[#0B1F3A] font-heading">1. Information We Collect</h4>
                <p>
                  We collect information voluntarily submitted through our credit assessment and loan inquiry forms, including your name, email address, phone number, and inquiry details. We do not ask for or collect Social Security numbers or banking passwords via public web forms.
                </p>
                <h4 className="font-bold text-[#0B1F3A] font-heading">2. Use of Information</h4>
                <p>
                  Information collected is strictly used to evaluate your inquiry, follow up regarding your request, and provide personalized credit repair advisory services.
                </p>
                <h4 className="font-bold text-[#0B1F3A] font-heading">3. Data Security & Sharing</h4>
                <p>
                  We maintain appropriate administrative and electronic safeguards. We do not sell, rent, or lease your personal contact information to third-party marketers.
                </p>
                <h4 className="font-bold text-[#0B1F3A] font-heading">4. Contacting Us</h4>
                <p>
                  If you have any questions regarding this Privacy Policy, please reach out directly at <strong>9346437039</strong> or via email at <strong>khalid302330@gmail.com</strong>.
                </p>
              </>
            ) : (
              <>
                <p>
                  Welcome to <strong>AAA CREDIT REPAIRS</strong>. By accessing our website or submitting inquiry forms, you agree to these Terms & Conditions.
                </p>
                <h4 className="font-bold text-[#0B1F3A] font-heading">1. Service Scope</h4>
                <p>
                  AAA CREDIT REPAIRS provides credit report review guidance, dispute support for inaccurate records, and financial habit advisory. We are a consulting business and do not directly control third-party credit reporting bureaus or financial institutions.
                </p>
                <h4 className="font-bold text-[#0B1F3A] font-heading">2. No Guarantees</h4>
                <p>
                  Results vary based on individual circumstances. AAA CREDIT REPAIRS does not guarantee specific credit score increases, removal of accurate negative information, loan approvals, interest rates, or specific financial outcomes.
                </p>
                <h4 className="font-bold text-[#0B1F3A] font-heading">3. Informational Nature</h4>
                <p>
                  All score gauges, illustrations, and materials displayed on this website are illustrative concepts designed to explain credit health principles and do not constitute binding financial guarantees.
                </p>
              </>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold font-heading text-white bg-[#0B1F3A] hover:bg-[#16325B] text-xs transition-colors"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
