import Mock from 'mockjs2';
import { builder, getQueryParameters } from '../util';

const treeList = options => {
  const parameters = getQueryParameters(options);
  console.info('mock: parameters', parameters);
  let result = [];
  /* for (let i = 1; i < 12; i++) {
    result.push({
      id: i,
      label: '一级 1',
      children: [
        {
          label: '二级 1-1'
        }
      ]
    });
  } */
  result = [{
    id: 1,
    label: '一级 1',
    children: [{
      id: 4,
      label: '二级 1-1',
      children: [{
        id: 9,
        label: '三级 1-1-1'
      }]
    }]
  }, {
    id: 2,
    label: '一级 2',
    children: [{
      id: 5,
      label: '二级 2-1',
      children: [{
        id: 10,
        label: '三级 2-1-1'
      }]
    }, {
      id: 6,
      label: '二级 2-2',
      children: [{
        id: 11,
        label: '三级 2-2-1'
      }]
    }]
  }, {
    id: 3,
    label: '一级 3',
    children: [{
      id: 7,
      label: '二级 3-1',
      children: [{
        id: 12,
        label: '三级 3-1-1'
      }]
    }, {
      id: 8,
      label: '二级 3-2',
      children: [{
        id: 13,
        label: '三级 3-2-1'
      }]
    }]
  }];
  return builder(result);
};
Mock.mock(
  /\/mock\/tree\/index/,
  'get',
  treeList
); // tree
