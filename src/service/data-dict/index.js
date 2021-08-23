/**
 * @desc 公共的一些字典
 */
export default {
  SEX_TYPE: [
    { paramValue: 0, paramDesc: '女' },
    { paramValue: 1, paramDesc: '男' }
  ],
  FLAG_TYPE: [
    { paramValue: 1, paramDesc: '新增' },
    { paramValue: 10, paramDesc: '等待' },
    { paramValue: 128, paramDesc: '归档' },
    { paramValue: 256, paramDesc: '停用' },
    { paramValue: 384, paramDesc: '丢弃' }
  ],
  WF_TYPE: [
    { paramValue: 0, paramDesc: '退回' },
    { paramValue: 1, paramDesc: '提交' },
    { paramValue: 2, paramDesc: '转交' }
  ],
  BOOLEAN_NUMBER_TYPE: [
    { paramValue: 0, paramDesc: '否' },
    { paramValue: 1, paramDesc: '是' }
  ],
  BOOLEAN_BOOLEAN_TYPE: [
    { paramValue: false, paramDesc: '否' },
    { paramValue: true, paramDesc: '是' }
  ]
};
