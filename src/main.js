import Vue from 'vue';
import App from './App.vue';
import router from './router';
import less from 'less';
import request from './common/request';
import { Lazyload } from 'vant';

Vue.use(Lazyload);
Vue.use(less);
Vue.config.productionTip = false;
Vue.prototype.$api = request;
new Vue({
    router,
    render: h => h(App),
}).$mount('#app');
