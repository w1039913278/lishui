<!--
 * @Author: xiangyun
 * @Date: 2020-12-26 09:46:35
 * @LastEditTime: 2020-12-29 16:54:21
 * @LastEditors: Please set LastEditors
 * @Description: xiangyun
 * @FilePath: \lishuigydn-web\src\packages\views\common-view\base-progress.vue
-->
<template>
  <div class="carousel-progress">
    <div class="progress-box-header">
      <p class="progress-box-header-rank">序号</p>
      <p class="progress-box-header-name">区域</p>
      <p class="progress-box-header-value" @click="clickTitle(header.value)">
        {{ header.value }} {{ header.unit ? '(' + header.unit + ')' : '' }}
        <img :src="header.img" alt="" style="width:15px;height:15px" v-if="header.img">
      </p>
    </div>
    <div class="overflow" v-if="isScroll">
      <template>
        <vue-seamless-scroll
          v-if="isShow"
          :data="list"
          :class="{ 'seamless-warp': true, [ctCls]: ctCls }"
          :class-option="classOption"
        >
          <ul class="progress">
            <li
              class="progress-item"
              v-for="(item, index) in list"
              :key="index"
            >
              <p class="progress-item-rank">{{ item.rank || index + 1 }}</p>
              <p class="progress-item-name">{{ item.name }}</p>
              <div class="progress-item-bar">
                <div
                  class="progress-item-bar-content"
                  :style="{ background: barBGColor, width: barWidth(item) }"
                ></div>
              </div>
              <p
                class="progress-item-value"
                :data-obj="JSON.stringify(item)"
                :id="index"
              >
                {{ item.value }}
              </p>
            </li>
          </ul>
        </vue-seamless-scroll>
      </template>
    </div>

    <template v-else>
      <ul class="progress">
        <li class="progress-item" v-for="(item, index) in list" :key="index">
          <p class="progress-item-rank">{{ item.rank || index + 1 }}</p>
          <p class="progress-item-name">{{ item.name }}</p>
          <div class="progress-item-bar">
            <div
              class="progress-item-bar-content"
              :style="{ background: barBGColor, width: barWidth(item) }"
            ></div>
          </div>
          <p class="progress-item-value">
            {{ item.value }}
          </p>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll';
export default {
  name: 'baseProgress',
  components: {
    vueSeamlessScroll
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    //  自定义样式
    ctCls: {
      type: String
    },
    // 进度条的颜色
    barColor: {
      type: Array,
      default: () => ['#20DBEE', '#42E1A6']
    },
    // 颜色渐变的方向
    colorDirection: {
      type: String,
      default: 'right'
    },
    // 边框的样式
    borderCls: {
      type: String,
      default: ''
    },
    isScroll: {
      type: Boolean,
      default: true
    },
    // 无缝滚动参数
    scrollOption: {
      type: Object,
      default() {
        return {
          step: 0.2, // 数值越大速度滚动越快
          limitMoveNum: 0, // 开始无缝滚动的数据量 this.dataList.length
          hoverStop: true, // 是否开启鼠标悬停stop
          direction: 1, // 0向下 1向上 2向左 3向右
          openWatch: true, // 开启数据实时监控刷新dom
          singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
          singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
          waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
        };
      }
    },
    // 是否使用最大值作为总数
    isAllMax: {
      type: Boolean,
      default: true
    },
    // 表头数据
    header: {
      type: Object,
      default() {
        return {
          rank: '序号',
          name: '区域',
          value: '企业家数',
          unit: '家',
          img: ''
        };
      }
    }
  },
  data() {
    return {
      maxValue: 0,
      isShow: true
    };
  },
  watch: {
    list() {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
      this.maxValue =
        Math.max.apply(
          Math,
          this.list.map(item => {
            return isNaN(parseFloat(item.value)) ? 0 : parseFloat(item.value);
          })
        ) * 1.2;
    }
  },
  computed: {
    barBGColor: function () {
      if (this.barColor && this.barColor.length === 1) {
        return `${this.barColor[0]}`;
      }

      const colorList = this.barColor.join(',');

      return `linear-gradient(to ${this.colorDirection}, ${colorList})`;
    },
    dotStyle: function () {
      return `border: 2px solid ${this.dotBorder}; box-shadow: 0px 0px 10px 0px ${this.dotShadow};`;
    },
    classOption() {
      return this.scrollOption;
    }
  },
  mounted() {
    this.maxValue =
      Math.max.apply(
        Math,
        this.list.map(item => {
          return item.value;
        })
      ) * 1.2;
  },
  methods: {
    /**
     * @description 计算进度条长度
     * @param { object } option 每一列的数据
     */
    barWidth(option) {
      const total = this.isAllMax ? this.maxValue : option.total;
      if (!this.isAllMax && option.percent) {
        const percent = parseFloat(option.percent);
        const width = !isNaN(percent)
          ? percent > 1
            ? percent
            : percent * 100
          : 0;
        return `${width}%`;
      }
      const value = parseFloat(option.value);
      if (isNaN(value)) {
        return '0%';
      } else {
        const width = ((value * 100) / total).toFixed(2);
        return `${width}%`;
      }
    },
    /**
     * @description 最后一列点击
     * @param { object } option 每一列的数据
     */
    // onClick(item, index) {
    //   this.$emit('onClick', { item, index });
    // },
    // clickProps(e) {
    //   const index = parseInt(e.target.id);
    //   const item = JSON.parse(e.target.dataset.obj);
    //   this.$emit('onClick', { item, index });
    // },
    clickTitle(title) {
      this.$emit('onTitleClick', { title });
    }
  }
};
</script>

<style lang="less">
.carousel-progress {
  .progress {
    width: 100%;
    padding: 0;
    margin: 0;
    &-item {
      .full-x;
      height: 40px;
      .flex-start-center;
      p {
        margin: 0;
      }
      &-rank {
        width: 50px;
        .full-y;
        .c-fff;
        .f-16;
        .flex-center;
      }
      &-name {
        opacity: 0.85;
        .flex-center;
        .c-fff;
        .f-16;
        width: 35%;
      }
      &-bar {
        flex: 1;
        height: 12px;
        background-color: rgba(25, 31, 45, 0.51);
        .flex-start-center;
        &-content {
          .full-y;
        }
      }
      &-value {
        width: 78px;
        opacity: 0.85;
        .full-y;
        .c-fff;
        .f-16;
        .flex-center;
      }
      &:nth-child(odd) {
        background-color: rgba(34, 60, 78, 1);
      }
    }
  }
  .progress-box-header {
    width: 100%;
    height: 50px;
    .border-box;
    .flex-start-center;
    &-rank {
      width: 50px;
    }
    &-name {
      width: 35%;
    }
    &-value {
      flex: 1;
      // .pointer;
    }
    p {
      .c-fff;
      text-align: center;
    }
  }
}
</style>
