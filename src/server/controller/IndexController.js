import { route, GET } from "awilix-koa";

@route("/index")
class IndexController {
	constructor({ indexService }) {
		this.indexService = indexService;
	}
	@route("/index")
	@GET()
	async index(ctx, next) {
		const result = await this.indexService.getData();
		ctx.body = result;
	}
}
export default IndexController;
