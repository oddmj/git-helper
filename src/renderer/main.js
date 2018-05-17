import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import App from './App';

Vue.config.productionTip = false;

Vue.use(Vuetify);

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>',
}).$mount('#app');
