<!--
 * @Autor: fandong
 * @Description: 文件说明
 * @Date: 2020-12-26 18:43:37
 * @LastEditTime: 2020-12-28 13:50:36
 * @LastEditors: Please set LastEditors
 * @FilePath: \lishuigydn-web\src\packages\views\common-view\base-target.vue
-->
<template>
  <div class="main">
    <div class="target" v-for="(item, index) in dataList" :key="index">
      <img
        v-if="imgType == 2"
        src="/static/images/icon2.png"
        alt=""
        class="imgIcon"
      />
      <img v-else src="/static/images/icon1.png" alt="" class="imgIcon" />
      <div
        :style="{
          cursor: pointer(item, index)
        }"
        @click="onClick(item, index)"
      >
        <p class="num">
          {{ item.num }}
          <img :src="item.img" alt="" style="width:15px;height:15px" v-if="item.img">
        </p>
        <p class="company" style="color:#fff;opacity:1">{{ item.company }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'baseTarget',
  props: {
    dataList: {
      type: Array
    },
    imgType: {
      type: Number,
      default: 1
    },
    // 需要点击的选项卡的下标
    clickItemIndex: {
      type: Array
    }
  },
  created() {},
  methods: {
    /**
     * @desc 判断是否需要小手的手势
     */
    pointer(item, index) {
      let cursor;
      if (_isNil(this.clickItemIndex) && _has(this.$listeners, 'itemClick')) {
        cursor = 'pointer';
      }
      if (!_isNil(this.clickItemIndex) && _includes(this.clickItemIndex, index)) {
        cursor = 'pointer';
      }
      if (_isNil(this.clickItemIndex) && !_has(this.$listeners, 'itemClick')) {
        cursor = undefined;
      }
      return cursor;
    },
    onClick(item, index) {
      this.$emit('itemClick', item, index);
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .target {
    display: flex;
    align-items: center;
    > div {
      // cursor: pointer;
    }
    p {
      margin: 0;
      color: #fff;
    }
    .num {
      font-size: 28px;
    }
    .company {
      font-style: 12px;
      opacity: 0.65;
      margin-top: 3px;
    }
  }
  .imgIcon {
    width: 24px;
    margin-right: 10px;
  }
}
</style>
