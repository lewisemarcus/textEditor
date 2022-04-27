const HtmlWebpackPlugin = require("html-webpack-plugin")
const WebpackPwaManifest = require("webpack-pwa-manifest")
const path = require("path")
const { InjectManifest } = require("workbox-webpack-plugin")

// DONE: Add and configure workbox plugins for a service worker and manifest file.
// DONE: Add CSS loaders and babel to webpack.

module.exports = () => {
    return {
        mode: "development",
        entry: {
            main: "./src/js/index.js",
            install: "./src/js/install.js",
        },
        devServer: {
            hot: true,
            static: "./dist",
            open: false,
        },

        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: "Client Server",
                template: "./index.html",
            }),
            new InjectManifest({
                swSrc: "./src-sw.js",
                swDest: "src-sw.js",
            }),
            new WebpackPwaManifest({
                fingerprints: false,
                inject: true,
                name: "PWA Text Editor",
                short_name: "JATE",
                description: "type away",
                background_color: "#225ca3",
                theme_color: "#225ca3",
                start_url: "/",
                publicPath: "/",
                orientation: "portrait",
                display: "standalone",
                icons: [
                    {
                        src: path.resolve("src/images/logo.png"),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join("assets", "icons"),
                    },
                ],
            }),
        ],

        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env"],
                            plugins: [
                                "@babel/plugin-proposal-object-rest-spread",
                                "@babel/transform-runtime",
                            ],
                        },
                    },
                },
            ],
        },
    }
}
