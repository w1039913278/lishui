/**
 * @desc 数据字典 mock 类
 */
import Mock from 'mockjs2';
import { builder } from '../util';

const getDictDataByTypeList = options => {
  const aDictList = [
    {
      name: '融资产品类型',
      data: [
        { id: 1, name: '基金贷' },
        { id: 2, name: '基金担' },
        { id: 3, name: '基金租' },
        { id: 4, name: '基金联投' },
        { id: 5, name: '基金保' },
        { id: 6, name: '基金套保' }
      ]
    },
    {
      name: '产品贷款对象',
      data: [
        { id: 1, name: '企业' },
        { id: 2, name: '个体工商户' },
        { id: 3, name: '企业主' }
      ]
    },
    {
      name: '贷款用途',
      data: [
        { id: 1, name: '固定资产投入' },
        { id: 2, name: '流动资金' },
        { id: 3, name: '项目融资' },
        { id: 4, name: '生产经营' },
        { id: 5, name: '其他' }
      ]
    },
    {
      name: '产品类型',
      data: [
        { id: 1, name: '流动资金贷' },
        { id: 2, name: '房产抵押贷' },
        { id: 3, name: '企业税贷' },
        { id: 4, name: '企业经营贷' },
        { id: 5, name: '项目融资贷' },
        { id: 6, name: '高新企业贷' },
        { id: 7, name: '资产抵押贷' },
        { id: 8, name: '小微企业贷' },
        { id: 9, name: '其他贷款' }
      ]
    },
    {
      name: '担保类型',
      data: [
        { id: 1, name: '房产抵押' },
        { id: 2, name: '车辆抵押' },
        { id: 3, name: '担保保证' },
        { id: 5, name: '纯信用' },
        { id: 6, name: '其他' }
      ]
    },
    {
      name: '还款方式',
      data: [
        { id: 1, name: '分期还款' },
        { id: 2, name: '到期还款' },
        { id: 3, name: '随借随还' },
        { id: 4, name: '其他' }
      ]
    }
  ];
  return builder(aDictList);
};
const getProductClassify = options => {
  const aDictList = [
    {
      name: '产品类型',
      data: [
        { id: 1, name: '流动资金贷' },
        { id: 2, name: '房产抵押贷' },
        { id: 3, name: '企业税贷' },
        { id: 4, name: '企业经营贷' },
        { id: 5, name: '项目融资贷' },
        { id: 6, name: '高新企业贷' },
        { id: 7, name: '资产抵押贷' },
        { id: 8, name: '小微企业贷' },
        { id: 9, name: '其他贷款' }
      ]
    }
  ];
  return builder(aDictList);
};
Mock.mock(/\/mock\/index\/getDictDataByTypeList/, 'get', getDictDataByTypeList); // 字典列表
Mock.mock(/\/mock\/index\/getProductClassify/, 'get', getProductClassify); // 产品分类
