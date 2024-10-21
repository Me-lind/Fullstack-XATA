import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export default {
  mode: 'development',
  entry: {
    login: './src/components/LoginForm.ts',
    signup: './src/components/SignupForm.ts',
    dashboard: './src/components/Dashboard.ts',
    taskBoard: './src/components/TaskBoard.ts',
    teamManagement: './src/components/TeamManagement.ts',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@scripts': path.resolve(process.cwd(), 'scripts/'),
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
        test: /\.css$/,  // If you're using CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
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
      directory: path.join(process.cwd(), 'dist'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/auth', '/projects', '/teams'],
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    ],
  },
};
