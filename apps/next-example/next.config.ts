import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This allows us to handle next-example, the same way we do standard apps, in CI
  distDir: 'dist',
  sassOptions: {
    implementation: 'sass-embedded',
    silenceDeprecations: [
      'import'       // Required until govuk-frontend moves to using modules
    ]
  },
  turbopack: {
    resolveAlias: {
      '@react-foundry/router': '@react-foundry/router/next', // ADD THIS LINE
    }
  }
};

export default nextConfig;
