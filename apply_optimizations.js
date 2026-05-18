const fs = require('fs');

// Helper to replace text in files
function patchFile(filepath, search, replaceStr) {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(search, replaceStr);
  fs.writeFileSync(filepath, content, 'utf8');
}

function globalPatch(filepath, searchRegex, replaceStr) {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(searchRegex, replaceStr);
  fs.writeFileSync(filepath, content, 'utf8');
}

// 1. Remove 'unoptimized' keyword from all Image tags
const imageFiles = [
  'C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/layout/Navbar.tsx',
  'C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/layout/Footer.tsx',
  'C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections/Services.tsx',
  'C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/sections/Industries.tsx'
];

imageFiles.forEach(file => {
  globalPatch(file, / unoptimized /g, ' ');
  globalPatch(file, / unoptimized/g, ''); // in case it is right before closing tag
});

// 2. Change Next <a> to <Link> in Navbar
const navPath = 'C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/components/layout/Navbar.tsx';
let navContent = fs.readFileSync(navPath, 'utf8');
navContent = navContent.replace('import Image from "next/image";', 'import Image from "next/image";\nimport Link from "next/link";');

// Specifically patch anchor tags pointing to IDs
navContent = navContent.replace(/<a href="#"/g, '<Link href="/"');
navContent = navContent.replace(/<a href="#(.*?)">(.*?)<\/a>/g, '<Link href="/#$1">$2</Link>');
navContent = navContent.replace(/<a href="#(.*?)"(.*?)>(.*?)<\/a>/g, '<Link href="/#$1"$2>$3</Link>');

// We also need to fix the logo click
navContent = navContent.replace(/<a href="#" className="logo"(.*?)>([\s\S]*?)<\/a>/, '<Link href="/" className="logo"$1>$2</Link>');
fs.writeFileSync(navPath, navContent, 'utf8');


// 3. Update Video with Poster and Preload in About.tsx
// (The video strategic.webm is already correctly configured and optimized directly in About.tsx and generate_components.js)


// 4. Transform Layout.tsx to include Corporate Metadata & OpenGraph
const layoutPath = 'C:/Users/Juan/OneDrive/Documentos/Antigravity/Strategic/strategic-app/src/app/layout.tsx';
const newMetadata = `export const metadata: Metadata = {
  title: "Strategic Connex | Inteligencia de Mercado y Posicionamiento B2B",
  description: "Consultoría y documentación técnica de precisión para la industria de operaciones complejas y el sector Oil & Gas. Tableros analíticos, diseño de branding corporativo y prospectos B2B calificados en tiempo real.",
  keywords: ["Oil and Gas", "B2B Marketing", "Documentación Técnica", "Ingeniería Comercial", "Software Analítica B2B"],
  robots: "index, follow",
  alternates: {
    canonical: "https://strategicconnex.com",
  },
  openGraph: {
    title: "Strategic Connex | Inteligencia B2B",
    description: "Multiplica tu tasa de cierre en industrias exigentes con nuestra tecnología de Documentación Técnica Certificada e Ingeniería Comercial B2B.",
    url: "https://strategicconnex.com",
    siteName: "Strategic Connex",
    images: [
      {
        url: "/images/marketing_digital_1775961023662.png", 
        width: 1200,
        height: 630,
        alt: "Strategic Connex B2B Dashboard Analytics"
      }
    ],
    locale: "es_AR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic Connex | Posicionamiento Estratégico",
    description: "Liderazgo comercial e inteligencia para ecosistemas y rubros energéticos.",
  }
};`;

let layoutContent = fs.readFileSync(layoutPath, 'utf8');
layoutContent = layoutContent.replace(/export const metadata: Metadata = {[\s\S]*?};/, newMetadata);
fs.writeFileSync(layoutPath, layoutContent, 'utf8');
