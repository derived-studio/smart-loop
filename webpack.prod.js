const path = require('path')
const webpack = require('webpack')

const outputFileName = 'index'
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${outputFileName}.min.js`,
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  optimization: {
    minimize: false
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              plugins: ['@babel/plugin-proposal-optional-chaining']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json'
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
