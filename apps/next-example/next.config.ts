import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This allows us to handle next-example, the same way we do standard apps, in CI
  distDir: 'dist',
  sassOptions: {
    implementation: 'sass-embedded',
    quietDeps: true, // Works around issues with govuk-frontend
    silenceDeprecations: ['import'] // This is required until govuk-frontend moves to using modules
  },
  turbopack: {
    resolveAlias: {
      '@not-govuk/head': '@not-govuk/head/dummy',    // ADD THIS LINE
      '@not-govuk/router': '@not-govuk/router/next', // ADD THIS LINE
    }
  }
};

export default nextConfig;
