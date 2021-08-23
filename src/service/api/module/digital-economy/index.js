/**
 * @desc 数字经济 api 文档接口 领域模型
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
    path: '/digitalEconomy/getMainData',
    params: {},
    mock: false
  },
  {
    name: 'getZtIndexCardData',
    method: 'GET',
    desc: '专题指标卡片数据',
    path: '/digitalEconomy/getZtIndexCardData',
    params: {},
    mock: false
  },
  {
    name: 'getMainIndexCardData',
    method: 'GET',
    desc: '专题指标卡片数据',
    path: '/digitalEconomy/getMainIndexCardData',
    params: { type: '' },
    mock: false
  },
  {
    name: 'getOneIndexCardData',
    method: 'GET',
    desc: '数字经济核心产业增加值及增速-指标卡片数据',
    path: '/digitalEconomy/getOneIndexCardData',
    params: { type: '' },
    mock: false
  },
  {
    name: 'getOneChartData',
    method: 'GET',
    desc: '数字经济核心产业增加值及增速-图表数据',
    path: '/digitalEconomy/getOneChartData',
    params: {},
    mock: false
  },
  {
    name: 'getTwoChartData',
    method: 'GET',
    desc: '核心制造业增加值及增速情况-图表数据',
    path: '/digitalEconomy/getTwoChartData',
    params: {},
    mock: false
  },
  {
    name: 'getTwoCardIndexData',
    method: 'GET',
    desc: '核心制造业增加值及增速情况-指标卡片数据',
    path: '/digitalEconomy/getTwoCardIndexData',
    params: { type: '' },
    mock: false
  },
  {
    name: 'getThreeChartData',
    method: 'GET',
    desc: '核心制造业增加值区县情况-图表数据',
    path: '/digitalEconomy/getThreeChartData',
    params: {},
    mock: false
  },
  {
    name: 'getThreeCardIndexData',
    method: 'GET',
    desc: '核心制造业增加值区县情况-指标卡片数据',
    path: '/digitalEconomy/getThreeCardIndexData',
    params: {},
    mock: false
  },
  {
    name: 'getFourChartData',
    method: 'GET',
    desc: '核心制造业增加值排名-图表数据',
    path: '/digitalEconomy/getFourChartData',
    params: {},
    mock: false
  },
  {
    name: 'getFourCardIndexData',
    method: 'GET',
    desc: '核心制造业增加值排名-指标卡片数据',
    path: '/digitalEconomy/getFourCardIndexData',
    params: {},
    mock: false
  },
  {
    name: 'getFiveChartData',
    method: 'GET',
    desc: '数字经济发展综合评价情况-图表数据',
    path: '/digitalEconomy/getFiveChartData',
    params: {},
    mock: false
  },
  {
    name: 'getSixCardIndexData',
    method: 'GET',
    desc: '数字经济发展综合评价排名-指标卡片数据',
    path: '/digitalEconomy/getSixCardIndexData',
    params: {},
    mock: false
  },
  {
    name: 'getSixChartData',
    method: 'GET',
    desc: '数字经济发展综合评价排名-指标卡片数据',
    path: '/digitalEconomy/getSixChartData',
    params: {},
    mock: false
  },
  {
    name: 'getSevenChartData',
    method: 'GET',
    desc: '企业上云完成情况-图表数据',
    path: '/digitalEconomy/getSevenChartData',
    params: {},
    mock: false
  }
];
