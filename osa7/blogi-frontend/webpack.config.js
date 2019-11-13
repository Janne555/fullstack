const path = require('path')

module.exports = (env, argv) => ({
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'devserver_public'),
    compress: true,
    port: 3000,
    proxy: {
      "/api": "http://localhost:3003"
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      BACKEND_URL: JSON.stringify(argv.mode === 'production' ? 'this would have a prod address if there was one' : 'http://localhost:3003')
    })
  ]
})