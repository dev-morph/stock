import type { NextConfig } from 'next';
import path from 'path'

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    ignoreDuringBuilds: true, // 빌드 시 ESLint 검사 안 함

  },
};

export default nextConfig;
