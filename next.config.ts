import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuración para permitir pruebas desde dispositivos en la red local (ej. celular)
  experimental: {
    // @ts-ignore - Permite HMR desde otros orígenes de la LAN
    allowedOrigins: ["192.168.1.48", "localhost:3000"]
  },
  // Algunas versiones de dev-server la solicitan en la raíz
  // @ts-ignore
  allowedDevOrigins: ["192.168.1.48", "http://192.168.1.48:3000"]
};

export default nextConfig;
