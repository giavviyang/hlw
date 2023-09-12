import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './utils/eventBus'
import axios from "axios";
import scroll from 'vue-seamless-scroll'
import {checkArray} from "./utils/array";
import navList from "@/utils/navList";
import isConstruction from '@/utils/inConstruction'
import '@/assets/style/editStyle.scss'

Vue.directive("permission", {
  inserted (el, binding) {
    let permission = binding.value; // 获取到 v-permission的值
    if (permission) {
      let hasPermission = checkArray(permission);
      // console.log(permission)
      if (!hasPermission) { // 没有权限 移除Dom元素
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
});

axios.defaults.baseURL='/api';

Vue.config.productionTip = false
//引入element插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(scroll)
Vue.prototype.$bus=Bus;
Vue.prototype.$navList=navList;
Vue.prototype.$isConstruction=isConstruction.isConstruction;




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
