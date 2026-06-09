import React from "react";
import { cinzel } from "../fonts/font";
import { Cormorant_Garamond, Manrope, Parisienne } from "next/font/google";
import "./globals.css";
import "./layout.css";
import "./responsive.css";
import "./new.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
  display: "swap",
});

export const metadata = {
  title: "ABEER.LABEL – Wear Your Soul | Luxury Women's Ethnic Wear",
  description: "A reflection of slow fashion, quiet luxury, and timeless design. Exquisite, handcrafted ethnic wear for the modern desi muse.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${cinzel.variable} ${cormorant.variable} ${manrope.variable} ${parisienne.variable} ${manrope.className}`}>
        <Header />
        <main style={{ minHeight: "80vh", display: "flex", flexDirection: "column" }}>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}