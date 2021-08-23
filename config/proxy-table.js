'use strict';
const config = process.env.NODE_ENV === 'development' ? require('./proxy-self') : {};
/**
 * @desc devServer 代理配置
 */
module.exports = config;
