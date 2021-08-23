/*
 * @Author: your name
 * @Date: 2020-12-27 15:30:50
 * @LastEditTime: 2020-12-27 16:51:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \lishuigydn-web\src\views\energy-transform\data\index.js
 */
/**
 * @desc 数据
 */

// 数据年份
export const dataYear = { data_year: '数据年份：', value: '2020年' };

// 中央大屏
export const middleData = [
  { label_name: '整治企业数(家)', label_value: '393', label_img: '/static/images/thumbs-up.png' },
  { label_name: '新增工业机器人(台)', label_value: '447', label_img: '/static/images/thumbs-up.png' },
  { label_name: '新增工业供地面积(亩)', label_value: '5438.6', label_img: '/static/images/thumbs-up.png' },
  { label_name: '市级企业技术中心(家)', label_value: '23', label_img: '/static/images/thumbs-up.png' }
];

// 新增工业机器人情况
export const leftMidData = {
  name: '新增工业机器人情况',
  xAxis: [
    '莲都区',
    '开发区',
    '青田县',
    '缙云县',
    '遂昌县',
    '松阳县',
    '云和县',
    '庆元县',
    '景宁县',
    '龙泉市'
  ],
  value: [
    {
      name: '2018',
      data: [21, 48, 57, 48, 30, 30, 21, 20, 15, 48]
    },
    {
      name: '2019',
      data: [37, 60, 59, 64, 30, 32, 21, 20, 15, 50]
    },
    {
      name: '2020',
      data: [52, 54, 60, 68, 35, 47, 27, 25, 19, 60]
    }
  ]
};

// 工业用地情况
export const leftBotData = {
  name: '工业用地情况',
  xAxis: [
    '莲都区',
    '开发区',
    '青田县',
    '缙云县',
    '遂昌县',
    '松阳县',
    '云和县',
    '庆元县',
    '景宁县',
    '龙泉市'
  ],
  value: [
    {
      name: '新增工业供地面积',
      data: [
        141.6,
        1430.2,
        575.2,
        908.1,
        572.0,
        604.2,
        271.4,
        274.1,
        34.2,
        627.7
      ]
    },
    {
      name: '新出让工业用地面积',
      data: [141.6, 927.6, 517.9, 898.6, 431.8, 511.9, 66.7, 274.1, 34.2, 627.7]
    }
  ]
};

// 市级企业技术中心排名
export const rightTopData = {
  name: '市级企业技术中心排名',
  total: 21,
  value: [
    { rank: 1, area: '缙云县', ent_count: 6 },
    { rank: 2, area: '开发区', ent_count: 4 },
    { rank: 3, area: '龙泉市', ent_count: 3 },
    { rank: 4, area: '莲都区', ent_count: 2 },
    { rank: 5, area: '青田县', ent_count: 2 },
    { rank: 6, area: '遂昌县', ent_count: 2 },
    { rank: 7, area: '松阳县', ent_count: 2 }
  ]
};

// 清洁生产审核企业排名
export const rightMidData = {
  name: '清洁生产审核企业排名',
  total: 51,
  value: [
    { rank: 1, area: '开发区', ent_count: 11 },
    { rank: 2, area: '缙云县', ent_count: 10 },
    { rank: 3, area: '青田县', ent_count: 8 },
    { rank: 4, area: '遂昌县', ent_count: 8 },
    { rank: 5, area: '松阳县', ent_count: 7 },
    { rank: 6, area: '龙泉市', ent_count: 7 }
  ]
};

export const rightBottomData = {
  name: '备案投资额1000万元以上制造业情况',
  value: [
    { area: '莲都区', zzy_project: 54, zzy_project_invest: 14.21 },
    { area: '开发区', zzy_project: 96, zzy_project_invest: 222.18 },
    { area: '青田县', zzy_project: 54, zzy_project_invest: 30.36 },
    { area: '缙云县', zzy_project: 95, zzy_project_invest: 53.58 },
    { area: '遂昌县', zzy_project: 45, zzy_project_invest: 79.59 },
    { area: '松阳县', zzy_project: 28, zzy_project_invest: 53.73 },
    { area: '云和县', zzy_project: 20, zzy_project_invest: 24.09 },
    { area: '庆元县', zzy_project: 23, zzy_project_invest: 9.68 },
    { area: '景宁县', zzy_project: 11, zzy_project_invest: 3.03 },
    { area: '龙泉市', zzy_project: 39, zzy_project_invest: 82.36 }
  ]
};
// 右下图例
export const optionData = [
  {
    name: '制造业项目数',
    key: 'zzy_project',
    data: []
  },
  {
    name: '制造业项目投资额',
    key: 'zzy_project_invest',
    data: []
  }
];
// 地图数据
export const mapData = [
  {
    name: '“低散乱”企业整治(家)',
    type: 'Corporate_governance',
    data: []
  },
  {
    name: '新增工业供地面积(亩)',
    type: 'Area_of_new_industrial_land',
    data: []
  }
];
//
export const areaList = [
  // 亩均税收
  {
    name: '缙云县',
    value: 61,
    type: 'Corporate_governance'
  },
  {
    name: '景宁县',
    value: 10,
    type: 'Corporate_governance'
  },
  {
    name: '莲都区',
    value: 21,
    type: 'Corporate_governance'
  },
  {
    name: '龙泉市',
    value: 47,
    type: 'Corporate_governance'
  },
  {
    name: '青田县',
    value: 51,
    type: 'Corporate_governance'
  },
  {
    name: '庆元县',
    value: 26,
    type: 'Corporate_governance'
  },
  {
    name: '松阳县',
    value: 42,
    type: 'Corporate_governance'
  },
  {
    name: '遂昌县',
    value: 30,
    type: 'Corporate_governance'
  },
  {
    name: '云和县',
    value: 50,
    type: 'Corporate_governance'
  },
  { name: '缙云县', value: '898.6', type: 'Area_of_new_industrial_land' },
  { name: '景宁县', value: '34.2', type: 'Area_of_new_industrial_land' },
  { name: '莲都区', value: '141.6', type: 'Area_of_new_industrial_land' },
  { name: '龙泉市', value: '627.7', type: 'Area_of_new_industrial_land' },
  { name: '青田县', value: '517.9', type: 'Area_of_new_industrial_land' },
  { name: '庆元县', value: '274.1', type: 'Area_of_new_industrial_land' },
  { name: '松阳县', value: '511.9', type: 'Area_of_new_industrial_land' },
  { name: '遂昌县', value: '431.8', type: 'Area_of_new_industrial_land' },
  { name: '云和县', value: '66.7', type: 'Area_of_new_industrial_land' }
];

// 新增工业供地面积地图点数据
export const addAreaMap = [
  {
    name: '开发区',
    value: '-',
    lng: 119.85027778,
    lat: 28.41416667,
    type: 'Area_of_new_industrial_land'
  },
  {
    name: '缙云县',
    value: '898.6 ',
    lng: 120.091573,
    lat: 28.709279,
    type: 'Area_of_new_industrial_land'
  },
  {
    name: '景宁县',
    value: '34.2 ',
    lng: 119.710697,
    lat: 28.013312,
    type: 'Area_of_new_industrial_land'
  },
  {
    name: '莲都区',
    value: '141.6 ',
    lng: 119.912612,
    lat: 28.495836,
    type: 'Area_of_new_industrial_land'
  },
  {
    name: '龙泉市',
    value: '627.7 ',
    lng: 119.141461,
    lat: 28.104623,
    type: 'Area_of_new_industrial_land'
  },
  {
    name: '青田县',
    value: '517.9 ',
    lng: 120.289277,
    lat: 28.179695,
    type: 'Area_of_new_industrial_land'
  },
  {
    name: '庆元县',
    value: '274.1 ',
    lng: 119.06259,
    lat: 27.65922,
    type: 'Area_of_new_industrial_land'
  },
  {
    name: '松阳县',
    value: '511.9 ',
    lng: 119.482015,
    lat: 28.499171,
    type: 'Area_of_new_industrial_land'
  },
  {
    name: '遂昌县',
    value: '431.8 ',
    lng: 119.276104,
    lat: 28.632119,
    type: 'Area_of_new_industrial_land'
  },
  {
    name: '云和县',
    value: '66.7 ',
    lng: 119.573397,
    lat: 28.16079,
    type: 'Area_of_new_industrial_land'
  }
];
// 低散乱”企业整治地图点数据
export const enterpriseRenovation = [
  {
    name: '开发区',
    value: '-',
    lng: 119.85027778,
    lat: 28.41416667,
    type: 'Corporate_governance'
  },
  {
    name: '缙云县',
    value: 61,
    lng: 120.091573,
    lat: 28.709279,
    type: 'Corporate_governance'
  },
  {
    name: '景宁县',
    value: 10,
    lng: 119.710697,
    lat: 28.013312,
    type: 'Corporate_governance'
  },
  {
    name: '莲都区',
    value: 21,
    lng: 119.912612,
    lat: 28.495836,
    type: 'Corporate_governance'
  },
  {
    name: '龙泉市',
    value: 47,
    lng: 119.141461,
    lat: 28.104623,
    type: 'Corporate_governance'
  },
  {
    name: '青田县',
    value: 51,
    lng: 120.289277,
    lat: 28.179695,
    type: 'Corporate_governance'
  },
  {
    name: '庆元县',
    value: 26,
    lng: 119.06259,
    lat: 27.65922,
    type: 'Corporate_governance'
  },
  {
    name: '松阳县',
    value: 42,
    lng: 119.482015,
    lat: 28.499171,
    type: 'Corporate_governance'
  },
  {
    name: '遂昌县',
    value: 30,
    lng: 119.276104,
    lat: 28.632119,
    type: 'Corporate_governance'
  },
  {
    name: '云和县',
    value: 50,
    lng: 119.573397,
    lat: 28.16079,
    type: 'Corporate_governance'
  }
];
