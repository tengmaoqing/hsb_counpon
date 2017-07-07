import Vue from 'vue';
// import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import router from './router/router';
import App from './App';
import { store } from './store/state';
import httpInstances from './http';

// Vue.use(VueResource);
// Vue.http.options.root = 'http://127.0.0.1:3000';

Vue.use(ElementUI);

Vue.prototype.rootPath = 'http://127.0.0.1:3000';
Vue.prototype.$http = httpInstances;
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
});
