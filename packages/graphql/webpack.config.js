const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env = {}, argv) => {
  return {
    target: 'node',
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /src/,
          use: 'babel-loader'
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: '**/*.pem',
          to: '[name].[ext]'
        }
      ])
    ]
  }
}
