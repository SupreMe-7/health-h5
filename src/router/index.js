import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: () =>
            import(
                /* webpackChunkName: "login-page" */ '../module/Login/index.vue'
            ),
    },
    {
        path: '/patients',
        redirect: '/patients/home',
    },
    {
        path: '/patients/login',
        name: 'login-page',
        component: () =>
            import(
                /* webpackChunkName: "patients-login-page" */ '../module/Patients/Login/Login.vue'
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
        path: '/patients/mediciner-chat',
        name: 'mediciner-chat',
        component: () =>
            import(
                /* webpackChunkName: "mediciner-chat" */ '../module/Patients/DoctorChat/index.vue'
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
        path: '/patients/timed-reminders',
        name: 'patients-timed-reminders',
        component: () =>
            import(
                /* webpackChunkName: "patients-timed-reminders" */ '../module/Patients/TimedReminders/index.vue'
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
        path: '/doctor/chat-list',
        name: 'doctor-chat-list',
        component: () =>
            import(
                /* webpackChunkName: "doctor-chat-list" */ '../module/Doctor/PatientChat/ChatList.vue'
            ),
    },
    {
        path: '/doctor/patient-chat',
        name: 'doctor-patient-chat',
        component: () =>
            import(
                /* webpackChunkName: "doctor-patient-chat" */ '../module/Doctor/PatientChat/index.vue'
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
        path: '/doctor/cur-sufferer',
        name: 'doctor-cur-sufferer-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-my-sufferer-page" */ '../module/Doctor/MySufferer/CurSufferer.vue'
            ),
    },
    {
        path: '/doctor/sup-doctor',
        name: 'doctor-sup-doctor-page',
        component: () =>
            import(
                /* webpackChunkName: "doctor-sup-doctor-page" */ '../module/Doctor/MySufferer/SupDoctor.vue'
            ),
    },
    {
        path: '/doctor/add-diagnostics',
        name: 'doctor-add-diagnostics',
        component: () =>
            import(
                /* webpackChunkName: "doctor-add-diagnostics-page" */ '../module/Doctor/MySufferer/AddDiagnostics.vue'
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
    {
        path: '/doctor/diagnosis-advice',
        name: 'doctor-diagnosis-advice',
        component: () =>
            import(
                /* webpackChunkName: "doctor-ask-superior-page" */ '../module/Doctor/DiagnosisAdvice/index.vue'
            ),
    },
    {
        path: '/doctor/all-consultation',
        name: 'doctor-all-consultation',
        component: () =>
            import(
                /* webpackChunkName: "doctor-all-consultation-page" */ '../module/Doctor/MyConsultation/allConsultation.vue'
            ),
    },
    {
        path: '/doctor/super-consultation',
        name: 'doctor-super-consultation',
        component: () =>
            import(
                /* webpackChunkName: "doctor-super-consultation-page" */ '../module/Doctor/MyConsultation/superConsultation.vue'
            ),
    },
    {
        path: '/doctor/my-consultation',
        name: 'doctor-my-consultation',
        component: () =>
            import(
                /* webpackChunkName: "doctor-ask-superior-page" */ '../module/Doctor/MyConsultation/index.vue'
            ),
    },
    {
        path: '/doctor/personal-information',
        name: 'doctor-personal-information',
        component: () =>
            import(
                /* webpackChunkName: "doctor-ask-superior-page" */ '../module/Doctor/DoctorInformation/index.vue'
            ),
    },
    {
        path: '/doctor/personal-edit-information',
        name: 'doctor-personal-edit-information',
        component: () =>
            import(
                /* webpackChunkName: "doctor-ask-superior-page" */ '../module/Doctor/DoctorInformation/EditInformation.vue'
            ),
    },
    {
        path: '/doctor/personal-edit-phone-password',
        name: 'doctor-personal-edit-phone-password',
        component: () =>
            import(
                /* webpackChunkName: "doctor-ask-superior-page" */ '../module/Doctor/DoctorInformation/EditPhonePassword.vue'
            ),
    },
    {
        path: '/supervisor/home',
        name: 'superior-home',
        component: () =>
            import(
                /* webpackChunkName: "superior-home-page" */ '../module/Supervisor/Home/index.vue'
            ),
    },
    {
        path: '/supervisor/new-doctor-consult',
        name: 'superior-new-doctor-consult',
        component: () =>
            import(
                /* webpackChunkName: "superior-new-doctor-consult" */ '../module/Supervisor/NewDoctorConsult/index.vue'
            ),
    },
    {
        path: '/supervisor/new-doctor-apply',
        name: 'superior-new-doctor-apply',
        component: () =>
            import(
                /* webpackChunkName: "superior-new-doctor-apply" */ '../module/Supervisor/NewDoctorApply/index.vue'
            ),
    },
    {
        path: '/supervisor/my-doctor',
        name: 'superior-my-doctor',
        component: () =>
            import(
                /* webpackChunkName: "superior-my-doctor" */ '../module/Supervisor/MyDoctor/index.vue'
            ),
    },
    {
        path: '/supervisor/my-patients',
        name: 'superior-my-patients',
        component: () =>
            import(
                /* webpackChunkName: "superior-my-patients" */ '../module/Supervisor/MyPatients/index.vue'
            ),
    },
    {
        path: '/supervisor/patients-detail',
        name: 'superior-patients-detail',
        component: () =>
            import(
                /* webpackChunkName: "superior-patients-detail" */ '../module/Supervisor/PatientsDetail/index.vue'
            ),
    },
    {
        path: '/supervisor/consult',
        name: 'superior-consult',
        component: () =>
            import(
                /* webpackChunkName: "superior-consult" */ '../module/Supervisor/MyDoctor/Consult.vue'
            ),
    },
    {
        path: '/supervisor/add-diagnostics',
        name: 'supervisor-add-diagnostics',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-add-diagnostics-page" */ '../module/Supervisor/MyDoctor/AddDiagnostics.vue'
            ),
    },
    {
        path: '/supervisor/answer-doctor-consult',
        name: 'superior-answer-doctor-consult',
        component: () =>
            import(
                /* webpackChunkName: "superior-answer-doctor-consult" */ '../module/Supervisor/AnswerDoctorConsult/index.vue'
            ),
    },
    {
        path: '/supervisor/login',
        name: 'supervisor-login-page',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-login-page" */ '../module/Supervisor/Login/Login.vue'
            ),
    },
    {
        path: '/supervisor/registered',
        name: 'supervisor-registered-page',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-registered-page" */ '../module/Supervisor/Login/Registered.vue'
            ),
    },
    {
        path: '/supervisor/notice',
        name: 'supervisor-notice-page',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-notice-page" */ '../module/Supervisor/Notice/index.vue'
            ),
    },
    {
        path: '/supervisor/doctor-information',
        name: 'supervisor-doctor-information',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-doctor-information" */ '../module/Supervisor/MyDoctor/DoctorInfomation.vue'
            ),
    },
    {
        path: '/supervisor/manage-patients',
        name: 'supervisor-manage-patients',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-manage-patients" */ '../module/Supervisor/MyDoctor/ManagePatients.vue'
            ),
    },
    {
        path: '/supervisor/patients-information',
        name: 'supervisor-patients-information',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-patients-information" */ '../module/Supervisor/MyDoctor/PatientsInformation.vue'
            ),
    },
    {
        path: '/supervisor/patients-cases',
        name: 'supervisor-patients-cases',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-patients-cases" */ '../module/Supervisor/MyDoctor/PatientsCases.vue'
            ),
    },
    {
        path: '/supervisor/patients-calendar',
        name: 'supervisor-patients-calendar',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-patients-calendar" */ '../module/Supervisor/MyDoctor/PatientsCalendar.vue'
            ),
    },
    {
        path: '/supervisor/add-advice',
        name: 'supervisor-add-advice',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-add-advice" */ '../module/Supervisor/MyDoctor/AddAdvice.vue'
            ),
    },
    {
        path: '/supervisor/diagnosis-advice',
        name: 'supervisor-diagnosis-advice',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-diagnosis-advice" */ '../module/Supervisor/MyDoctor/DiagnosisAdvice.vue'
            ),
    },
    {
        path: '/supervisor/doctor-consult',
        name: 'supervisor-doctor-consult',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-doctor-consult" */ '../module/Supervisor/MyDoctor/DoctorConsult.vue'
            ),
    },
    {
        path: '/supervisor/mine',
        name: 'supervisor-mine',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-mine" */ '../module/Supervisor/Mine/index.vue'
            ),
    },
    {
        path: '/supervisor/personal-informatin',
        name: 'supervisor-personal-informatin',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-personal-informatin" */ '../module/Supervisor/PersonalInformation/index.vue'
            ),
    },
    {
        path: '/supervisor/edit-informatin',
        name: 'supervisor-edit-informatin',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-edit-informatin" */ '../module/Supervisor/PersonalInformation/EditInformation.vue'
            ),
    },
    {
        path: '/supervisor/add-record',
        name: 'supervisor-add-record-page',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-add-record-page" */ '../module/Supervisor/MyDoctor/AddRecord.vue'
            ),
    },
    {
        path: '/supervisor/cur-patients',
        name: 'supervisor-cur-patients-page',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-cur-patients-page" */ '../module/Supervisor/MyPatients/CurPatient.vue'
            ),
    },
    {
        path: '/supervisor/doctor-info',
        name: 'supervisor-doctor-info-page',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-doctor-info-page" */ '../module/Supervisor/MyPatients/DoctorInfo.vue'
            ),
    },
    {
        path: '/supervisor/edit-phone-password',
        name: 'supervisor-edit-phone-password',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-edit-phone-password" */ '../module/Supervisor/PersonalInformation/EditPhonePassword.vue'
            ),
    },
    {
        path: '/admin/login',
        name: 'admin-login',
        component: () =>
            import(
                /* webpackChunkName: "supervisor-edit-phone-password" */ '../module/Admin/Login/Login.vue'
            ),
    },
    {
        path: '/admin/home',
        name: 'admin-home',
        component: () =>
            import(
                /* webpackChunkName: "admin-home" */ '../module/Admin/Home/index.vue'
            ),
    },
];

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
});

export default router;
