"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { FloatingWP } from "@/components/layout/FloatingWP";
import { FadeUp } from "@/components/ui/FadeUp";
import { CTA } from "@/components/sections/CTA";

const EnergyTrails3D = dynamic(
  () => import("@/components/ui/EnergyTrails3D").then((mod) => mod.EnergyTrails3D),
  { ssr: false }
);

export default function BlogPage() {
  const dummyPosts = [
    { title: "Cómo mejorar tu posicionamiento en Google en 2026", excerpt: "Las claves definitivas para dominar las SERPs en la era de la IA...", date: "Mayo 2026" },
    { title: "Errores SEO que destruyen tu ranking", excerpt: "Evita estas prácticas comunes que podrían estar penalizando tu visibilidad...", date: "Abril 2026" },
    { title: "Auditoría SEO: checklist completa", excerpt: "Todo lo que necesitas revisar antes de lanzar tu estrategia SEO...", date: "Marzo 2026" },
  ];

  return (
    <>
      <div className="global-page-bg" aria-hidden={true}>
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <EnergyTrails3D />
      </div>
      <Navbar />
      <main className="pt-32">
        <section className="container mx-auto px-6 py-20">
          <FadeUp>
            <span className="section-label">▸ Insights & Estrategia</span>
            <h1 className="main-title mb-8">Blog de Posicionamiento Web & Crecimiento</h1>
            <p className="section-desc max-w-3xl mb-12">
              Recursos, guías y análisis técnico sobre las últimas tendencias en SEO, marketing digital y autoridad de marca.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {dummyPosts.map((post, i) => (
              <FadeUp key={i} delay={0.1 * i} className="blog-card group cursor-pointer">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group-hover:border-gold/50 transition-all duration-300">
                  <span className="text-xs text-gold font-mono uppercase tracking-widest">{post.date}</span>
                  <h2 className="text-xl font-bold mt-4 mb-4 group-hover:text-gold transition-colors">{post.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                  <span className="text-sm font-bold flex items-center gap-2">Leer más <span className="group-hover:translate-x-1 transition-transform">→</span></span>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
      <FloatingWP />
      <BackToTop />
      <CustomCursor />
    </>
  );
}
