import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/patients',
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
        path: '/patients/add-calendar',
        name: 'add-calendar-page',
        component: () =>
            import(
                /* webpackChunkName: "add-calendar-page" */ '../module/Patients/MonitorCalendar/AddCalendar.vue'
            ),
    },
    {
        path: '/patients/my-mediciner',
        name: 'my-mediciner-page',
        component: () =>
            import(
                /* webpackChunkName: "my-mediciner-page" */ '../module/Patients/MyDoctor/index.vue'
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
        path: '/patients/personal-edit-phone-password',
        name: 'personal-edit-phone-password-page',
        component: () =>
            import(
                /* webpackChunkName: "personal-edit-phone-password-page" */ '../module/Patients/PersonalInformation/EditPhonePassword.vue'
            ),
    },
    {
        path: '/patients/personal-edit-information',
        name: 'personal-edit-information-page',
        component: () =>
            import(
                /* webpackChunkName: "personal-edit-information-page" */ '../module/Patients/PersonalInformation/EditInformation.vue'
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
    {
        path: '/download',
        name: 'download-page',
        component: () =>
            import(
                /* webpackChunkName: "download-page" */ '../module/Download/index.vue'
            ),
    },
    {
        path: '/doctor',
        redirect: '/doctor/home',
    },
    {
        path: '/doctor/login',
        name: 'doctor-login-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-login-page" */ '../module/Doctor/Login/Login.vue'
            ),
    },
    {
        path: '/doctor/registered',
        name: 'doctor-registered-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-registered-page" */ '../module/Doctor/Login/Registered.vue'
            ),
    },
    {
        path: '/doctor/home',
        name: 'doctor-home-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-home-page" */ '../module/Doctor/Home/index.vue'
            ),
    },
    {
        path: '/doctor/new-sufferer',
        name: 'doctor-new-sufferer-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-new-sufferer-page" */ '../module/Doctor/MySufferer/NewSufferer.vue'
            ),
    },
    {
        path: '/doctor/my-sufferer',
        name: 'doctor-my-sufferer-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-my-sufferer-page" */ '../module/Doctor/MySufferer/index.vue'
            ),
    },
    {
        path: '/doctor/notice',
        name: 'doctor-notice-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-notice-page" */ '../module/Doctor/Notice/index.vue'
            ),
    },
    {
        path: '/doctor/sufferer-cases',
        name: 'doctor-sufferer-cases-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-sufferer-cases-page" */ '../module/Doctor/MySufferer/SuffererCases.vue'
            ),
    },
    {
        path: '/doctor/sufferer-calendar',
        name: 'doctor-sufferer-calendar-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-sufferer-calendar-page" */ '../module/Doctor/MySufferer/SuffererCalendar.vue'
            ),
    },
    {
        path: '/doctor/mine',
        name: 'doctor-mine-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-mine-page" */ '../module/Doctor/Mine/index.vue'
            ),
    },
    {
        path: '/doctor/add-record',
        name: 'doctor-add-record-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-add-record-page" */ '../module/Doctor/MySufferer/AddRecord.vue'
            ),
    },
    {
        path: '/doctor/add-advice',
        name: 'doctor-add-advice-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-add-advice-page" */ '../module/Doctor/MySufferer/AddAdvice.vue'
            ),
    },
    {
        path: '/doctor/sufferer-information',
        name: 'doctor-sufferer-information-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-sufferer-information-page" */ '../module/Doctor/MySufferer/SuffererInformation.vue'
            ),
    },
    {
        path: '/doctor/chose-superior',
        name: 'doctor-chose-superior-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-chose-superior-page" */ '../module/Doctor/MySuperior/ChoseSuperior.vue'
            ),
    },
    {
        path: '/doctor/my-superior',
        name: 'doctor-my-superior-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-my-superior-page" */ '../module/Doctor/MySuperior/index.vue'
            ),
    },
    {
        path: '/doctor/ask-superior',
        name: 'doctor-ask-superior-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-ask-superior-page" */ '../module/Doctor/MySuperior/AskSuperior.vue'
            ),
    },
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
});

export default router;
