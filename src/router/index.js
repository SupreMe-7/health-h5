import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/patients/home',
    },
    {
        path: '/patients/home',
        name: 'home-page',
        component: () =>
            import(
                /* webpackChunkName: "home-page" */ '../module/Patients/Home/index.vue'
            ),
    },
    // {
    //     path: '/patients/home',
    //     name: 'home-page',
    //     component: () =>
    //         import(
    //             /* webpackChunkName: "home-page" */ '../module/Patients/Home/index.vue'
    //         ),
    // },
    // {
    //     path: '/patients/home',
    //     name: 'home-page',
    //     component: () =>
    //         import(
    //             /* webpackChunkName: "home-page" */ '../module/Patients/Home/index.vue'
    //         ),
    // },
    {
        path: '/patients/mine',
        name: 'mine-page',
        component: () =>
            import(
                /* webpackChunkName: "mine-page" */ '../module/Patients/Mine/index.vue'
            ),
    },
    {
        path: '/patients/personal-information',
        name: 'personal-information-page',
        component: () =>
            import(
                /* webpackChunkName: "personal-information-page" */ '../module/Patients/PersonalInformation/index.vue'
            ),
    },
    {
        path: '/patients/personal-cases',
        name: 'personal-cases-page',
        component: () =>
            import(
                /* webpackChunkName: "personal-cases-page" */ '../module/Patients/PersonalCases/index.vue'
            ),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
