/**
 * @desc 5g-丽水 api 文档接口 领域模型
 */
export default [
  {
    name: 'getAreaInfo',
    method: 'GET',
    desc: '获取区域列表',
    path: '/index/getAreaInfo',
    mockPath: '/mock/index/getAreaInfo',
    params: {},
    isWhite: true // 白名单
  },
  {
    name: 'getMainData',
    method: 'GET',
    desc: '数据指标及地图数据',
    path: '/fiveGData/getMainData',
    params: {},
    mock: false
  },
  {
    name: 'getZtIndexCardData',
    method: 'GET',
    desc: '专题指标卡片数据',
    path: '/fiveGData/getZtIndexCardData',
    params: {},
    mock: false
  },
  {
    name: 'getOneChartData',
    method: 'GET',
    desc: '5G基站建设情况-图表数据',
    path: '/fiveGData/getOneChartData',
    params: {},
    mock: false
  },
  {
    name: 'getOneIndexCardData',
    method: 'GET',
    desc: '5G基站建设情况-指标卡片数据',
    path: '/fiveGData/getOneIndexCardData',
    params: {},
    mock: false
  },
  {
    name: 'getTwoChartData',
    method: 'GET',
    desc: '2020-2025年规划基站数排名-图表数据',
    path: '/fiveGData/getTwoChartData',
    params: {},
    mock: false
  },
  {
    name: 'getTwoCardIndexData',
    method: 'GET',
    desc: '2020-2025年规划基站数排名-指标卡片数据',
    path: '/fiveGData/getTwoCardIndexData',
    params: {},
    mock: false
  },
  {
    name: 'getThreeChartData',
    method: 'GET',
    desc: '2020年已建成基站数排名-图表数据',
    path: '/fiveGData/getThreeChartData',
    params: {},
    mock: false
  },
  {
    name: 'getThreeCardIndexData',
    method: 'GET',
    desc: '2020年已建成基站数排名-指标卡片数据',
    path: '/fiveGData/getThreeCardIndexData',
    params: {},
    mock: false
  },
  {
    name: 'getFourChartData',
    method: 'GET',
    desc: '各区县基站建设情况-图表数据',
    path: '/fiveGData/getFourChartData',
    params: {},
    mock: false
  },
  {
    name: 'getFourCardIndexData',
    method: 'GET',
    desc: '各区县基站建设情况-指标卡片数据',
    path: '/fiveGData/getFourCardIndexData',
    params: {},
    mock: false
  }
];
