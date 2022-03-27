const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");

const isProduction = process.env.NODE_ENV === "production";
process.env.BABEL_KEEP_CSS = "1";

const styleLoader = {
  loader: "style-loader",
  options: {
    injectType: isProduction ? "singletonStyleTag" : "styleTag"
  }
}

const config = {
  entry: {
    txui: "./src/txui.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
  plugins: [
    new webpack.ProgressPlugin({
      process: "process/browser"
    })
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(jpeg|jpg|png|woff|woff2|svg|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.css$/,
        exclude: /styleguide/,
        use: [styleLoader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.css$/,
        include: /styleguide/,
        use: [styleLoader, "css-loader"],
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  devtool: "source-map",
  stats: {
    children: false
  },
  externals: [
    {
      react: "react",
      "react-dom": "react-dom"
    }
  ]
};

const devConfig = {
  mode: "development"
};

const prodConfig = {
  mode: "production"
}

module.exports = isProduction
  ? merge(config, prodConfig)
  : merge(config, devConfig);