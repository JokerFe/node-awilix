import fetch from "node-fetch";
import { baseUrl } from "../config/config";

class SafeRequest {
	constructor(url) {
		this.url = url;
		this.baseUrl = baseUrl;
	}

	Fetch(options) {
		return new Promise((resolve, reject) => {
			// 默认输入内容
			let result = {
				code: 0,
				message: "",
				data: []
			};

			let jokulFetch = fetch(this.baseUrl + this.url);
			if (options.params) {
				jokulFetch = fetch(this.baseUrl + this.url, {
					method: options.method,
					body: options.params
				});
			}
			jokulFetch
				.then(res => res.json())
				.then(json => {
					result.data = json;
					resolve(result);
				})
				.catch(error => {
					result.code = 1;
					//mail 服务器 直接打电话 发邮件
					result.message = "请求错误，接口报错！！！";
					reject(result);
				});
		});
	}
}
export default SafeRequest;
