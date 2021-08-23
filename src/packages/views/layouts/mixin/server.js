/**
 * @decs 混入
 */
var myMixin = {
  data() {
    // 数据专题
    this.titleQuotaFieldObj = {
      zt_hy: '专题页面意义',
      qtdw: '牵头单位',
      xtdw: '协同单位',
      zt_fgld: '牵头单位分管领导及手机全号',
      zt_ywfzr: '牵头单位业务负责人及手机全号',
      zt_sjzy: '牵头单位数据专员及手机全号',
      zt_sl: '页面指标数量',
      name: '专题名称',
      bz: '备注'
    };
    // 指标
    this.quotaFieldObj = {
      zb_dw: '数据提供单位',
      sjyfs: '数据来源方式',
      fgld: '数据提供单位分管领导及手机全号',
      sjjrfs: '数据接入方式',
      ywfzr: '数据提供单位业务负责人及手机全号',
      sjgxfs: '数据更新方式',
      gxpl: '更新频率',
      t: '更新时间',
      cjfz: '触警阈值',
      yzfz: '优质阈值',
      cjcs: '预警显示方式及措施',
      name: '指标名称',
      zb_hy: '指标意义'

      // zb_dw: '来源部门',
      // t: '更新时间',
      // gxpl: '更新频率',
      // sjyfs: '更新方式',
      // ywfzr: '业务负责人及联系方式',
      // fgld: '分管领导及联系方式',
      // yzyy: '优质阈值',
      // cjyz: '触警阈值',
      // cjcs: '预警显示方式及措施',
      // name: '指标名称',
      // zb_hy: '指标意义'
    };
    return {
      showDetailTitle: '',
      // 指标展示数据
      showDetailData: {},
      tabs: [],
      activeName: '0',
      params: {}
    };
  },
  created() {},
  watch: {
    activeName(v) {
      if (Object.keys(this.params).length) {
        this.openDetailHandle(
          this.params.data,
          this.params.isShowTitle,
          this.params.singleRowFields,
          this.params.tabs
        );
      }
    }
  },
  methods: {
    /**
     * @desc 中间数据点击事件
     */
    middleTitleClick(item, index) {
      this.$emit('middleTitleClick', item, index);
    },
    /**
     * @desc 标题点击事件
     */
    onTitleClick(event) {
      // this.isDetail = true;
      this.$emit('titleClick', event);
    },
    /**
     * @desc 设置指标展示数据
     */
    openDetailHandle(
      data = [],
      isShowTitle = true,
      singleRowFields = ['zb_hy'],
      tabs = []
    ) {
      // if (this.isDetail) {
      //   return;
      // }
      this.params = {
        data,
        isShowTitle,
        singleRowFields,
        tabs
      };
      const dataKeys = !isShowTitle
        ? _keys(this.titleQuotaFieldObj)
        : _keys(this.quotaFieldObj);
      const singleRowData = [];
      const twoRowData = [];
      const conformityData = [];
      this.showDetailTitle = '';
      this.showDetailData = {};
      this.tabs = [];
      this.$nextTick(() => {
        setTimeout(
          this.dataHandle,
          0,
          dataKeys,
          isShowTitle,
          data,
          singleRowFields,
          singleRowData,
          twoRowData,
          conformityData,
          tabs
        );
      });
    },
    dataHandle(
      dataKeys,
      isShowTitle,
      data,
      singleRowFields,
      singleRowData,
      twoRowData,
      conformityData,
      tabs
    ) {
      this.tabs = tabs;
      if (tabs.length && Array.isArray(data)) {
        data = data[Number(this.activeName)];
      }
      for (let i = 0, len = dataKeys.length; i < len; i++) {
        const keyName = dataKeys[i];
        if (keyName === 'name' && isShowTitle) {
          this.showDetailTitle = _get(data, keyName, '');
          continue;
        }
        if (keyName === 'name' && !isShowTitle) {
          // 专题卡片也显示标题
          this.showDetailTitle = _get(data, keyName, '');
          continue;
        }
        const text = _get(
          !isShowTitle ? this.titleQuotaFieldObj : this.quotaFieldObj,
          keyName,
          ''
        );
        if (_includes(singleRowFields, keyName)) {
          // 单行展示
          let textList;
          if (_get(data, keyName, '')) {
            textList = _get(data, keyName, '').split(/\d[.、]/);
          } else {
            textList = [];
          }
          singleRowData.push([{ id: i + 10001, text, value: textList }]);
        } else {
          // 一行展示两个
          if (twoRowData.length < 2) {
            twoRowData.push({
              id: i + 100,
              text,
              value: _get(data, keyName, '')
            });
          }
          if (twoRowData.length === 2) {
            conformityData.push(twoRowData);
            twoRowData = [];
          }
        }
      }
      if (twoRowData.length === 1) {
        conformityData.push([twoRowData[0], { id: '', text: '', value: '' }]);
        twoRowData = [];
      }
      conformityData.push(...singleRowData);
      // console.log(conformityData);
      if (!_isEmpty(conformityData)) {
        let obj = [];
        conformityData.forEach((ele, index) => {
          if (ele[0].text === '专题页面意义' || ele[0].text === '指标意义') {
            obj = [...ele];
            conformityData.splice(index, 1);
          }
        });
        conformityData.unshift(obj);
        this.showDetailData = conformityData;
        setTimeout(() => {
          this.isDetail = true;
        }, 0);
      }
    },
    /**
     * @desc 判断是否需要小手的手势
     */
    pointer(item, index) {
      let cursor;
      if (
        _isNil(this.middleTitleIndex) &&
        _has(this.$listeners, 'middleTitleClick')
      ) {
        cursor = 'pointer';
      }
      if (
        !_isNil(this.middleTitleIndex) &&
        _includes(this.middleTitleIndex, index)
      ) {
        cursor = 'pointer';
      }
      if (
        _isNil(this.middleTitleIndex) &&
        !_has(this.$listeners, 'middleTitleClick')
      ) {
        cursor = undefined;
      }
      return cursor;
    }
  }
};
export default myMixin;
