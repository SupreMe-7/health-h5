import Vue from 'vue';
import App from './App.vue';
import router from './router';
import less from 'less';
import request from './common/request';
// TODO: 删除vconsole
import Vconsole from 'vconsole';
let vConsole = new Vconsole();
Vue.use(vConsole);
Vue.use(less);
Vue.config.productionTip = false;
Vue.prototype.$api = request;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
