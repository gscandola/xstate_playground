const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        include: path.join(process.cwd(), "src"),
        use: {
          loader: "swc-loader",
          options: {
            env: {
              targets: "> 0.2%, not dead, not IE 11, not op_mini all",
              mode: "entry",
              coreJs: 3,
            },
            minify: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "@": path.join(process.cwd(), "src/"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: "./dist",
    historyApiFallback: true,
  },
};
