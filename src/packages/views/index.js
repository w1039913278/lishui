/*
 * @Autor: fandong
 * @Description: 文件说明
 * @Date: 2020-12-25 11:00:12
 * @LastEditTime: 2020-12-28 11:10:17
 * @LastEditors: fandong
 * @FilePath: \lishuigydn-web\src\packages\views\index.js
 */
/**
 * @desc 全局视图组件
 */
import BasicLayout from './layouts/basic-layout.vue';
import BaseRouteView from './route-view.vue';
import BasePersonal from './common-view/personal.vue';
import BaseFilter from './common-view/base-filter';
import baseChart from './common-view/base-chart.vue';
import baseChart2 from './common-view/base-chart2.vue';
import BaseBorder from './common-view/base-border.vue';
import baseProgress from './common-view/base-progress.vue';
import baseTarget from './common-view/base-target.vue';
export default {
  BasicLayout,
  BaseRouteView,
  BasePersonal,
  BaseFilter,
  baseChart,
  baseChart2,
  BaseBorder,
  baseProgress,
  baseTarget
};
