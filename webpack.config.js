const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const DashboardPlugin = require("webpack-dashboard/plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const webpackConfig = smp.wrap(function(env) {
	console.log(env.production);
	return {
		mode: env.production ? "production" : "development",
		// 入口文件
		entry: `${__dirname}/src/webapp/app.js`,
		// 输出文件路径和格式
		output: {
			path: path.join(__dirname, "dist/assets"),
			publicPath: "/",
			filename: "js/[name].bundle.js"
		},
		// optimization: {
		// 	minimizer: [
		// 		new UglifyJsPlugin({
		// 			parallel: true
		// 		})
		// 	]
		// },
		resolve: {
			alias: {
				// 修改了Vue被带入时候包的路径
				vue$: "vue/dist/vue.js"
			}
		},
		// loader配置
		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: "vue-loader"
				},
				// 它会应用到普通的 `.js` 文件
				// 以及 `.vue` 文件中的 `<script>` 块
				{
					test: /\.js$/,
					exclude: /(node_modules|bower_components)/,
					use: [
						"cache-loader",
						{
							loader: "babel-loader",
							options: {
								babelrc: false, // 不采用.babelrc的配置
								plugins: ["dynamic-import-webpack"]
							}
						}
					]
				},
				// // 它会应用到普通的 `.css` 文件
				// 以及 `.vue` 文件中的 `<style>` 块
				{
					test: /\.css$/,
					use: [
						env.production ? MiniCssExtractPlugin.loader : "vue-style-loader",
						"css-loader",
						"postcss-loader"
					]
				},
				// 处理本地静态资源
				{
					test: /\.(woff|svg|eot|ttf|png|jpg|jpeg)\??.*$/,
					loader: "url-loader"
				}
			]
		},
		// 插件
		plugins: [
			// 请确保引入这个插件！
			new VueLoaderPlugin(),
			new HtmlWebpackPlugin({
				filename: path.join(__dirname, "dist/views/index.html"),
				template: "src/webapp/index.html"
			}),
			new ProgressBarPlugin(),
			new DashboardPlugin(),
			new ManifestPlugin(),
			new MiniCssExtractPlugin({
				filename: "css/[name].css"
			}),
			new OptimizeCSSAssetsPlugin({
				// 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
				assetNameRegExp: /\.(sa|sc|c)ss$/g,
				// 指定一个优化css的处理器，默认cssnano
				cssProcessor: require("cssnano"),

				cssProcessorPluginOptions: {
					preset: [
						"default",
						{
							discardComments: { removeAll: true }, //对注释的处理
							normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
						}
					]
				},
				canPrint: true // 是否打印编译过程中的日志
			})
		]
	};
});

module.exports = webpackConfig;
