/**
 * @desc 公共引入
 */
// ElementUI组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入 packages/components 自定义组件的自定义样式文件
import '@packages/components/theme-default/index.less';
import Vue from 'vue';

Vue.use(ElementUI, {
  size: 'small'
});
Vue.use(ElementUI);
Vue.prototype.$message = ElementUI.Message;
function messageFun(message, type = 'success') { // type success/warning/info/error
  ElementUI.Message({
    type,
    message,
    customClass: 'global-message-cls'
  });
}
function success(message) {
  messageFun(message);
}
function fail(message) {
  messageFun(message, 'error');
}
function info(message) {
  messageFun(message, 'info');
}
function warn(message) {
  messageFun(message, 'warning');
}
Vue.prototype.$successMsg = success;
Vue.prototype.$errorMsg = fail;
Vue.prototype.$infoMsg = info;
Vue.prototype.$warnMsg = warn;
