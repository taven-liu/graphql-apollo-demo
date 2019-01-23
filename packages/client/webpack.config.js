const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const getPostcssLoaders = isProductionMode => {
  const postCssLoaders = [
    {
      loader: 'css-loader',
      options: {
        modules: true,
        minimize: isProductionMode,
        sourceMap: true,
        camelCase: true,
        importLoaders: 1,
        localIdentName: '[path][name]__[local]--[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: loader => [require('postcss-cssnext')()]
      }
    }
  ]
  if (isProductionMode) {
    return [MiniCssExtractPlugin.loader].concat(postCssLoaders)
  } else {
    return ['style-loader'].concat(postCssLoaders)
  }
}

const cssUse = [MiniCssExtractPlugin.loader].concat('css-loader?minimize')
const cssUseDebug = ['style-loader', 'css-loader']

module.exports = (env = {}, argv) => {
  const isProductionMode = argv.mode === 'production'
  return {
    entry: {
      app: ['react-hot-loader/patch', './src/index.js']
    },
    output: {
      filename: isProductionMode ? '[name].[chunkhash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].[chunkhash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: getPostcssLoaders(isProductionMode)
        },
        {
          test: /\.css$/,
          include: /node_modules/,
          use: isProductionMode ? cssUse : cssUseDebug
        },
        {
          test: /\.(png|jpg|gif|svg|woff2?)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.json', '.css'],
      modules: ['node_modules', path.resolve(__dirname, 'src')]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: isProductionMode ? 'production' : 'development'
      }),
      new MiniCssExtractPlugin({
        filename: isProductionMode ? '[name].[hash].css' : '[name].css',
        chunkFilename: isProductionMode ? '[id].[hash].css' : '[id].css'
      }),
      !isProductionMode && new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: path.resolve(__dirname, './src/favicon.ico')
      }),
      new webpack.NamedModulesPlugin(),
      isProductionMode &&
        new UglifyJSPlugin({
          parallel: true,
          sourceMap: true
        })
    ].filter(plugin => plugin),
    devServer: {
      historyApiFallback: {
        disableDotRule: true
      },
      proxy: {
        '/token': {
          target: 'http://localhost:4000'
        }
      },
      compress: true,
      hot: true,
      port: 8000
    },
    devtool: isProductionMode ? 'source-map' : 'cheap-module-eval-source-map'
  }
}
