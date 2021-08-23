<template>
  <div :class="$style.main">
    <div :class="$style.head" v-if="isRenderTitle">
      <div @click="onTitleClick(title, $event)" :style="{
          cursor: 'titleClick' in this.$listeners ? 'pointer' : undefined
        }">{{ title }}</div>
      <div v-if="endTag != ''" :class="$style.endTag">{{ endTag }}</div>
    </div>
    <div :class="isBoxShadow ? $style.chart : undefined" :style="{ height: chartHeight }">
      <slot v-if="!showCharts" name="chart"></slot>
      <slot v-else-if="showChartsTwo" name="chart-two"></slot>
      <div v-else :id="id" style="height: 100%; width: 100%;overflow: hidden"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'baseChart',
  props: {
    // 标题名称
    title: {
      type: String,
      default: ''
    },
    // 标题尾部名称
    endTag: {
      type: String,
      default: ''
    },
    // 图表高度
    chartHeight: {
      type: String,
      default: '80%'
    },
    // 图表id
    id: {
      type: String
    },
    // 图表option
    option: {
      type: Object
    },
    // 是否显示图表
    showCharts: {
      type: Boolean,
      default: true
    },
    // 是否渲染头部
    isRenderTitle: {
      type: Boolean,
      default: true
    },
    // 是否显示边框的内部阴影
    isBoxShadow: {
      type: Boolean,
      default: true
    },
    // 是否允许自定义点击图例
    isClickLegend: {
      type: Boolean,
      default: false
    },
    // 5g站
    showChartsTwo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {
    'option.xAxis.data': {
      handler(newVal) {
        if (newVal && this.showCharts) {
          this.initCharts();
        }
      }
    },
    'option.series': {
      handler(newVal) {
        if (newVal && this.showCharts) {
          this.initCharts();
        }
      }
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.showCharts) {
        this.initCharts();
      }
    });
  },
  methods: {
    triggerAction(action, selected) {
      const legend = [];
      for (const name in selected) {
        legend.push({ name: name });
      }
      this.charts.dispatchAction({
        type: action,
        batch: legend
      });
    },
    isOneUnSelect(selected) {
      var unSelectedCount = 0;
      for (const name in selected) {
        if (selected[name] === false) {
          ++unSelectedCount;
        }
      }
      return unSelectedCount === 1;
    },
    initCharts() {
      if (!_isNil(this.id) && !_isNil(document.getElementById(this.id))) {
        this.charts = echarts.init(document.getElementById(this.id));
        this.charts.setOption(this.option);
        const that = this;
        that.charts.on('legendselectchanged', (event) => {
          if (this.isClickLegend) {
            that.charts.setOption({
              legend: { selected: { [event.name]: true } }
            });
          }
          this.$emit('legendselectchanged', event);
        });
        window.addEventListener('resize', () => {
          that.charts.resize();
        });
      }
    },
    /**
     * @desc 标题点击事件
     */
    onTitleClick(title, event) {
      this.$emit('titleClick', title, event);
    }
  }
};
</script>

<style lang="less" module>
@import url('./fontStyle/font.css');
.main {
  .full-xy;
  .head {
    height: 50px;
    width: 100%;
    color: #ffffff;
    font-size: 20px;
    font-family: 'pmzd';
    background: url('@{assets}/images/chart-head.png') no-repeat center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      padding-left: 16px;
    }
    /* > div:first-child {
      cursor: pointer;
    } */
    .endTag {
      color: #ffffff;
      font-size: 14px;
      padding-right: 20px;
    }
  }
  .chart {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #20dbee;
    background: #0a212a;
    box-shadow: inset 0px 1px 25px 0px #20dbee;
  }
}
</style>
