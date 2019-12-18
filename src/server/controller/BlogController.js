import { route, GET } from "awilix-koa";

@route("/blog")
class BlogController {
	constructor() {}
	@route("/")
	@GET()
	async index(ctx, next) {
		ctx.body = {
			data: `hello Jokul 1`
		};
	}
	@route("/page/:pages")
	@GET()
	async page(ctx, next) {
		ctx.body = {
			data: `hello Jokul ${ctx.params.pages}`
		};
	}
}
export default BlogController;
