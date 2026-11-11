import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Photos are resized and converted (WebP/AVIF) by the Unsplash image CDN,
    // so they load fast everywhere and use no Vercel image quota.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 384],
  },
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|woff2|jpg|png|webp)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
