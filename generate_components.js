const fs = require('fs');
const path = require('path');

const dirs = [
  'C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components',
  'C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/ui',
  'C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/layout',
  'C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const uiCounter = `"use client";
import React, { useState, useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";

export function Counter({ from = 0, to, duration = 2.5, isFloat = false }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(isFloat ? value.toFixed(1) : Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView, duration, isFloat]);

  return <span ref={ref}>{count}</span>;
}
`;

const uiFadeUp = `"use client";
import { motion } from "framer-motion";

export const FadeUp = ({ children, className = "", delay = 0, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    transition={{ duration: 0.8, delay }}
    className={className}
    style={style}
  >
    {children}
  </motion.div>
);
`;

const layoutNavbar = `"use client";
import React, { useState } from "react";
import Image from "next/image";

export function Navbar({ onEnter, onLeave }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="nav-inner">
        <a href="#" className="logo" onMouseEnter={onEnter} onMouseLeave={onLeave}>
          <Image src="/logo.png" alt="Strategic Connex Logo" width={200} height={80} style={{ width: 'auto', height: '58px', objectFit: 'contain' }} unoptimized className="logo-img" />
          <span className="logo-text">STRATEGIC <span className="logo-light">CONNEX</span></span>
        </a>
        <ul className={\`nav-links \${menuOpen ? 'active' : ''}\`}>
          <li><a href="#about" onClick={() => setMenuOpen(false)}>Nosotros</a></li>
          <li><a href="#services" onClick={() => setMenuOpen(false)}>Servicios</a></li>
          <li><a href="#docs" onClick={() => setMenuOpen(false)}>Documentación</a></li>
          <li><a href="#industries" onClick={() => setMenuOpen(false)}>Industrias</a></li>
          <li><a href="#dashboard" onClick={() => setMenuOpen(false)}>Dashboard</a></li>
          <li><a href="#cta" className="nav-cta" onClick={() => setMenuOpen(false)}>Contactar</a></li>
        </ul>
        <button className="mobile-menu-btn" aria-expanded={menuOpen} aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
`;

const layoutFooter = `"use client";
import Image from "next/image";

export function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <a href="#" className="logo">
            <Image src="/logo.png" alt="Strategic Connex Logo" width={200} height={80} style={{ width: 'auto', height: '58px', objectFit: 'contain' }} unoptimized className="logo-img" />
            <span className="logo-text">STRATEGIC <span className="logo-light">CONNEX</span></span>
          </a>
          <p>Consultora de posicionamiento y gestión comercial especializada en industrias de alta complejidad. Precisión, control y resultados medibles.</p>
        </div>
        <div className="footer-col">
          <h4>Servicios</h4>
          <ul>
            <li><a href="#">Marketing Digital</a></li>
            <li><a href="#">SEO / SEM</a></li>
            <li><a href="#">Branding</a></li>
            <li><a href="#">Consultoría</a></li>
            <li><a href="#">Desarrollo Web</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Documentación</h4>
          <ul>
            <li><a href="#">Fichas Técnicas</a></li>
            <li><a href="#">Presupuestos</a></li>
            <li><a href="#">Ingeniería</a></li>
            <li><a href="#">Homologación</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <ul>
            <li><a href="#">contacto@strategicconnex.com</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© <span>{new Date().getFullYear()}</span> <span>Strategic Connex</span>. Todos los derechos reservados.</span>
        <span>Diseñado para liderar.</span>
      </div>
    </footer>
  );
}
`;

const layoutBackToTop = `"use client";
import React, { useState, useEffect } from "react";
import { useScroll } from "framer-motion";

export function BackToTop() {
  const { scrollY } = useScroll();
  const [showToTop, setShowToTop] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowToTop(latest > 500);
    });
  }, [scrollY]);

  return (
    <a href="#" className={\`back-to-top \${showToTop ? 'visible' : ''}\`} aria-label="Volver arriba">↑</a>
  );
}
`;

const layoutCursor = `"use client";
import React, { useState, useEffect } from "react";

export function CustomCursor({ isHovering }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      className={\`custom-cursor \${isHovering ? 'hover' : ''}\`} 
      style={{ left: mousePos.x, top: mousePos.y, opacity: mousePos.x === 0 ? 0 : 1 }}
    />
  );
}
`;

const layoutFloatingWP = `"use client";
export function FloatingWP({ onEnter, onLeave }) {
  return (
    <a href="https://wa.me/542995869435" className="floating-whatsapp" target="_blank" aria-label="Contacto por WhatsApp" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
    </a>
  );
}
`;

const secHero = `"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Counter } from "../ui/Counter";

export function Hero({ onEnter, onLeave }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 350]);

  return (
    <section id="hero">
      <motion.div className="hero-bg" aria-hidden={true} style={{ y: heroY }}>
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow2"></div>
        <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" opacity=".18">
          <defs>
            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#D4AF37", stopOpacity: ".6" }} />
              <stop offset="100%" style={{ stopColor: "#2563EB", stopOpacity: ".3" }} />
            </linearGradient>
          </defs>
          <circle cx="200" cy="150" r="4" fill="#D4AF37" /><circle cx="450" cy="80" r="3" fill="#D4AF37" />
          <circle cx="700" cy="200" r="5" fill="#D4AF37" /><circle cx="950" cy="120" r="3" fill="#2563EB" />
          <circle cx="1100" cy="300" r="4" fill="#D4AF37" /><circle cx="320" cy="350" r="3" fill="#2563EB" />
          <circle cx="580" cy="450" r="6" fill="#D4AF37" /><circle cx="820" cy="380" r="3" fill="#D4AF37" />
          <circle cx="100" cy="500" r="4" fill="#2563EB" /><circle cx="1050" cy="550" r="5" fill="#D4AF37" />
          <line x1="200" y1="150" x2="450" y2="80" stroke="#D4AF37" strokeWidth=".8" />
          <line x1="450" y1="80" x2="700" y2="200" stroke="#D4AF37" strokeWidth=".8" />
          <line x1="700" y1="200" x2="950" y2="120" stroke="#2563EB" strokeWidth=".8" />
          <line x1="950" y1="120" x2="1100" y2="300" stroke="#D4AF37" strokeWidth=".8" />
          <line x1="200" y1="150" x2="320" y2="350" stroke="#2563EB" strokeWidth=".6" />
          <line x1="320" y1="350" x2="580" y2="450" stroke="#D4AF37" strokeWidth=".8" />
          <line x1="580" y1="450" x2="820" y2="380" stroke="#D4AF37" strokeWidth=".8" />
          <line x1="700" y1="200" x2="580" y2="450" stroke="#D4AF37" strokeWidth=".6" />
          <line x1="100" y1="500" x2="320" y2="350" stroke="#2563EB" strokeWidth=".6" />
          <line x1="820" y1="380" x2="1050" y2="550" stroke="#D4AF37" strokeWidth=".8" />
          <line x1="1100" y1="300" x2="1050" y2="550" stroke="#D4AF37" strokeWidth=".6" />
          <rect x="60" y="620" width="120" height="2" fill="#D4AF37" opacity=".4" />
          <rect x="200" y="640" width="80" height="2" fill="#2563EB" opacity=".4" />
          <rect x="900" y="700" width="150" height="2" fill="#D4AF37" opacity=".4" />
          <polygon points="580,420 610,470 550,470" fill="none" stroke="#D4AF37" strokeWidth="1" opacity=".5" />
          <rect x="820" y="350" width="30" height="30" fill="none" stroke="#D4AF37" strokeWidth="1" opacity=".4" />
        </svg>
      </motion.div>
      <div className="hero-content">
        <div className="hero-badge">🔶 PLATAFORMA DE INTELIGENCIA COMERCIAL</div>
        <h1 className="hero-title">Control Total.<br /><span className="accent">Estrategia Precisa.</span>Resultados Reales.</h1>
        <p className="hero-sub">Consultora especializada en posicionamiento comercial, marketing estratégico y documentación técnica para empresas del sector Oil & Gas e industrias de alta complejidad.</p>
        <div className="hero-actions">
          <a href="#services" className="btn-primary" onMouseEnter={onEnter} onMouseLeave={onLeave}>▶ Explorar Servicios</a>
          <a href="#about" className="btn-outline" onMouseEnter={onEnter} onMouseLeave={onLeave}>Conocer el modelo →</a>
        </div>
        <div className="hero-stats">
          <div className="stat-item"><div className="stat-num">+<Counter to={120} /></div><div className="stat-label">Proyectos ejecutados</div></div>
          <div className="stat-item"><div className="stat-num"><Counter to={98} />%</div><div className="stat-label">Satisfacción de clientes</div></div>
          <div className="stat-item"><div className="stat-num"><Counter to={15} />+</div><div className="stat-label">Años en el sector</div></div>
        </div>
      </div>
    </section>
  );
}
`;

const secAbout = `"use client";
import React from "react";
import { FadeUp } from "../ui/FadeUp";

export function About() {
  return (
    <section id="about">
      <div className="about-grid">
        <FadeUp>
          <span className="section-label">▸ Acerca de nosotros</span>
          <h2 className="section-title">Agencia de Posicionamiento Web Estratégico y Crecimiento Orgánico</h2>
          <div className="divider"></div>
          <p className="section-desc">Strategic Connex es una agencia especializada en transformar la presencia digital de empresas mediante estrategias SEO avanzadas, arquitectura técnica y contenido de alto impacto que genera autoridad en Google.</p>
          <div className="about-pillars">
            <div className="pillar"><div className="pillar-icon">🎯</div><div className="pillar-text"><strong>SEO Técnico & Arquitectura</strong><span>Optimizamos cada línea de código para que Google te prefiera y tu web cargue a máxima velocidad.</span></div></div>
            <div className="pillar"><div className="pillar-icon">⚙️</div><div className="pillar-text"><strong>Estrategia de Contenido</strong><span>Creamos activos digitales técnicos que atraen leads calificados y construyen autoridad sectorial.</span></div></div>
            <div className="pillar"><div className="pillar-icon">📈</div><div className="pillar-text"><strong>Resultados Basados en Datos</strong><span>Implementamos tracking avanzado y KPIs claros para asegurar que tu inversión se traduzca en crecimiento orgánico real.</span></div></div>
          </div>
        </FadeUp>
        <FadeUp delay={0.2} className="about-visual" aria-hidden={true}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="about-video"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            preload="metadata"
            poster="/logo.png"
          >
            <source src="/images/strategic.webm" type="video/webm" />
          </video>
        </FadeUp>
      </div>
    </section>
  );
}
`;

const secServices = `"use client";
import React from "react";
import Image from "next/image";
import { FadeUp } from "../ui/FadeUp";

export function Services() {
  const servicios = [
    { img: "marketing_digital_1775961023662.png", title: "Marketing Digital", desc: "Estrategias digitales integrales orientadas a resultados medibles y crecimiento sostenido de marca.", tag: "Núcleo estratégico" },
    { img: "estrategia_consultoria_1775961038052.png", title: "Estrategia y Consultoría", desc: "Análisis de mercado, posicionamiento competitivo y hoja de ruta estratégica para sectores industriales.", tag: "Diagnóstico y planificación" },
    { img: "key_visual_contenido_1775961052376.png", title: "Key Visual y Contenido", desc: "Identidad visual estratégica y producción de contenido de alto impacto alineado con los objetivos corporativos.", tag: "Marca y comunicación" },
    { img: "seo_tecnico_1775961065623.png", title: "SEO Técnico y Semántico", desc: "Optimización avanzada para motores de búsqueda con enfoque en industria B2B y mercados de nicho.", tag: "Visibilidad orgánica" },
    { img: "publicidad_online_1775961079546.png", title: "Publicidad Online (SEM/PPC)", desc: "Campañas pagadas de alta precisión con gestión de presupuesto orientada al ROI en sectores industriales.", tag: "Captación de leads" },
    { img: "redes_sociales_1775961095750.png", title: "Redes Sociales", desc: "Gestión estratégica de presencia digital corporativa con enfoque B2B y construcción de autoridad sectorial.", tag: "Presencia corporativa" },
    { img: "marketing_contenidos_1775961111176.png", title: "Marketing de Contenidos", desc: "Producción de contenido técnico especializado que genera credibilidad y atrae a tomadores de decisión.", tag: "Autoridad de nicho" },
    { img: "analitica_reportes_1775961126189.png", title: "Analítica y Reportes", desc: "Tableros de control personalizados, análisis de datos y reportes ejecutivos para toma de decisiones.", tag: "Inteligencia de negocio" },
    { img: "branding_corporativo_1775961139844.png", title: "Branding Corporativo", desc: "Desarrollo y consolidación de identidad de marca para empresas operando en mercados de alta exigencia.", tag: "Posicionamiento" },
    { img: "diseno_web_1775961152123.png", title: "Diseño y Desarrollo Web", desc: "Plataformas digitales de alto rendimiento con experiencia de usuario premium y arquitectura escalable.", tag: "Presencia digital" },
  ];

  return (
    <section id="services">
      <FadeUp className="services-header">
        <span className="section-label">▸ Servicios</span>
        <h2 className="section-title">Suite Completa de Servicios Estratégicos</h2>
        <div className="divider"></div>
        <p className="section-desc">Cada solución está diseñada para generar impacto real en su posicionamiento, visibilidad y rentabilidad comercial.</p>
      </FadeUp>
      <div className="services-grid">
        {servicios.map((srv, i) => (
          <FadeUp key={i} className="service-card" delay={0.05 * i}>
            <div className="service-img">
              <Image src={\`/images/\${srv.img}\`} alt={srv.title} width={400} height={200} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="service-content">
              <h3>{srv.title}</h3>
              <p>{srv.desc}</p>
              <span className="service-tag">▹ {srv.tag}</span>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
`;

const secDocs = `"use client";
import React from "react";
import { FadeUp } from "../ui/FadeUp";

export function Docs() {
  return (
    <section id="docs">
      <FadeUp>
        <span className="section-label">▸ Documentación Técnica</span>
        <h2 className="section-title">Gestión Documental Estratégica</h2>
        <div className="divider"></div>
        <p className="section-desc">Producimos y gestionamos documentación técnica y comercial de precisión, adaptada a los estándares exigidos por el sector energético e industrial.</p>
      </FadeUp>
      <div className="docs-grid">
        <FadeUp className="doc-card" delay={0}>
          <div className="doc-header"><div className="doc-icon">⚙️</div><div className="doc-number">01</div></div>
          <h3>Ingeniería y Gestión</h3>
          <p>Elaboración de documentación técnica integral bajo normativas internacionales.</p>
          <ul className="doc-features"><li>Memoria técnica</li><li>Especificaciones</li><li>ISO</li></ul>
        </FadeUp>
        <FadeUp className="doc-card" delay={0.1}>
          <div className="doc-header"><div className="doc-icon">📑</div><div className="doc-number">02</div></div>
          <h3>Ficha Técnica Homologada</h3>
          <p>Fichas certificadas y estructuradas para operadoras del sector Oil & Gas.</p>
          <ul className="doc-features"><li>Formato operadoras</li><li>Trazabilidad</li><li>Aprobaciones</li></ul>
        </FadeUp>
        <FadeUp className="doc-card" delay={0.2}>
          <div className="doc-header"><div className="doc-icon">📊</div><div className="doc-number">03</div></div>
          <h3>Presupuesto Inteligente</h3>
          <p>Propuestas económicas visuales orientadas a aumentar el porcentaje de cierre B2B.</p>
          <ul className="doc-features"><li>Diseño corporativo</li><li>Pricing dinámico</li><li>PDF / Editable</li></ul>
        </FadeUp>
        <FadeUp className="doc-card" delay={0.3}>
          <div className="doc-header"><div className="doc-icon">🛡️</div><div className="doc-number">04</div></div>
          <h3>Auditoría Documental</h3>
          <p>Gestión y trazabilidad pura para auditorías y sistemas de control de calidad.</p>
          <ul className="doc-features"><li>Codificación</li><li>Revisiones históricas</li><li>Repositorio</li></ul>
        </FadeUp>
      </div>
    </section>
  );
}
`;

const secIndustries = `"use client";
import React from "react";
import Image from "next/image";
import { FadeUp } from "../ui/FadeUp";

export function Industries({ onEnter, onLeave }) {
  return (
    <section id="industries">
      <div className="industries-bg" aria-hidden={true}></div>
      <div className="ind-grid-bg" aria-hidden={true}></div>
      <div className="industries-content">
        <FadeUp>
          <span className="section-label">▸ Industrias</span>
          <h2 className="section-title">Enfocados en Sectores de Alta Complejidad</h2>
          <div className="divider"></div>
          <p className="section-desc">Nuestra experiencia está concentrada en industrias donde la precisión técnica y la credibilidad corporativa son factores críticos de éxito.</p>
        </FadeUp>
        <div className="industry-cards">
          <FadeUp delay={0.1} className="ind-card" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <div className="ind-card-bg" aria-hidden={true}>
              <Image src="/images/industry_oil_gas.png" alt="Oil and Gas" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="ind-img" />
            </div>
            <div className="ind-card-overlay"></div>
            <div className="ind-card-content">
              <div className="ind-badge">SECTOR PRIMARIO</div>
              <h3>Oil & Gas</h3>
              <p>Estrategia comercial, homologación y posicionamiento para empresas del sector energético y extractivo.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.2} className="ind-card" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <div className="ind-card-bg" aria-hidden={true}>
              <Image src="/images/industry_energy.png" alt="Energía" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="ind-img" />
            </div>
            <div className="ind-card-overlay"></div>
            <div className="ind-card-content">
              <div className="ind-badge">ENERGÍA</div>
              <h3>Energía & Utilities</h3>
              <p>Comunicación estratégica y marketing B2B para empresas del sector energético y de servicios públicos.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.3} className="ind-card" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <div className="ind-card-bg" aria-hidden={true}>
              <Image src="/images/industry_infra.png" alt="Infraestructura" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="ind-img" />
            </div>
            <div className="ind-card-overlay"></div>
            <div className="ind-card-content">
              <div className="ind-badge">CONSTRUCCIÓN</div>
              <h3>Infraestructura e Ingeniería</h3>
              <p>Documentación técnica, licitaciones y gestión comercial para empresas constructoras e ingeniería civil.</p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
`;

const secKPI = `"use client";
import React from "react";
import { FadeUp } from "../ui/FadeUp";
import { Counter } from "../ui/Counter";

export function KPI() {
  return (
    <section id="kpi">
      <FadeUp style={{ textAlign: "center" }}>
        <span className="section-label">▸ Desempeño</span>
        <h2 className="section-title">Resultados que Hablan por Sí Solos</h2>
        <div className="divider" style={{ margin: "1.25rem auto" }}></div>
      </FadeUp>
      <FadeUp className="kpi-bar" delay={0.2}>
        <div className="kpi-item"><div className="kpi-value"><span className="kpi-unit">+</span><Counter to={340} /></div><div className="kpi-desc">Crecimiento promedio en visibilidad orgánica</div><div className="kpi-trend">↑ 12% vs año anterior</div></div>
        <div className="kpi-item"><div className="kpi-value"><Counter to={4.8} isFloat={true} /><span className="kpi-unit">x</span></div><div className="kpi-desc">Retorno sobre inversión en campañas SEM</div><div className="kpi-trend">↑ 8% vs año anterior</div></div>
        <div className="kpi-item"><div className="kpi-value"><span className="kpi-unit">+</span><Counter to={87} /></div><div className="kpi-desc">Documentos técnicos homologados entregados</div><div className="kpi-trend">↑ 23% vs año anterior</div></div>
        <div className="kpi-item"><div className="kpi-value"><Counter to={98} /><span className="kpi-unit">%</span></div><div className="kpi-desc">Índice de satisfacción de clientes corporativos</div><div className="kpi-trend">↑ Sostenido</div></div>
      </FadeUp>
    </section>
  );
}
`;

const secDashboard = `"use client";
import React from "react";
import { motion } from "framer-motion";
import { FadeUp } from "../ui/FadeUp";
import { Counter } from "../ui/Counter";

export function Dashboard() {
  return (
    <section id="dashboard">
      <FadeUp>
        <span className="section-label">▸ Plataforma de Control</span>
        <h2 className="section-title">Panel de Inteligencia Estratégica</h2>
        <div className="divider"></div>
        <p className="section-desc">Nuestros clientes acceden a un entorno de control centralizado donde monitorean cada métrica de su estrategia en tiempo real.</p>
      </FadeUp>
      <FadeUp className="dash-wrapper" delay={0.2}>
        <div className="dash-sidebar">
          <div className="dash-logo">SC PLATFORM</div>
          <ul className="dash-nav">
            <li className="active"><a href="#">⬡ Dashboard</a></li>
            <li><a href="#">📈 Analítica</a></li>
            <li><a href="#">🎯 Campañas</a></li>
            <li><a href="#">📄 Documentos</a></li>
            <li><a href="#">⚙️ Estrategia</a></li>
            <li><a href="#">🔔 Alertas</a></li>
            <li><a href="#">📊 Reportes</a></li>
            <li><a href="#">⚙ Configuración</a></li>
          </ul>
        </div>
        <div className="dash-main">
          <div className="dash-topbar">
            <h4>Vista General — Q2</h4>
            <div className="dash-status">Sistema activo</div>
          </div>
          <div className="dash-kpis">
            <div className="dash-kpi"><div className="dash-kpi-label">Tráfico Orgánico</div><div className="dash-kpi-val"><Counter to={24850} /> <span>↑9%</span></div></div>
            <div className="dash-kpi"><div className="dash-kpi-label">Leads Generados</div><div className="dash-kpi-val"><Counter to={312} /> <span>↑17%</span></div></div>
            <div className="dash-kpi"><div className="dash-kpi-label">ROI Campañas</div><div className="dash-kpi-val"><Counter to={4.8} isFloat={true} />x <span>↑5%</span></div></div>
          </div>
          <div className="dash-charts">
            <div className="dash-chart">
              <div className="dash-chart-title">Rendimiento Mensual</div>
              <div className="chart-bars">
                {[45, 60, 52, 75, 68, 90, 82].map((h, i) => (
                  <motion.div key={i} className={\`bar \${i === 5 ? 'active' : ''}\`} initial={{ height: 0 }} whileInView={{ height: \`\${h}%\` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }} />
                ))}
              </div>
            </div>
            <div className="dash-chart">
              <div className="dash-chart-title">Conversión</div>
              <motion.div className="donut" initial={{ background: "conic-gradient(var(--gold) 0% 0%, rgba(255,255,255,.06) 0% 100%)" }} whileInView={{ background: "conic-gradient(var(--gold) 0% 72%, rgba(255,255,255,.06) 72% 100%)" }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }}>
                <div className="donut-inner"></div>
              </motion.div>
              <div style={{ textAlign: "center", marginTop: ".75rem", fontSize: ".72rem", color: "var(--text-muted)" }}>72% objetivo alcanzado</div>
            </div>
          </div>
          <div className="dash-alerts">
            <div className="alert-item alert-warn">⚠ Campaña SEM — Presupuesto al 80% del límite mensual</div>
            <div className="alert-item alert-ok">✓ Ficha técnica Proyecto Norte aprobada y homologada</div>
            <div className="alert-item alert-info">ℹ Nuevo informe de analítica disponible para revisión</div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
`;

const secCTA = `"use client";
import React, { useState } from "react";
import { FadeUp } from "../ui/FadeUp";

export function CTA({ onEnter, onLeave }) {
  const [formStatus, setFormStatus] = useState("idle");

  const handleForm = (e) => {
    e.preventDefault();
    setFormStatus("processing");
    setTimeout(() => {
      setFormStatus("done");
      setTimeout(() => setFormStatus("idle"), 3500);
    }, 1500);
  };

  return (
    <section id="cta">
      <div className="cta-glow" aria-hidden={true}></div>
      <div className="cta-grid" aria-hidden={true}></div>
      <div className="cta-wrapper">
        <FadeUp className="cta-content">
          <span className="section-label">▸ Próximo paso</span>
          <h2>¿Listo para liderar<br /><span>su mercado?</span></h2>
          <p>Transformamos su posicionamiento comercial y documentación técnica en activos corporativos de alto rendimiento.</p>
          <div className="cta-info">
            <div className="cta-info-item"><span className="cta-icon">✉</span> contacto@strategicconnex.com</div>
            <div className="cta-info-item"><span className="cta-icon">📍</span> Operaciones Globales</div>
          </div>
        </FadeUp>
        <FadeUp className="cta-form-container" delay={0.2} style={{ position: "relative" }}>
          <form className="corporate-form" id="contactForm" autoComplete="off" onSubmit={handleForm}>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="name" required placeholder=" " minLength={3} onMouseEnter={onEnter} onMouseLeave={onLeave} />
                <label htmlFor="name">Nombre completo</label>
                <div className="input-line"></div>
              </div>
              <div className="form-group">
                <input type="text" id="company" required placeholder=" " minLength={2} onMouseEnter={onEnter} onMouseLeave={onLeave} />
                <label htmlFor="company">Organización</label>
                <div className="input-line"></div>
              </div>
            </div>
            <div className="form-group">
              <input type="email" id="email" required placeholder=" " pattern="[a-z0-9._%+\\\\-]+@[a-z0-9.\\\\-]+\\\\.[a-z]{2,}$" onMouseEnter={onEnter} onMouseLeave={onLeave} />
              <label htmlFor="email">Correo corporativo</label>
              <div className="input-line"></div>
            </div>
            <div className="form-group">
              <textarea id="message" rows={3} required placeholder=" " minLength={10} onMouseEnter={onEnter} onMouseLeave={onLeave}></textarea>
              <label htmlFor="message">Requerimiento principal</label>
              <div className="input-line"></div>
            </div>
            <button type="submit" className="btn-primary btn-submit" aria-live="polite" onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ background: formStatus === 'done' ? '#22c55e' : 'var(--gold)' }}>
              <span>{formStatus === 'idle' ? '▶ Enviar Solicitud' : formStatus === 'processing' ? 'Procesando...' : '✓ Solicitud Recibida'}</span>
            </button>
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
`;

const pageTsx = `"use client";
import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { FloatingWP } from "@/components/layout/FloatingWP";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Docs } from "@/components/sections/Docs";
import { Industries } from "@/components/sections/Industries";
import { KPI } from "@/components/sections/KPI";
import { Dashboard } from "@/components/sections/Dashboard";
import { CTA } from "@/components/sections/CTA";

export default function Page() {
  const [isHovering, setIsHovering] = useState(false);

  const handleInteractEnter = () => setIsHovering(true);
  const handleInteractLeave = () => setIsHovering(false);

  return (
    <>
      <Navbar onEnter={handleInteractEnter} onLeave={handleInteractLeave} />
      <main>
        <Hero onEnter={handleInteractEnter} onLeave={handleInteractLeave} />
        <About />
        <Services />
        <Docs />
        <Industries onEnter={handleInteractEnter} onLeave={handleInteractLeave} />
        <KPI />
        <Dashboard />
      </main>
      <CTA onEnter={handleInteractEnter} onLeave={handleInteractLeave} />
      <Footer />
      <FloatingWP onEnter={handleInteractEnter} onLeave={handleInteractLeave} />
      <BackToTop />
      <CustomCursor isHovering={isHovering} />
    </>
  );
}
`;

fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/ui/Counter.tsx', uiCounter);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/ui/FadeUp.tsx', uiFadeUp);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/layout/Navbar.tsx', layoutNavbar);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/layout/Footer.tsx', layoutFooter);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/layout/BackToTop.tsx', layoutBackToTop);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/layout/CustomCursor.tsx', layoutCursor);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/layout/FloatingWP.tsx', layoutFloatingWP);

fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections/Hero.tsx', secHero);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections/About.tsx', secAbout);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections/Services.tsx', secServices);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections/Docs.tsx', secDocs);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections/Industries.tsx', secIndustries);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections/KPI.tsx', secKPI);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections/Dashboard.tsx', secDashboard);
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections/CTA.tsx', secCTA);

fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/app/page.tsx', pageTsx);
