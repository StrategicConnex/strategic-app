"use client";
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
      className={`custom-cursor ${isHovering ? 'hover' : ''}`} 
      style={{ left: mousePos.x, top: mousePos.y, opacity: mousePos.x === 0 ? 0 : 1 }}
    />
  );
}
