/**
 * @desc 项目配置
 */
export const WINDOW_TITLE_UPDATE = true; // 是否允许在路由 BeforeEach 钩子中修改标题
export const HOST_PLATFORM = 'WEB'; // 当前的宿主平台
// 登陆路由名称
export const LOGIN_PAGE_NAME = 'login';
// 根路由名称
export const ROOT_PAGE_NAME = 'root';
// 开启Cookie使用，数据在Cookie中存储的天数，默认1天
export const cookieExpires = 1;
// CONST 默认参数配置 sep：命名空间分隔符
export const CONST_DEFAULT_CONFIG = {
  sep: '/'
};
// basic-layout.vue 配置
export const DEFAULT_SETTINGS = {
  title: '丽水工业大脑', // 顶部栏目标题文字
  iconfontUrl: () => {
    return require('@static/images/avatar.gif');
  }, // 顶部栏目图标
  collapsed: false, // 侧边菜单栏是否收缩
  titleClick(event) {
    // 顶部栏目标题文字-点击事件
    this.$router.push({ name: ROOT_PAGE_NAME });
  }
};
// 路由白名单
export const ROUTER_WHITE_LIST = [
  '404',
  'helper',
  // 'root',
  'link',
  '5g-ls-link'
];
// 路由默认配置
export const ROUTER_DEFAULT_CONFIG = {
  mode: 'history', // 路由模式 hash、history
  base: '/', // 配置单页应用的基路径
  transitionOnLoad: true,
  scrollBehavior: () => ({ y: 0 })
};
// api 接口模型配置参数-用于覆盖 apiDefaultConfig 中的参数
export const USER_API_CONFIG = {
  isShowNProgress: true, // 是否在顶部显示加载进度条
  mockBasePath: '/', // mock 为 true 时使用的地址，如：https://yapi.tianli.shop/mock/438/
  mock: true, // mock 总开关（true 打开 false 关闭）
  console_request_enable: false,
  console_response_enable: true
};
// axios实例配置参数-用于覆盖 axiosDefaultConfig 中的参数
export const USER_AXIOS_CONFIG = {
  baseURL: process.env.BASE_API,
  timeout: 5000
};
// 路由的打开类型
export const ROUTER_OPEN_TYPE = {
  menu: 'menu', // 通过菜单打开
  push: 'push' // 通过 push 程序的形式打开
};
