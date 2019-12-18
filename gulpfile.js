const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const rollup = require("gulp-rollup");
const replace = require("@rollup/plugin-replace");
const entry = "src/server/**/*.js";

// 开发环境
function buildDev() {
	return watch(entry, { ignoreInitial: false }, function() {
		gulp
			.src(entry)
			.pipe(
				babel({
					babelrc: false, // false时不使用外边的 .babelrc的文件
					// ignore: ["./src/server/config/config.js"], // 让babel忽略的文件
					plugins: [
						["@babel/plugin-proposal-decorators", { legacy: true }], // awilix 编译装饰器 将类和对象装饰器编译到es5
						["@babel/plugin-proposal-class-properties", { loose: true }], // awilix 转换静态类属性以及使用属性初始化器语法声明的属性。
						"transform-es2015-modules-commonjs" // 将import等编译成es2015
					]
				})
			)
			.pipe(gulp.dest("dist"));
	});
}

// 线上环境
function buildProd() {
	return gulp
		.src(entry)
		.pipe(
			babel({
				babelrc: false, // false时不使用外边的 .babelrc的文件
				ignore: ["./src/server/config/config.js"], // babel编译时忽略配置文件，交给gulp-rollup来处理
				plugins: [
					["@babel/plugin-proposal-decorators", { legacy: true }], // 编译awilix中的装饰器 将类和对象装饰器编译到es5
					["@babel/plugin-proposal-class-properties", { loose: true }], //转换静态类属性以及使用属性初始化器语法声明的属性。
					"transform-es2015-modules-commonjs" // 将import等编译成es2015
				]
			})
		)
		.pipe(gulp.dest("dist"));
}

// 默认配置
function buildDefault() {
	return gulp
		.src(entry)
		.pipe(
			rollup({
				output: {
					format: "cjs"
				},
				input: "./src/server/config/config.js",
				plugins: [
					replace({
						"process.env.NODE_ENV": JSON.stringify("production")
					})
				]
			})
		)
		.pipe(gulp.dest("./dist"));
}

let build = gulp.series(buildDev);
if (process.env.NODE_ENV === "production") {
	build = gulp.series(buildProd, buildDefault);
}
gulp.task("default", build);
