/**
 * @desc 培育和帮扶 api 文档接口 领域模型
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
    name: 'getZtIndexCardData',
    method: 'GET',
    desc: '专题指标卡片数据',
    path: '/nurtureAndHelp/getZtIndexCardData',
    params: {},
    mock: false
  },
  {
    name: 'getUpgradeChartData',
    method: 'GET',
    desc: '小升规完成情况-图表数据',
    path: '/nurtureAndHelp/getUpgradeChartData',
    params: {},
    mock: false
  },
  {
    name: 'getUpgradeCardData',
    method: 'GET',
    desc: '小升规完成情况-指标卡片数据',
    path: '/nurtureAndHelp/getUpgradeCardData',
    params: { type: '' },
    mock: false
  },
  {
    name: 'getInvisibleChampionChartData',
    method: 'GET',
    desc: '隐形冠军-图表数据',
    path: '/nurtureAndHelp/getInvisibleChampionChartData',
    params: {},
    mock: false
  },
  {
    name: 'getInvisibleChampionIndexData',
    method: 'GET',
    desc: '隐形冠军-指标卡片数据',
    path: '/nurtureAndHelp/getInvisibleChampionIndexData',
    params: { type: '' },
    mock: false
  },
  {
    name: 'getMicroEntChartData',
    method: 'GET',
    desc: '小微企业园-图表数据',
    path: '/nurtureAndHelp/getMicroEntChartData',
    params: {},
    mock: false
  },
  {
    name: 'getMicroEntIndexData',
    method: 'GET',
    desc: '小微企业园-指标卡片数据',
    path: '/nurtureAndHelp/getMicroEntIndexData',
    params: { type: '' },
    mock: false
  },
  {
    name: 'getCostChartData',
    method: 'GET',
    desc: '降本减负完成情况-图表数据',
    path: '/nurtureAndHelp/getCostChartData',
    params: {},
    mock: false
  },
  {
    name: 'getCostIndexData',
    method: 'GET',
    desc: '降本减负完成情况-指标卡片数据',
    path: '/nurtureAndHelp/getCostIndexData',
    params: { type: '' },
    mock: false
  }
];
