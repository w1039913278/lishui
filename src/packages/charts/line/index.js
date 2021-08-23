/* eslint-disable no-unused-vars */
/**
 * @desc 折线
 */
import echarts from 'echarts';
import baseOptions from './options.js';
import _merge from 'lodash/merge';
import _mergeWith from 'lodash/mergeWith';
import _isArray from 'lodash/isArray';
import _has from 'lodash/has';
import _keys from 'lodash/keys';
import _assign from 'lodash/assign';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
import _set from 'lodash/set';

const Line = class Line {
  constructor(
    container,
    options = {
      xData: [],
      isShowTooltip: true,
      listeners: {}, // 事件对象
      isShowLegend: true, // 是否创建图例
      legendPosition: 'top-center', // 图例的位置
      isCancelLegendSelectChanged: false, // 是否关闭图例的切换事件
      isCancelLegendSelectChangedDefaultAction: false, // 是否关闭切换图例默认的点击行为
      dataDecimals: 2 // 小数点位数（不做向上和向下转换）
    }
  ) {
    this.baseOptions = baseOptions(); // 折线图基础配置对象
    this.myChart = null; // 图表对象
    this.init(container, options);
  }

  /**
   * @desc 创建图例
   */
  createLegend(mergeOptions = {}) {
    const legendData = [];
    // console.info('mergeOptions ', mergeOptions.series);
    if (_isArray(mergeOptions.series)) {
      _map(mergeOptions.series, function (value, key) {
        console.info(value, key);
        _has(value, 'name') && (legendData.push(value.name));
      });
      mergeOptions.legend.data = legendData;
    }
  }

  /**
   * @desc 数据精确度小数点位数
   */
  setDataDecimals() {

  }

  /**
   * @desc 获取原始对象
   */
  getEChart() {
    return this.myChart;
  }

  /**
   * @desc 设置数据
   */
  setData(data = []) {
    if (this.myChart) {

    }
  }

  // 提示框（就是鼠标放上去后出现的框）
  setTooltip(options = {}) {
    this.tooltip = baseOptions().tooltip;
  }

  /**
   * @desc 销毁实例，销毁后实例无法再被使用。
   */
  dispose() {
    if (this.myChart) {
      this.myChart.dispose();
    }
  }

  // 获取唯一值
  static getUID() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * @desc 初始化图表
   * @param {Object} container - html 节点实例对象
   * @param {Object} options - 配置项
   */
  init(container, options) {
    this.myChart = echarts.init(container);
    /* this.myChart.showLoading();
    setTimeout(() => {
      this.myChart.hideLoading();
    }, 3000); */
    // 递归合并配置项
    const mergeOptions = _mergeWith(this.baseOptions, _omit(options, ['listeners', 'isShowLegend', '']), function (objValue, srcValue) {
      if (_isArray(srcValue)) {
        for (let i = 0, len = srcValue.length; i < len; i++) {
          _assign(objValue[i], srcValue[i]);
        }
      }
    });
    // 图例
    if (!options.isShowLegend) {
      this.baseOptions.legend.show = false;
    } else {
      this.createLegend(mergeOptions);
    }
    // 数据精确度小数点位数
    this.setDataDecimals(mergeOptions);
    // 标题栏点击事件
    if (_has(options, 'listeners.titleClick')) {
      // const b = Math.ceil(Math.random() * 10);
      console.info(Line.getUID());
      const bbb = 'b0f43a76';
      const b = Line.getUID() + '';
      // window[b] = options.listeners.titleClick;
      _set(window, b, options.listeners.titleClick);
      console.info(b);
      mergeOptions.title.link = `javascript: window['${b}']()`;
    }
    // 取消图例切换事件
    if (options.isCancelLegendSelectChanged) {
      mergeOptions.legend.selectedMode = false;
    }
    // 设置图表实例的配置项以及数据
    this.myChart.setOption(mergeOptions, true);
    // 绑定事件
    for (const [key, value] of Object.entries(options.listeners)) {
      this.myChart.on(key, value);
    }
  }
};
export default Line;
