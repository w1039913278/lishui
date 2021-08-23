/**
 * @desc 工业经济运行 api 文档接口 领域模型
 */
export default [{
  name: 'getAreaInfo',
  method: 'GET',
  desc: '获取区域列表',
  path: '/index/getAreaInfo',
  mockPath: '/mock/index/getAreaInfo',
  params: {},
  isWhite: true // 白名单
}, {
  name: 'getMainData',
  method: 'GET',
  desc: '数据指标及地图数据',
  path: 'industryEconomy/getMainData',
  params: {},
  mock: false
}, {
  name: 'getOneChartData',
  method: 'GET',
  desc: '规上工业产值及增幅-图表数据',
  path: 'industryEconomy/getOneChartData',
  params: {},
  mock: false
}, {
  name: 'getTwoChartData',
  method: 'GET',
  desc: '规上工业增加值及增幅-图表数据',
  path: 'industryEconomy/getTwoChartData',
  params: {},
  mock: false
}, {
  name: 'getThreeChartData',
  method: 'GET',
  desc: '工业投资情况-图表数据',
  path: 'industryEconomy/getThreeChartData',
  params: {},
  mock: false
}, {
  name: 'getFourChartData',
  method: 'GET',
  desc: '技改投资情况-图表数据',
  path: 'industryEconomy/getFourChartData',
  params: {},
  mock: false
}, {
  name: 'getFiveChartData',
  method: 'GET',
  desc: '工业企业情况-图表数据',
  path: 'industryEconomy/getFiveChartData',
  params: {},
  mock: false
}, {
  name: 'getSixChartData',
  method: 'GET',
  desc: '工业用电情况-图表数据',
  path: 'industryEconomy/getSixChartData',
  params: {},
  mock: false
}, {
  name: 'getSevenChartData',
  method: 'GET',
  desc: '工业税收收入情况-图表数据',
  path: 'industryEconomy/getSevenChartData',
  params: {},
  mock: false
}, {
  name: 'getZtIndexCardData',
  method: 'GET',
  desc: '专题指标卡片数据',
  path: 'industryEconomy/getZtIndexCardData',
  params: {},
  mock: false
}, {
  name: 'getMainIndexCardData',
  method: 'GET',
  desc: '数据指标-指标卡片数据',
  path: 'industryEconomy/getMainIndexCardData',
  params: { type: '' },
  mock: false
}, {
  name: 'getOneCardIndexData',
  method: 'GET',
  desc: '规上工业产值-指标卡片数据',
  path: 'industryEconomy/getOneIndexCardData',
  params: { type: '' },
  mock: false
}, {
  name: 'getTwoCardIndexData',
  method: 'GET',
  desc: '规上工业增加值-指标卡片数据',
  path: 'industryEconomy/getTwoCardIndexData',
  params: { type: '' },
  mock: false
}, {
  name: 'getThreeCardIndexData',
  method: 'GET',
  desc: '工业投资情况-指标卡片数据',
  path: 'industryEconomy/getThreeCardIndexData',
  mock: false
}, {
  name: 'getFourCardIndexData',
  method: 'GET',
  desc: '技改投资情况-指标卡片数据',
  path: 'industryEconomy/getFourCardIndexData',
  mock: false
}, {
  name: 'getFiveCardIndexData',
  method: 'GET',
  desc: '工业企业情况-指标卡片数据',
  path: 'industryEconomy/getFiveCardIndexData',
  mock: false
}, {
  name: 'getSixCardIndexData',
  method: 'GET',
  desc: '工业用电-指标卡片数据',
  path: 'industryEconomy/getSixCardIndexData',
  mock: false
}, {
  name: 'getSevenCardIndexData',
  method: 'GET',
  desc: '工业税收收入-指标卡片数据',
  path: 'industryEconomy/getSevenCardIndexData',
  mock: false
}];
