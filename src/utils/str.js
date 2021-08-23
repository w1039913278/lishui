/*
 * @Autor: fandong
 * @Description: 字符串处理
 * @Date: 2020-11-18 15:11:49
 * @LastEditTime: 2020-12-14 19:09:34
 * @LastEditors: fandong
 * @FilePath: \xwy-gov\src\utils\str.js
 */
/**
 * 如果字符串为空 null undefined ，则返回placeholder
 * @param str
 * @param placeholder
 * @returns {*|string}
 */
export const toHtmlStr = (str, placeholder = '') => {
  if (str === undefined || str === null || str === 'null' || str === '') {
    if (placeholder) return placeholder;
    return '';
  }
  return str;
};
// 下划线转换驼峰
export const toHump = name => {
  return name.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
};
// 驼峰转换下划线
export const toLine = name => {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
};
