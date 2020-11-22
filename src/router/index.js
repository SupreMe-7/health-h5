import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/home',
		name: 'home-page',
		component: () =>
			import(/* webpackChunkName: "home-page" */ '../module/Home/index.vue'),
	},
	{
		path: '/general',
		name: 'general-page',
		component: () =>
			import(
				/* webpackChunkName: "general-page" */ '../module/General/index.vue'
			),
	},
	{
		path: '/patients',
		name: 'patients-page',
		component: () =>
			import(
				/* webpackChunkName: "patients-page" */ '../module/Patients/index.vue'
			),
	},
	{
		path: '/supervisor',
		name: 'supervisor-page',
		component: () =>
			import(
				/* webpackChunkName: "supervisor-page" */ '../module/Supervisor/index.vue'
			),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
