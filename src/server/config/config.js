import { join } from "path";
const env = process.env.NODE_ENV === "production";
let config = {
	viewDir: join(__dirname, "..", "views"),
	staticDir: join(__dirname, "..", "assets"),
	baseUrl: env ? "" : "",
	port: env ? "3000" : "3000"
};
module.exports = config;