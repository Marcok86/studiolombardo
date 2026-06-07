import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Ancora la root del workspace a questa cartella: evita che Next scelga
  // la directory padre come root per via di altri lockfile presenti.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
