/**
 * @desc 这个网站的 store
 */
import _isNil from 'lodash/isNil';
import { sStorageKey, isClearCache } from '../../../store/index.js';

const state = {
  // 登录信息
  loginCacheUserInfo: {
    username: '',
    password: '',
    remember: ''
  },
  data: {}, // 用户信息
  userDetailData: {
    headerImg: '',
    username: '',
    departmentText: ''
  }, // 用户详细信息
  // 是否已登陆
  isLogin: false,
  /**
   * 应用是否已经初始化完成 主要用于检测 'roleMenus'、'roleRoutes'是否已生成
   */
  initedApp: false,
  // 角色对应的菜单
  roleMenus: {},
  // 系统用户访问令牌
  token: '',
  // 刷新 token
  refreshToken: ''
};
const getters = {
  getData: state => {
    return state.data;
  },
  getLoginStatus: state => {
    return state.isLogin;
  },
  getAppStatus: state => {
    return state.initedApp;
  },
  getToken: state => {
    return state.token;
  },
  // 获取全部菜单
  getMenus: state => {
    return state.roleMenus;
  },
  // 获取用户详情信息
  getUserMsg: state => {
    return state.userDetailData;
  },
  // 登录用户和密码
  getLoginCacheUserInfo: state => {
    return state.loginCacheUserInfo;
  },
  getRefreshToken: state => {
    return state.refreshToken;
  }
};
const actions = {
  // 登录
  handleLogin({ dispatch, commit, state }, { code, page }) {
    console.info(code, page);
    return new Promise((resolve, reject) => {
      Vue.prototype.$api['auth/login']({ params: { code, page } }).then(resData => {
        resolve(resData);
      });
    });
  },
  /**
   * @desc 设置免登用户信息
   */
  setData({ commit, state }, { data }) {
    return new Promise((resolve, reject) => {
      this.dispatch('setUserData', { data: data }); // 调用外部的根 store 赋值 data
      commit('UPDATE_DATA', data);
      resolve();
    });
  },
  // 更新用户信息
  updateData({ commit, state }, resData) {
    commit('UPDATE_DATA', resData.data);
  },
  // 设置通用请求头参数
  setApiHeaderParams({ commit, state }, { token }) {
    Vue.prototype.$loaderApiLibrary.setHeaderOptions({ token });
  },
  // 销毁缓存和变量
  handlerDestroy({ commit, state }) {
    this.dispatch('platform/setApiHeaderParams', { token: null });
    commit('HANDLE_EXIT');
  },
  // 加载远程数据字典-保证页面展示时字典数据已经获取
  getDict({ commit, state }) {
    // 载入本包中的字典
    // const p1 = Vue.prototype.$dict.import(import('../../data-dict/index.js'));
    // 载入远程字典
    const p2 = Vue.prototype.$dict.import(
      Vue.prototype.$api['dict/getDictDataByTypeList']()
    );
    return Promise.all([p2]);
    // Vue.prototype.$dict.import(Vue.prototype.$api['dict/getDictDataByTypeList']());
  },
  // 设置登录用户名和密码
  setLoginInfo({ commit, state }, { username, password, remember }) {
    commit('UPDATE_LOGIN_INFO', { username, password, remember });
  }
};
const GENERATE_ROUTES = 'GENERATE_ROUTES';
const GENERATE_ROLE_MENUS = 'GENERATE_ROLE_MENUS';
const UPDATE_DATA = 'UPDATE_DATA';
const GET_USER_DATA = 'GET_USER_DATA';
const HANDLE_EXIT = 'HANDLE_EXIT';
const UPDATE_LOGIN_INFO = 'UPDATE_LOGIN_INFO';
const mutations = {
  [GENERATE_ROUTES](state, roleRouter) {
    state.roleRoutes.push(roleRouter);
  },
  [GENERATE_ROLE_MENUS](state, aRoleMenuList) {
    state.roleMenus = aRoleMenuList;
    state.initedApp = true;
  },
  [UPDATE_DATA](state, data) {
    state.data = data;
    if ('token' in data) {
      state.token = data.token;
    }
    if ('refresh_token' in data) {
      state.refreshToken = data.refresh_token;
    }
    state.isLogin = true;
  },
  [GET_USER_DATA](state, data) {
    state.userDetailData = data;
  },
  [HANDLE_EXIT](state) {
    state.data = null;
    state.roleMenus = null;
    state.token = null;
    state.isLogin = false;
    state.initedApp = false;
    state.userDetailData = {};
    state.refreshToken = null;
    setTimeout(() => {
      // 移除全部缓存
      if (!_isNil(localStorage.getItem(sStorageKey)) && isClearCache) {
        localStorage.removeItem(sStorageKey);
      }
      if (!_isNil(sessionStorage.getItem(sStorageKey)) && isClearCache) {
        sessionStorage.removeItem(sStorageKey);
      }
      // 移除部分缓存请操作对应的 store 中的 Actions，注意 store 中所有的操作必须通过 Actions 来完成
    }, 0);
  },
  [UPDATE_LOGIN_INFO](state, { username, password, remember }) {
    state.loginCacheUserInfo.remember = remember;
    state.loginCacheUserInfo.username = username;
    if (remember) {
      state.loginCacheUserInfo.password = password;
    } else {
      state.loginCacheUserInfo.password = '';
    }
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
