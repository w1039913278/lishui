/**
 * @desc 新旧动能转换 api 文档接口 领域模型
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
  path: '/energyData/getMainData',
  params: {},
  mock: false
},
{
  name: 'getZtIndexCardData',
  method: 'GET',
  desc: '专题指标卡片数据',
  path: '/energyData/getZtIndexCardData',
  params: {},
  mock: false
}, {
  name: 'getMainIndexCardData',
  method: 'GET',
  desc: '数据指标-指标卡片数据',
  path: '/energyData/getMainIndexCardData',
  params: { type: '' },
  mock: false
}, {
  name: 'getOneChartData',
  method: 'GET',
  desc: '低散乱企业政治-图表数据',
  path: '/energyData/getOneChartData',
  params: {},
  mock: false
}, {
  name: 'getTwoChartData',
  method: 'GET',
  desc: '新增工业机器人情况-图表数据',
  path: '/energyData/getTwoChartData',
  params: {},
  mock: false
},
{
  name: 'getThreeChartData',
  method: 'GET',
  desc: '工业用地情况-图表数据',
  path: '/energyData/getThreeChartData',
  params: {},
  mock: false
},
{
  name: 'getThreeCardIndexData',
  method: 'GET',
  desc: '工业用地情况-指标卡片数据',
  path: '/energyData/getThreeCardIndexData',
  params: {},
  mock: false
},
{
  name: 'getFourCardIndexData',
  method: 'GET',
  desc: '备案投资额1000万-指标卡片数据',
  path: '/energyData/getFourCardIndexData',
  params: {},
  mock: false
},
{
  name: 'getFourChartData',
  method: 'GET',
  desc: '备案投资额1000万-图表数据',
  path: '/energyData/getFourChartData',
  params: {},
  mock: false
},
{
  name: 'getFiveChartData',
  method: 'GET',
  desc: '市级企业技术中心排名-图表数据',
  path: '/energyData/getFiveChartData',
  params: {},
  mock: false
},
{
  name: 'getSixChartData',
  method: 'GET',
  desc: '清洁生产审核企业排名-图表数据',
  path: '/energyData/getSixChartData',
  params: {},
  mock: false
},
{
  name: 'getSixCardIndexData',
  method: 'GET',
  desc: '清洁生产审核企业排名-指标卡片数据',
  path: '/energyData/getSixCardIndexData',
  params: {},
  mock: false
}];
