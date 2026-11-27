import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.sanity.io;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://mycentralasia.com https://*.mycentralasia.com https://cdn.sanity.io https://*.vercel.app https://scontent.cdninstagram.com https://*.cdninstagram.com;
    media-src 'self' blob: data:;
    font-src 'self' data:;
    connect-src 'self' https://*.api.sanity.io;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
`.replace(/\s{2,}/g, " ").trim();

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mycentralasia.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.mycentralasia.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.vercel.app",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/favicon.ico",
        destination: "/icon.svg",
        permanent: true,
      },
      {
        source: "/icon.png",
        destination: "/icon.svg",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Inside next.config.ts -> headers()
        source: "/((?!api|studio|_next/static|_next/image|icon.svg|apple-icon.png).*)",
         headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/icon.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;