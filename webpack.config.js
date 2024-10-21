const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './src/components/Index.ts',
    login: './src/components/LoginForm.ts',
    signup: './src/components/SignupForm.ts',
    dashboard: './src/components/Dashboard.ts',
    taskBoard: './src/components/TaskBoard.ts',
    teamManagement: './src/components/TeamManagement.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Adjust if needed
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@scripts': path.resolve(__dirname, 'scripts/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // If you have CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/login.html',
      chunks: ['login'],
      filename: 'login.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/signup.html',
      chunks: ['signup'],
      filename: 'signup.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/dashboard.html',
      chunks: ['dashboard'],
      filename: 'dashboard.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/taskBoard.html',
      chunks: ['taskBoard'],
      filename: 'taskBoard.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/teamManagement.html',
      chunks: ['teamManagement'],
      filename: 'teamManagement.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    proxy: {
      '/auth': 'http://localhost:3000',
      '/projects': 'http://localhost:3000',
      '/teams': 'http://localhost:3000',
    },
  },
};
