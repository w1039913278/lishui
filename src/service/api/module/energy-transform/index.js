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
}];
