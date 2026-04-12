const fs = require('fs');
const html = fs.readFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/StrategicWeb/strategic_connex.html', 'utf8');

const match = html.match(/<body>([\s\S]*?)<\/body>/);
let body = match ? match[1] : html;

body = body
  .replace(/class=/g, 'className=')
  .replace(/<img([^>]*)>/g, '<img$1 />')
  .replace(/<br>/g, '<br />')
  .replace(/<input([^>]*)>/g, '<input$1 />')
  .replace(/aria-hidden="true"/g, 'aria-hidden={true}')
  .replace(/aria-expanded="false"/g, 'aria-expanded={false}')
  .replace(/<script src="main\.js" defer><\/script>/g, '')
  .replace(/style="([^"]*)"/g, (m, s) => {
    const obj = {};
    s.split(';').filter(x => x.trim()).forEach(x => {
      let [k, v] = x.split(':');
      if (k && v) {
        k = k.trim().replace(/-([a-z])/g, (m2, c) => c.toUpperCase());
        obj[k] = v.trim();
      }
    });
    return `style={${JSON.stringify(obj)}}`;
  });

const jsx = `"use client";
import React, { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/main.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      try { document.body.removeChild(script); } catch(e) {}
    };
  }, []);

  return (<>${body}</>);
}
`;

fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/app/page.tsx', jsx, 'utf8');

const css = fs.readFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/StrategicWeb/styles.css', 'utf8');
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/app/globals.css', `@import "tailwindcss";\n${css}`, 'utf8');

const js = fs.readFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/StrategicWeb/main.js', 'utf8');
fs.writeFileSync('C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/public/main.js', js, 'utf8');
