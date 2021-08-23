<!--
 * @Autor: fandong
 * @Description: 文件说明
 * @Date: 2020-12-26 19:07:31
 * @LastEditTime: 2020-12-28 15:30:25
 * @LastEditors: fandong
 * @FilePath: \lishuigydn-web\src\packages\views\common-view\base-chart2.vue
-->
<template>
   <div :id="id" :style ="{height: height}"></div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'BaseChart2',
  props: {
    // 图表高度
    height: {
      type: String,
      default: '100%'
    },
    // 图表id
    id: {
      type: String
    },
    // 图表option
    option: {
      type: Object
    }
  },
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      this.initCharts();
    });
  },
  methods: {
    initCharts() {
      if (!_isNil(this.id)) {
        this.charts = echarts.init(document.getElementById(this.id));
        this.charts.setOption(this.option);
        const that = this;
        window.addEventListener('resize', () => {
          that.charts.resize();
        });
      }
    }
  }
};
</script>

<style lang="less" module>
</style>
