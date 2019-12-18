import Koa from "koa";
import router from "koa-simple-router";
import serve from "koa-static";
import render from "koa-swig";
import co from "co";
import { asClass, asValue, Lifetime, createContainer } from "awilix";
import { scopePerRequest, loadControllers } from "awilix-koa";
import { port, staticDir, viewDir } from "./config/config";
import log4js from "log4js";
import errorHandler from "./utils/ErrorHandle";

const app = new Koa();

/**
 * awilix/awilix-koa 配置
 */
// 创建容器
const container = createContainer();
// 容器加载service

container.loadModules([[__dirname + "/service/*.js", { register: asClass }]], {
	formatName: "camelCase",
	registerOptions: {
		lifetime: Lifetime.SCOPED
	}
});
// 添加中间件，将其传递给Awilix容器。将在上下文上附加一个作用域容器。
app.use(scopePerRequest(container));
// 自动注入controller
app.use(loadControllers(__dirname + "/controller/*.js"), {
	cwd: __dirname
});

//前端模板
//co的作用是把 *函数全部自动向下执行 next -> next -> done
//async await 语法糖版本 koa-swig 并为KOA2 升级 KOA1
app.context.render = co.wrap(
	render({
		root: viewDir,
		autoescape: true,
		// cache: 'memory', // disable, set to false
		cache: false,
		varControls: ["[[", "]]"],
		ext: "html",
		writeBody: false
	})
);

// 错误日志
log4js.configure({
	appenders: {
		cheese: {
			type: "file",
			filename: "./logs/jokul-log.log"
		}
	},
	categories: {
		default: {
			appenders: ["cheese"],
			level: "error"
		}
	}
});
const logger = log4js.getLogger("cheese");
errorHandler.error(app, logger);
//配置静态资源
app.use(serve(staticDir));

// 启动3000端口
app.listen(port, () => {
	console.log(`Jokul | awilix-serve 已启动在${port}端口`);
});
