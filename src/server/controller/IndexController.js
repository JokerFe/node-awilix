import { route, GET } from "awilix-koa";

@route("/index")
class IndexController {
	constructor({ indexService }) {
		this.indexService = indexService;
	}
	@route("/")
	@GET()
	async index(ctx, next) {
		console.log("🍎")
		const result = await this.indexService.getData();
		ctx.body = await ctx.render("index");
		// ctx.body = result;
	}
}
export default IndexController;
