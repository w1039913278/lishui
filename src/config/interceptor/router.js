/* eslint-disable no-unused-vars */
/**
 * @desc 路由拦截器
 */
import NProgress from 'nprogress';
import {
  WINDOW_TITLE_UPDATE,
  ROUTER_WHITE_LIST
} from '../index.js';
import store from '../../store/index.js';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
import qs from 'querystring';

/**
 * @desc 全局前置守卫
 * @param {*} to
 * @param {*} from
 * @param {*} next
 */
const routerBeforeEachFunc = function (to, from, next) {
  NProgress.start();
  // 没有匹配到路由项则回退到 from 的路由
  if (_isEmpty(to.matched)) {
    NProgress.done();
    next(from);
    return;
  }
  if ('title' in to.meta && WINDOW_TITLE_UPDATE) {
    document.title = to.meta.title;
  }
  // 白名单直接跳转（这个项目因为没有菜单，所以把白名单路由放到是否登录下面，这样没有登录直接就到404页面）
  if (ROUTER_WHITE_LIST.includes(to.name)) {
    NProgress.done();
    return next();
  }
  /* const loginStatus = store.getters['platform/getLoginStatus'];
  if (!loginStatus) {
    NProgress.done();
    console.warn('--没有登录--');
    window.open('http://218.205.110.85:8108/#/login', '_self'); // 前往用户中心登录页
    return;
  } */
  /* const loginStatus = store.getters['platform/getLoginStatus'];
  if (!loginStatus) {
    NProgress.done();
    return next({ name: '404' });
  } */
  // 生产环境需要进行免登验证-正式环境打开
  // if (process.env.NODE_ENV === 'production') {
  //   const userData = store.getters['platform/getData'];
  //   if (_isEmpty(userData)) {
  //     // 用户信息为空，查看当前是否有 code
  //     console.warn('地址信息： ', to, from, window.location.href);
  //     const params = qs.parse(window.location.href.split('?')[1]);
  //     const { code } = params; // 城市大脑的code
  //     if (_isNil(code)) {
  //       console.warn('--没有code--');
  //       NProgress.done();
  //       store.dispatch('platform/handlerDestroy');
  //       setTimeout(() => {
  //         window.open('http://218.205.110.85:8108/#/login', '_self'); // 前往用户中心登录页
  //       }, 0);
  //       return;
  //     }
  //     if (!_isNil(to)) {
  //       const pageName = to.name; // 哪一个大屏
  //       store.dispatch('platform/handleLogin', {
  //         page: pageName,
  //         code
  //       }).then(resData => {
  //         const { code, data } = resData;
  //         console.warn('免登信息 ', resData);
  //         if (code === '0000' && !_isNil(_get(data, 'token'))) {
  //           // 设置登录信息
  //           store.dispatch('platform/setData', { data: data }).then(() => {
  //             setTimeout(() => {
  //               console.warn('打开网址-->');
  //               // window.open(`http://39.97.197.185:8700/${pageName}`, '_self');
  //               next(); // 免登成功-打开大屏
  //             }, 500);
  //           });
  //         } else {
  //           alert('--登录失败--');
  //           NProgress.done();
  //           store.dispatch('platform/handlerDestroy');
  //           setTimeout(() => {
  //             window.open('http://218.205.110.85:8108/#/login', '_self'); // 前往用户中心登录页
  //           }, 0);
  //         }
  //       });
  //     }
  //     return;
  //   } else {
  //     // 有缓存数据证明已经登录了
  //   }
  // }
  next();
};

/**
 * @desc 全局后置路由钩子
 * @param {*} to
 * @param {*} from
 * @example window滚动条返回顶部、路由加载完成控制全局进度条
 */
const routerAfterEachFunc = function (to, from) {
  NProgress.done();
  // 路由已经进入删除路由的打开类型
  if (_has(to.meta, 'toType')) {
    delete to.meta.toType;
  }
  if (_has(from.meta, 'toType')) {
    delete from.meta.toType;
  }
  // 进入新路由后，重置滚动条到顶部
  // 如果路由基本配置中已配置 'scrollBehavior' 则可以隐藏下面的代码
  /* if (document.body.scrollHeight > window.innerHeight) {
    window.scrollTo(0, 0)
  } */
};

/**
 * @desc 浏览器刷新
 * @example 在刷新时会执行到 router.onReady 可以处理把数据放入 localStorage 或 cookie 中的操作
 */
const routerOnReady = function (to) {
  // 判断 token 是否有效，无效直接打开登录页
  // if(){}
  // 刷新页面路由权限 isOpen 判断
  /* const loginStatus = store.getters['platform/getLoginStatus'];
  if (loginStatus) {
    store.dispatch('platform/getDict'); // 刷新页面-载入字典数据
    store.dispatch('platform/setRouter').then(() => {
      if (_has(to, 'meta.isOpen') && !to.meta.isOpen) {
        router.push({ name: '404' });
      }
    });
  }
  // 页面刷新重新设置 request.headers
  store.dispatch('platform/setApiHeaderParams', {
    token: store.getters['platform/getToken']
  }); */
};

export { routerBeforeEachFunc, routerAfterEachFunc, routerOnReady };
