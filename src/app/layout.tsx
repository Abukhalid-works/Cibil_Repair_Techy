import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AAA CREDIT REPAIRS | Institutional Credit Repair & Financial Optimization",
  description:
    "AAA CREDIT REPAIRS provides institutional-grade credit repair, audit guidance, and financial optimization to restore your credit score and financial access.",
  keywords: [
    "credit repair",
    "institutional credit audit",
    "credit score restoration",
    "credit profile dispute",
    "loan assistance",
    "financial optimization",
  ],
  authors: [{ name: "AAA CREDIT REPAIRS" }],
  metadataBase: new URL("https://aaacreditrepairs.com"),
  openGraph: {
    title: "AAA CREDIT REPAIRS | Institutional Credit Repair & Financial Optimization",
    description:
      "Restore your credit reputation. Institutional-grade credit repair, bureau audit guidance, and loan consulting.",
    type: "website",
    locale: "en_US",
    siteName: "AAA CREDIT REPAIRS",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth dark ${manrope.variable} ${inter.variable}`}>
      <body className="bg-[#0b0f19] text-white font-sans antialiased selection:bg-indigo-600 selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
