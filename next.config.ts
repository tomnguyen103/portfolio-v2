import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the Turbopack workspace root to THIS project directory.
  // Without this, Next.js walks up the tree, finds a stray package-lock.json
  // in the home folder (C:\Users\huuth), and warns that it inferred the wrong
  // workspace root. Pinning it here silences the warning and is safe on CI/Netlify.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
