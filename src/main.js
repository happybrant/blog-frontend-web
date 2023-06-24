import '@/assets/fonts/font.css';
import '@/styles/atom-one-light.min.css';
import '@/styles/default.scss'; // global css
import 'font-awesome/css/font-awesome.min.css'; //图标样式
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
