/*
 * @Description: 重写webpack配置
 */

const { override, fixBabelImports, addWebpackExternals, addWebpackAlias, addWebpackPlugin, disableEsLint } = require("customize-cra");
const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

if (process.env.NODE_ENV === "production") process.env.GENERATE_SOURCEMAP = "false";

// 针对生产环境修改配置
const productionConfig = () => (config) => {
    if (config.mode === "production") {
        const splitChunksConfig = config.optimization.splitChunks;
        if (config.entry && config.entry instanceof Array) {
            config.entry = {
                main: config.entry,
                vendors: ["react", "react-dom", "react-router-dom", "react-router"],
            };
        } else if (config.entry && typeof config.entry === "object") {
            config.entry.vendors = ["react", "react-loadable", "react-dom", "react-router-dom", "react-router"];
        }
        Object.assign(splitChunksConfig, {
            cacheGroups: {
                vendors: {
                    test: "vendors",
                    name: "vendors",
                    priority: 10,
                },
                common: {
                    name: "common",
                    minChunks: 2,
                    minSize: 30000,
                    chunks: "all",
                },
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    priority: 9,
                    enforce: true,
                },
            },
        });
    }
    return config;
};

module.exports = override(
    fixBabelImports("import", {
        //配置按需加载
        libraryName: "antd",
        libraryDirectory: "es",
        style: "css",
    }),
    // disableEsLint(),
    addWebpackExternals({
        //不做打包处理配置，如直接以cdn引入的
        // echarts: "echarts",
        BMap: "BMap",
    }),
    addWebpackAlias({
        //路径别名
        "@": path.resolve(__dirname, "src"),
    }),
    addWebpackPlugin(
        new ProgressBarPlugin({
            format: "build [:bar] :percent (:elapsed seconds)",
            clear: false,
            width: 60,
        })
    ),
    productionConfig()
);
