/*
 * @Author: your name
 * @Date: 2020-12-27 09:45:52
 * @LastEditTime: 2020-12-29 19:39:47
 * @LastEditors: fandong
 * @Description: In User Settings Edit
 * @FilePath: \lishuigydn-web\src\views\5g-ls\data\index.js
 */
/**
 * @desc 数据
 */

// 基站建设情况
export const baseStationSituationData = {
  name: '基站建设情况',
  value: [
    { left_top_label: ' 全市5年规划基站（个）', value: '12277' },
    { left_top_label: '2020年规划基站（个）', value: '2826' },
    { left_top_label: '2020年已建成基站（个）', value: '2826' }
  ]
};

// 已建成基站数
export const alreadyBaseStationNumData = {
  name: '已建成基站数',
  total: 1696,
  value: [
    { rank: 1, area: '莲都区', finish_stat: 751 },
    { rank: 2, area: '龙泉市', finish_stat: 370 },
    { rank: 3, area: '缙云县', finish_stat: 336 },
    { rank: 4, area: '松阳县', finish_stat: 239 }
  ]
};

// 规划基站数排名
export const planningBaseStationNumData = {
  name: '规划基站数排名',
  total: 6756,
  value: [
    { rank: 1, area: '莲都区', plan_stat: 2407 },
    { rank: 2, area: '缙云县', plan_stat: 1559 },
    { rank: 3, area: '青田县', plan_stat: 1433 },
    { rank: 4, area: '龙泉市', plan_stat: 1357 }
  ]
};
export const tableList = [
  { area: '缙云县', '5year_plan_stat': '1559', '2020_plan_stat': '340', finish_stat: '348', finish_rate: '102.4' },
  { area: '龙泉市', '5year_plan_stat': '1357', '2020_plan_stat': '374', finish_stat: '380', finish_rate: '101.6' },
  { area: '青田县', '5year_plan_stat': '1433', '2020_plan_stat': '203', finish_stat: '206', finish_rate: '101.5' },
  { area: '松阳县', '5year_plan_stat': '1240', '2020_plan_stat': '241', finish_stat: '243', finish_rate: '100.8' },
  { area: '景宁县', '5year_plan_stat': '1054', '2020_plan_stat': '125', finish_stat: '126', finish_rate: '100.8' },
  { area: '庆元县', '5year_plan_stat': '1106', '2020_plan_stat': '175', finish_stat: '176', finish_rate: '100.6' },
  { area: '遂昌县', '5year_plan_stat': '1321', '2020_plan_stat': '217', finish_stat: '217', finish_rate: '100.0' },
  { area: '云和县', '5year_plan_stat': '800', '2020_plan_stat': '150', finish_stat: '150', finish_rate: '100.0' },
  { area: '莲都区', '5year_plan_stat': '2407', '2020_plan_stat': '816', finish_stat: '794', finish_rate: '97.3' }
];

// 各区县基站建设情况
export const countyBaseStationNumData = {
  name: '各区县基站建设情况',
  value: [
    { area: '莲都区', '2020_plan_stat': '816', finish_stat: '794', finish_rate: '97.30' },
    { area: '缙云县', '2020_plan_stat': '340', finish_stat: '348', finish_rate: '102.40' },
    { area: '青田县', '2020_plan_stat': '203', finish_stat: '206', finish_rate: '101.50' },
    { area: '龙泉市', '2020_plan_stat': '374', finish_stat: '380', finish_rate: '101.60' },
    { area: '遂昌县', '2020_plan_stat': '217', finish_stat: '217', finish_rate: '100' },
    { area: '松阳县', '2020_plan_stat': '241', finish_stat: '243', finish_rate: '100.80' },
    { area: '庆元县', '2020_plan_stat': '175', finish_stat: '176', finish_rate: '100.60' },
    { area: '景宁县', '2020_plan_stat': '125', finish_stat: '126', finish_rate: '100.80' },
    { area: '云和县', '2020_plan_stat': '150', finish_stat: '150', finish_rate: '100' }
  ]
};
// 地图数据
export const mapData = [
  {
    name: '已完成基站(个)',
    type: 'The_base_station_has_been_built',
    data: []
  },
  {
    name: '规划基站(个)',
    type: 'Planning_Base_Station',
    data: []
  }
];
export const areaList = [
  { name: '缙云县', value: 336, type: 'The_base_station_has_been_built' },
  { name: '景宁县', value: 121, type: 'The_base_station_has_been_built' },
  { name: '莲都区', value: 751, type: 'The_base_station_has_been_built' },
  { name: '龙泉市', value: 370, type: 'The_base_station_has_been_built' },
  { name: '青田县', value: 198, type: 'The_base_station_has_been_built' },
  { name: '庆元县', value: 174, type: 'The_base_station_has_been_built' },
  { name: '松阳县', value: 239, type: 'The_base_station_has_been_built' },
  { name: '遂昌县', value: 213, type: 'The_base_station_has_been_built' },
  { name: '云和县', value: 147, type: 'The_base_station_has_been_built' },
  { name: '缙云县', value: 1559, type: 'Planning_Base_Station' },
  { name: '景宁县', value: 1054, type: 'Planning_Base_Station' },
  { name: '莲都区', value: 2407, type: 'Planning_Base_Station' },
  { name: '龙泉市', value: 1357, type: 'Planning_Base_Station' },
  { name: '青田县', value: 1433, type: 'Planning_Base_Station' },
  { name: '庆元县', value: 1106, type: 'Planning_Base_Station' },
  { name: '松阳县', value: 1240, type: 'Planning_Base_Station' },
  { name: '遂昌县', value: 1321, type: 'Planning_Base_Station' },
  { name: '云和县', value: 800, type: 'Planning_Base_Station' }
];
// 已建成基站
export const builtData = [
  {
    name: '开发区',
    value: '-',
    lng: 119.85027778,
    lat: 28.41416667,
    type: 'The_base_station_has_been_built'
  },
  {
    name: '缙云县',
    value: 336,
    lng: 120.091573,
    lat: 28.709279,
    type: 'The_base_station_has_been_built'
  },
  {
    name: '景宁县',
    value: 121,
    lng: 119.710697,
    lat: 28.013312,
    type: 'The_base_station_has_been_built'
  },
  {
    name: '莲都区',
    value: 751,
    lng: 119.912612,
    lat: 28.495836,
    type: 'The_base_station_has_been_built'
  },
  {
    name: '龙泉市',
    value: 370,
    lng: 119.141461,
    lat: 28.104623,
    type: 'The_base_station_has_been_built'
  },
  {
    name: '青田县',
    value: 198,
    lng: 120.289277,
    lat: 28.179695,
    type: 'The_base_station_has_been_built'
  },
  {
    name: '庆元县',
    value: 174,
    lng: 119.06259,
    lat: 27.65922,
    type: 'The_base_station_has_been_built'
  },
  {
    name: '松阳县',
    value: 239,
    lng: 119.482015,
    lat: 28.499171,
    type: 'The_base_station_has_been_built'
  },
  {
    name: '遂昌县',
    value: 213,
    lng: 119.276104,
    lat: 28.632119,
    type: 'The_base_station_has_been_built'
  },
  {
    name: '云和县',
    value: 147,
    lng: 119.573397,
    lat: 28.16079,
    type: 'The_base_station_has_been_built'
  }
];
// 规划基站
export const planData = [
  {
    name: '开发区',
    value: '-',
    lng: 119.85027778,
    lat: 28.41416667,
    type: 'Planning_Base_Station'
  },
  {
    name: '缙云县',
    value: 1559,
    lng: 120.091573,
    lat: 28.709279,
    type: 'Planning_Base_Station'
  },
  {
    name: '景宁县',
    value: 1054,
    lng: 119.710697,
    lat: 28.013312,
    type: 'Planning_Base_Station'
  },
  {
    name: '莲都区',
    value: 2407,
    lng: 119.912612,
    lat: 28.495836,
    type: 'Planning_Base_Station'
  },
  {
    name: '龙泉市',
    value: 1357,
    lng: 119.141461,
    lat: 28.074623,
    type: 'Planning_Base_Station'
  },
  {
    name: '青田县',
    value: 1433,
    lng: 120.289277,
    lat: 28.179695,
    type: 'Planning_Base_Station'
  },
  {
    name: '庆元县',
    value: 1106,
    lng: 119.06259,
    lat: 27.65922,
    type: 'Planning_Base_Station'
  },
  {
    name: '松阳县',
    value: 1240,
    lng: 119.482015,
    lat: 28.499171,
    type: 'Planning_Base_Station'
  },
  {
    name: '遂昌县',
    value: 1321,
    lng: 119.276104,
    lat: 28.632119,
    type: 'Planning_Base_Station'
  },
  {
    name: '云和县',
    value: 800,
    lng: 119.573397,
    lat: 28.16079,
    type: 'Planning_Base_Station'
  }
];
