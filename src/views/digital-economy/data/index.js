/*
 * @Author: your name
 * @Date: 2020-12-27 10:10:23
 * @LastEditTime: 2020-12-29 14:03:33
 * @LastEditors: fandong
 * @Description: In User Settings Edit
 * @FilePath: \lishuigydn-web\src\views\digital-economy\data\index.js
 */
/**
 * @desc 数据
 */
// 数据年份
export const dataYear = { data_year: '数据年份：', value: '2019年' };

// 中央大屏
export const middleData = [
  { label_name: '核心产业增加值(亿元)', label_value: 41.77, label_img: '' },
  { label_name: '核心制造业增加值(亿元)', label_value: 10.72, label_img: '' },
  { label_name: '发展综合评价指数', label_value: 73.1, label_img: '' },
  { label_name: '上云企业数(家)', label_value: 1143, label_img: '' }
];

// 数字经济核心产业增加值
export const numEconomicCoreIndustriesAddData = {
  name: '数字经济核心产业增加值',
  value: [
    { left_top_label: '丽水市累计(亿元)', value: 41.77, icon: '' },
    { left_top_label: '同比增速(%)', value: 12.6, icon: '' },
    { left_top_label: '增速排名', value: 7 }
  ]
};

// 规上数字经济核心核心制造业增加值情况
export const upEconomicCoreManufactureAddData = {
  name: '规上数字经济核心核心制造业增加值情况',
  value: [
    { left_below_label: '丽水市累计(亿元)', value: 10.72, icon: '' },
    { left_below_label: '同比增速(%)', value: 12.80, icon: '' },
    { left_below_label: '增速排名', value: 5 }
  ]
};

// 核心制造业增加值区县情况
export const ManufactureAddCountyData = {
  name: '核心制造业增加值区县情况',
  value: [
    { area: '莲都区', zzy_add_value: 1.81, zzy_add_rate: -13.4 },
    { area: '开发区', zzy_add_value: 1.57, zzy_add_rate: -12 },
    { area: '青田县  ', zzy_add_value: 1.5, zzy_add_rate: 26.2 },
    { area: '缙云县  ', zzy_add_value: 3.86, zzy_add_rate: 9.9 },
    { area: '遂昌县  ', zzy_add_value: 2.32, zzy_add_rate: 6.5 },
    { area: '松阳县  ', zzy_add_value: 0.65, zzy_add_rate: 347 },
    { area: '云和县  ', zzy_add_value: 0.05, zzy_add_rate: 16.1 },
    { area: '龙泉市  ', zzy_add_value: 0.68, zzy_add_rate: 31.8 }
  ]
};

// 核心制造业增加值排名
export const ManufactureAddListData = {
  name: '核心制造业增加值排名',
  total: 9.56,
  value: [
    { rank: 1, area: '缙云县  ', zzy_add_value: 3.86 },
    { rank: 2, area: '遂昌县  ', zzy_add_value: 2.32 },
    { rank: 3, area: '莲都区', zzy_add_value: 1.81 },
    { rank: 4, area: '开发区', zzy_add_value: 1.57 }
  ]
};

// 数字经济发展综合评价情况
export const ManufactureEconomicComprehensiveData = {
  name: '数字经济发展综合评价情况',
  value: [
    { right_top_label: '丽水市总指数', value: 73.1 },
    { right_top_label: '全省位次', value: 8 }
  ]
};

// 数字经济发展综合评价排名
export const ManufactureEconomicDevelopComprehensiveData = {
  name: '数字经济发展综合评价排名',
  total: 287.1,
  value: [
    { rank: 1, area: '龙泉市', total_index: 72.6 },
    { rank: 2, area: '莲都区', total_index: 70 },
    { rank: 3, area: '青田县', total_index: 68.3 },
    { rank: 4, area: '缙云县', total_index: 67.2 }
  ]
};

// 企业上云完成情况
export const enterpriseUpDayData = [
  { name: '莲都区', value: 0 },
  { name: '青田县', value: 0 },
  { name: '缙云县', value: 0 },
  { name: '遂昌县', value: 0 },
  { name: '松阳县', value: 0 },
  { name: '云和县', value: 0 },
  { name: '庆元县', value: 0 },
  { name: '景宁县', value: 0 },
  { name: '龙泉市', value: 0 }
];

// 中间地图数据
// 核心制造业增加值
export const zzyMapData = [
  {
    name: '开发区',
    value: '-',
    lng: 119.85027778,
    lat: 28.41416667,
    type: 'Manufacturing_value_added'
  },
  {
    name: '缙云县',
    value: 3.86179,
    lng: 120.091573,
    lat: 28.709279,
    type: 'Manufacturing_value_added'
  },
  {
    name: '景宁县',
    value: '-',
    lng: 119.710697,
    lat: 28.013312,
    type: 'Manufacturing_value_added'
  },
  {
    name: '莲都区',
    value: 1.81494,
    lng: 119.912612,
    lat: 28.495836,
    type: 'Manufacturing_value_added'
  },
  {
    name: '龙泉市',
    value: 0.68313,
    lng: 119.141461,
    lat: 28.104623,
    type: 'Manufacturing_value_added'
  },
  {
    name: '青田县',
    value: 1.49625,
    lng: 120.289277,
    lat: 28.179695,
    type: 'Manufacturing_value_added'
  },
  {
    name: '庆元县',
    value: '-',
    lng: 119.06259,
    lat: 27.65922,
    type: 'Manufacturing_value_added'
  },
  {
    name: '松阳县',
    value: 0.65399,
    lng: 119.482015,
    lat: 28.499171,
    type: 'Manufacturing_value_added'
  },
  {
    name: '遂昌县',
    value: 2.32319,
    lng: 119.276104,
    lat: 28.632119,
    type: 'Manufacturing_value_added'
  },
  {
    name: '云和县',
    value: 0.04911,
    lng: 119.573397,
    lat: 28.16079,
    type: 'Manufacturing_value_added'
  }
];
export const areaList = [
  // 核心制造业增加值
  { name: '缙云县  ', value: 3.86179, type: 'Manufacturing_value_added' },
  { name: '景宁县', value: 0, type: 'Manufacturing_value_added' },
  { name: '莲都区', value: 1.81494, type: 'Manufacturing_value_added' },
  { name: '龙泉市  ', value: 0.68313, type: 'Manufacturing_value_added' },
  { name: '青田县  ', value: 1.49625, type: 'Manufacturing_value_added' },
  { name: '庆元县', value: 0, type: 'Manufacturing_value_added' },
  { name: '松阳县  ', value: 0.65399, type: 'Manufacturing_value_added' },
  { name: '遂昌县  ', value: 2.32319, type: 'Manufacturing_value_added' },
  { name: '云和县  ', value: 0.04911, type: 'Manufacturing_value_added' },
  // 企业上云家数
  {
    name: '缙云县',
    value: 167,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '景宁县',
    value: 56,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '莲都区',
    value: 284,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '龙泉市',
    value: 174,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '青田县',
    value: 163,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '庆元县',
    value: 125,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '松阳县',
    value: 86,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '遂昌县',
    value: 28,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '云和县',
    value: 60,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  }
];

// 亩均增加值地图点数据
export const ysqyMapData = [
  {
    name: '开发区',
    value: '-',
    lng: 119.85027778,
    lat: 28.41416667,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '缙云县',
    value: 167,
    lng: 120.091573,
    lat: 28.709279,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '景宁县',
    value: 56,
    lng: 119.710697,
    lat: 28.013312,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '莲都区',
    value: 284,
    lng: 119.912612,
    lat: 28.495836,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '龙泉市',
    value: 174,
    lng: 119.141461,
    lat: 28.104623,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '青田县',
    value: 163,
    lng: 120.289277,
    lat: 28.179695,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '庆元县',
    value: 125,
    lng: 119.06259,
    lat: 27.65922,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '松阳县',
    value: 86,
    lng: 119.482015,
    lat: 28.499171,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '遂昌县',
    value: 28,
    lng: 119.276104,
    lat: 28.632119,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  },
  {
    name: '云和县',
    value: 60,
    lng: 119.573397,
    lat: 28.16079,
    type: 'The_number_of_cloud_homes_on_the_enterprise'
  }
];
