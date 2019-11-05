module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          './node_modules/style-loader/index.js',
          { loader: './node_modules/css-loader/dist/cjs.js', options: { importLoaders: 1 } },
          { loader: 'sass-loader' },
        ]
      },
      {
        test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
        loader: './node_modules/file-loader/dist/cjs.js',
        query: { name: 'static/media/[name].[hash:8].[ext]' }
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: './node_modules/url-loader/dist/cjs.js',
        query: { limit: 10000, name: 'static/media/[name].[hash:8].[ext]' }
      },
      {
        test: /\.stories\.(mjs|[jt]sx?)$/,
        loaders: [require.resolve('@storybook/source-loader')],
        enforce: 'pre'
      }
    ]
  }
};
