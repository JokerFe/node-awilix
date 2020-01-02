<template>
	<div id="app" class="app">
		<router-link class="app-link" to="/home">home</router-link>
		<router-link class="app-link" to="/about">about</router-link>
		<router-view></router-view>
	</div>
</template>
<style scoped>
.app {
	height: 100vh;
	background-color: black;
	color: yellowgreen;
}
/* 测试 *//* 测试 *//* 测试 *//* 测试 *//* 测试 *//* 测试 *//* 测试 *//* 测试 *//* 测试 */
.app-link {
	color: aquamarine;
	text-decoration: none;
}
</style>
