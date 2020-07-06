import Vue from 'vue'
import App from './App.vue'
import {router} from './router/router'
import "./router/premit.js"
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./icon"
import global from "@/utils/global.js";
import "./utils/btnPerm"

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(global);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
