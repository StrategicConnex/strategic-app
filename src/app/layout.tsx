import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { CookieConsent } from "@/components/ui/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.strategicconnex.com.ar"),
  title: "Posicionamiento Web Estratégico | StrategicConnex",
  description: "Agencia SEO especializada en posicionamiento web, auditorías técnicas y crecimiento orgánico. Aumentamos tu visibilidad en Google con estrategias orientadas a resultados.",
  keywords: ["posicionamiento web estratégico", "agencia SEO", "SEO para empresas", "consultoría SEO", "optimización SEO profesional", "auditoría SEO técnica"],
  robots: "index, follow",
  alternates: {
    canonical: "https://www.strategicconnex.com.ar",
  },
  openGraph: {
    title: "Posicionamiento Web Estratégico | StrategicConnex",
    description: "Agencia SEO especializada en posicionamiento web, auditorías técnicas y crecimiento orgánico para empresas de alto impacto.",
    url: "https://www.strategicconnex.com.ar",
    siteName: "Strategic Connex",
    images: [
      {
        url: "/images/marketing_digital_1775961023662.png", 
        width: 1200,
        height: 630,
        alt: "Strategic Connex | Agencia SEO & Posicionamiento Web"
      }
    ],
    locale: "es_AR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Posicionamiento Web Estratégico | StrategicConnex",
    description: "Agencia SEO especializada en posicionamiento web y crecimiento orgánico.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
