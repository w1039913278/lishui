/**
 * @desc 字典
 */
/**
 * 系统登录 api 文档接口 领域模型
 */
export default [
  {
    name: 'getDictDataByTypeList',
    method: 'GET',
    desc: '获取字典',
    path: '/index/getDictDataByTypeList',
    mockPath: '/mock/index/getDictDataByTypeList',
    params: { ids: '10,6,7,9,2,11' }
  },
  {
    name: 'getProductClassify',
    method: 'GET',
    desc: '产品分类',
    path: '/index/getDictDataByTypeList',
    mockPath: '/mock/index/getDictDataByTypeList',
    params: { ids: '9' },
    isWhite: true // 白名单
  }
];
