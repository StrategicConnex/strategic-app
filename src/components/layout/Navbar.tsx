"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function Navbar({ onEnter, onLeave }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <div className="nav-inner">
        <Link href="/" className="logo" onMouseEnter={onEnter} onMouseLeave={onLeave}>
          <Image src="/logo.png" alt="Strategic Connex Logo" width={200} height={80} style={{ width: 'auto', height: '58px', objectFit: 'contain' }} className="logo-img" />
          <span className="logo-text">STRATEGIC <span className="logo-light">CONNEX</span></span>
        </Link>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link href="/#about" onClick={() => setMenuOpen(false)}>Nosotros</Link></li>
          <li><Link href="/#services" onClick={() => setMenuOpen(false)}>Servicios</Link></li>
          <li><Link href="/#docs" onClick={() => setMenuOpen(false)}>Documentación</Link></li>
          <li><Link href="/#industries" onClick={() => setMenuOpen(false)}>Industrias</Link></li>
          <li><Link href="/#dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
          <li><Link href="/#cta" className="nav-cta" onClick={() => setMenuOpen(false)}>Contactar</Link></li>
        </ul>
        <button className="mobile-menu-btn" aria-expanded={menuOpen} aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
