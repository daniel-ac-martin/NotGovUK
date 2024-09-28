import webpack from 'webpack';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent react-router from resolving in order to use Next's router instead.
  // Normally users will not need to do this, as they will not have react-router installed.
  webpack: (config, _options) => ({
    ...config,
    plugins: [
      ...config.plugins,
      new webpack.NormalModuleReplacementPlugin(/^react-router$/, '@not-govuk\/VOID-react-router'),
      new webpack.NormalModuleReplacementPlugin(/^react-router-dom$/, '@not-govuk\/VOID-react-router-dom'),
    ]
  })
};

export default nextConfig;
