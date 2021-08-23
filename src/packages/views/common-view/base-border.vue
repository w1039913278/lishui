<!--
 * @Autor: fandong
 * @Description: 文件说明
 * @Date: 2020-12-26 19:00:28
 * @LastEditTime: 2020-12-28 15:22:53
 * @LastEditors: fandong
 * @FilePath: \lishuigydn-web\src\packages\views\common-view\base-border.vue
-->
<template>
  <div :class="$style.main">
    <div :class="$style.head">
      <div @click="onClick">{{title}}</div>
      <div v-if="endTag!=''" :class="$style.endTag">{{endTag}}</div>
    </div>
    <div :class="$style.chart" :style="{ height: height}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseBorder',
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

    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {};
  },
  created() {

  },
  methods: {
    onClick(event) {
      this.$emit('itemClick', event);
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
      color:#FFFFFF;
      font-size: 20px;
      font-family: 'pmzd';
      background: url('@{assets}/images/chart-head.png') no-repeat center;
      background-size: cover;
      display: flex;
      align-items: center;
      > div {
        padding-left: 16px
      }
      > div:first-child{
        cursor: pointer;
      }
      .endTag {
        color:#FFFFFF;
        font-size: 14px;
        position: relative;
        left: 50%
      }
    }
    .chart {
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #20DBEE;
      background: #0A212A;
      box-shadow: inset 0px 1px 25px 0px #20DBEE;
    }
  }
</style>
