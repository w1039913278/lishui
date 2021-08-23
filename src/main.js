/*
 * @Autor: fandong
 * @Description: 文件说明
 * @Date: 2020-11-25 20:55:41
 * @LastEditTime: 2020-12-24 10:52:51
 * @LastEditors: Please set LastEditors
 * @FilePath: \xwy-gov\src\main.js
 */
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';
import inject from './plugins/inject.js';
import vueLink from '@plugins/link.js';
import '@plugins/element.js';
// 初始化项目全局组件
import itemComponents from './plugins/components.js';
// Vue 中非父子组件通讯插件
import unicom from '@plugins/unicom.js';
// .vue模板文件中的常量插件
import VueTemplateConst from '@plugins/vue-template-constant.js';
// 自定义过滤器工具插件
import './filters/index.js';
// mock
import './mock/index.js';
// 自定义指令
import VFocus from './directives/v-focus.js';
import VAuthority from './directives/v-authority.js';
// iconfont
import '@/assets/font/iconfont/iconfont.css';
// 图像浏览插件
import Viewer from './plugins/viewer.js';
import scroll from 'vue-seamless-scroll';
// 全局通知 巴士事件
window.GvBus = {};
window.GvBus.vBus = new Vue({
  data: {
    // 自定义扩展实例属性，程序中可以监听 vBus 中的属性（状态存储是响应式的），触发自身的业务逻辑
  }
});

Vue.use(inject);
Vue.use(itemComponents);
Vue.use(vueLink);
Vue.use(unicom);
Vue.use(VueTemplateConst);
Vue.use(VFocus);
Vue.use(VAuthority);
Vue.use(Viewer);
Vue.use(scroll);
Vue.config.ignoredElements = []; // 忽略在 Vue 之外的自定义元素
Vue.config.keyCodes = {}; // 给 v-on 自定义键位别名
Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  created() {
    // created
    // 载入远程字典
    // this.$dict.import(this.$api['dict/getDictDataByTypeList']());
    // 模块常量
  },
  render: h => h(App)
}).$mount('#app');
