import moment from 'moment';

/**
 * @desc 将整数部分逢三一断
 * @example
 * 1001->1,001
 */
Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0';
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
  return intPartFormat;
});

/**
 * @desc 时间处理
 */
Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern);
});

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern);
});
