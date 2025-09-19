const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/yemen-regions-widget.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'yemen-regions-widget.min.js' : 'yemen-regions-widget.js',
      library: 'YemenRegionsWidget',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.json$/,
          type: 'json'
        }
      ]
    },
    optimization: {
      minimize: isProduction
    },
    devtool: isProduction ? false : 'source-map',
    resolve: {
      extensions: ['.js', '.json']
    }
  };
};
