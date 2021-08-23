/**
 * @desc 公共路由
 */
// import { ROOT_PAGE_NAME } from '@config/index.js';

const commonRoutes = [
  {
    path: '/',
    name: 'link',
    component: () =>
      import(
        /* webpackChunkName:"garden/views/link" */ '@views/link.vue'
      )
  },
  {
    path: '/industry-economic-run',
    name: 'industry-economic-run',
    meta: { title: '工业经济运行' },
    component: () =>
      import(/* webpackChunkName:"views/industry-economic-run" */ '@views/industry-economic-run/index.vue')
  },
  {
    path: '/talk-hero',
    name: 'talk-hero',
    meta: { title: '亩均论英雄' },
    component: () =>
      import(/* webpackChunkName:"views/talk-hero" */ '@views/talk-hero/index.vue')
  },
  {
    path: '/energy-transform',
    name: 'energy-transform',
    meta: { title: '新旧动能转换' },
    component: () =>
      import(/* webpackChunkName:"views/energy-transform" */ '@views/energy-transform/index.vue')
  },
  {
    path: '/digital-economy',
    name: 'digital-economy',
    meta: { title: '数字经济' },
    component: () =>
      import(/* webpackChunkName:"views/digital-economy" */ '@views/digital-economy/index.vue')
  },
  {
    path: '/grow-helper',
    name: 'grow-helper',
    meta: { title: '培育和帮扶' },
    component: () =>
      import(/* webpackChunkName:"views/grow-helper" */ '@views/grow-helper/index.vue')
  },
  {
    path: '/5g-ls',
    name: '5g-ls',
    meta: { title: '5G丽水' },
    component: () =>
      import(/* webpackChunkName:"views/5g-ls" */ '@views/5g-ls/index.vue')
  },
  {
    path: '/5g-ls-link',
    name: '5g-ls-link',
    meta: { title: '5G丽水' },
    component: () =>
      import(/* webpackChunkName:"views/5g-ls" */ '@views/5g-ls/link.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () =>
      import(
        /* webpackChunkName:"views/404" */ '@packages/views/error-page/404.vue'
      ),
    meta: { title: '404' }
  },
  {
    path: '*', // 404 页面
    redirect: '/404'
  }
];
export default commonRoutes;
