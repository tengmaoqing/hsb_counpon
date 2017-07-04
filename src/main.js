import Vue from 'vue';
import VueResource from 'vue-resource';
import router from './router/router';
import App from './App';

Vue.use(VueResource);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App),
});
