"use client";
import React, { useState } from "react";
import { FadeUp } from "../ui/FadeUp";

export function CTA({ onEnter, onLeave }) {
  const [formStatus, setFormStatus] = useState("idle");

  const handleForm = async (e) => {
    e.preventDefault();
    setFormStatus("processing");
    
    const formData = {
      name: e.target.name.value,
      company: e.target.company.value,
      email: e.target.email.value,
      message: e.target.message.value
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("done");
        e.target.reset(); // Limpiar el formulario
      } else {
        console.error("Error enviando correo.");
        setFormStatus("idle"); // Volver a permitir enviar
      }
    } catch (error) {
      console.error(error);
      setFormStatus("idle");
    }

    // Resetear el botón de éxito después de unos segundos
    setTimeout(() => {
      setFormStatus("idle");
    }, 4500);
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
            <div className="cta-info-item"><span className="cta-icon">📍</span> Operaciones en Neuquén Capital y soporte técnico para bases en Añelo.</div>
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
              <input type="email" id="email" required placeholder=" " pattern="[a-z0-9._%+\\-]+@[a-z0-9.\\-]+\\.[a-z]{2,}$" onMouseEnter={onEnter} onMouseLeave={onLeave} />
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
