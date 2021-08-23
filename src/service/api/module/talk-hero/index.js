/**
 * @desc 亩均论英雄 api 文档接口 领域模型
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
    path: 'perMuData/getMainData',
    params: {},
    mock: false
  },
  {
    name: 'getOneChartData',
    method: 'GET',
    desc: '亩均税收情况-图表数据',
    path: 'perMuData/getTaxPerChartData',
    params: {},
    mock: false
  },
  {
    name: 'getTwoChartData',
    method: 'GET',
    desc: '区县各指标排名-图表数据',
    path: 'perMuData/getAreaRankChartData',
    params: {},
    mock: false
  },
  {
    name: 'getThreeChartData',
    method: 'GET',
    desc: '规上企业亩均效益指标-图表数据',
    path: 'perMuData/getEntPerBenefitChartData',
    params: {},
    mock: false
  },
  {
    name: 'getFourChartData',
    method: 'GET',
    desc: '规上工业企业综合指标占比-图表数据',
    path: 'perMuData/getEntComplexIndexProportionData',
    params: {},
    mock: false
  },
  {
    name: 'getFiveChartData',
    method: 'GET',
    desc: '区县规上工业企业占比-图表数据',
    path: 'perMuData/getAreaEntProportionData',
    params: {},
    mock: false
  },
  {
    name: 'getZtIndexCardData',
    method: 'GET',
    desc: '标题指标卡片数据',
    path: 'perMuData/getZtIndexCardData',
    params: {},
    mock: false
  },
  {
    name: 'getOneCardIndexData',
    method: 'GET',
    desc: '标题指标卡片数据',
    path: 'perMuData/getTaxPerIndexCardData',
    params: { type: '' },
    mock: false
  },
  {
    name: 'getTwoCardIndexData',
    method: 'GET',
    desc: '区县各指标排名或规上企业亩均效益指标-指标卡片数据',
    path: 'perMuData/getIndexCardData',
    params: { type: '' },
    mock: false
  }
];
