import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/patients/home',
    },
    {
        path: '/patients/login',
        name: 'login-page',
        component: () =>
            import(
                /* webpackChunkName: "login-page" */ '../module/Patients/Login/Login.vue'
            ),
    },
    {
        path: '/patients/registered',
        name: 'registered-page',
        component: () =>
            import(
                /* webpackChunkName: "registered-page" */ '../module/Patients/Login/Registered.vue'
            ),
    },
    {
        path: '/patients/home',
        name: 'home-page',
        component: () =>
            import(
                /* webpackChunkName: "home-page" */ '../module/Patients/Home/index.vue'
            ),
    },
    {
        path: '/patients/monitor-calendar',
        name: 'monitor-calendar-page',
        component: () =>
            import(
                /* webpackChunkName: "monitor-calendar-page" */ '../module/Patients/MonitorCalendar/index.vue'
            ),
    },
    {
        path: '/patients/my-doctor',
        name: 'my-doctor-page',
        component: () =>
            import(
                /* webpackChunkName: "my-doctor-page" */ '../module/Patients/MyDoctor/index.vue'
            ),
    },
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
    {
        path: '/patients/diagnosis-advice',
        name: 'diagnosis-advice-page',
        component: () =>
            import(
                /* webpackChunkName: "diagnosis-advice-page" */ '../module/Patients/DiagnosisAdvice/index.vue'
            ),
    },
    {
        path: '/patients/notice',
        name: 'notice-page',
        component: () =>
            import(
                /* webpackChunkName: "notice-page" */ '../module/Patients/Notice/index.vue'
            ),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
