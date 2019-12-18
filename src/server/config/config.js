import { join } from "path";
const env = process.env.NODE_ENV === "production";
console.log( join(__dirname, "..", "assets"))
let config = {
	viewDir: join(__dirname, "..", "assets"),
	staticDir: join(__dirname, "..", "assets"),
	baseUrl: env ? "" : "",
	port: env ? "3000" : "3000"
};
module.exports = config;
