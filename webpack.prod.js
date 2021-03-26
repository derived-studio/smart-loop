const path = require('path')
const webpack = require('webpack')

const outputFileName = 'gameloop'
module.exports = {
  mode: 'production',
  entry: './src/gameloop.ts',
  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${outputFileName}.min.js`,
    libraryTarget: 'commonjs2'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css', '.scss']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
              configFile: 'tsconfig.prod.json'
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader, // Extract css to separate files
          {
            // Translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: false
            }
          },
          {
            // Compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFileName}.css`
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
