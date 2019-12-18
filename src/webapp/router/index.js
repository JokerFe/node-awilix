import VueRouter from "vue-router";

// page
import Home from "../components/home/Home.vue";
import About from "../components/about/About.vue";

export default new VueRouter({
	mode: "history",
	routes: [
		{
			path: "/",
			redirect: "/home"
		},
		{
			path: "/home",
			component: Home
		},
		{
			path: "/about",
			component: About
		}
	]
});
