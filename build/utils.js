'use strict';
const path = require('path');
const config = require('../config/index.js');

exports.assetsPath = function (_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};

// script 标签动态导入模块针对 ie 浏览器不支持的 es6 的兼容配置方案
exports.getIEDynamicImportModule = function () {
  return {
    // iterator: 'core-js/modules/es.array.iterator',
    // Promise: 'core-js/modules/es.promise'
  };
};

/**
 * @desc JS数组去掉某些元素
 */
exports.arrayRemoveItems = function (list, vals = []) {
  for (var i = 0; i < vals.length; i++) {
    var index = list.findIndex(n => n === vals[i]);
    if (index > -1) {
      list.splice(index, 1);
    }
  }
  return list;
};
