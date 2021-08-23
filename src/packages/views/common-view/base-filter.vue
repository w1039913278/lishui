<!--
 * @Autor: fandong
 * @Description: 数据筛选按钮
 * @Date: 2020-12-25 15:25:12
 * @LastEditTime: 2020-12-27 11:35:08
 * @LastEditors: Please set LastEditors
 * @FilePath: \lishuigydn-web\src\packages\views\common-view\base-filter.vue
-->
<template>
  <div :class="$style.dataFilter"
       v-if="list && list.length">
    <div :class="[
        $style.dataFilterItem,
        itemActive === index ? $style.active : ''
      ]"
         v-for="(item, index) in list"
         :key="index"
         @click="itemClick(item, index)">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseFilter',
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      itemActive: 0
    };
  },
  watch: {},
  computed: {},
  created() {
    this.itemClick(this.list[this.itemActive], this.itemActive);
  },
  methods: {
    itemClick(item, index) {
      this.itemActive = index;
      this.$emit('change', item);
    }
  }
};
</script>

<style lang='less' module>
.dataFilter {
  width: 100%;
  display: flex;
  &-item {
    margin-right: 4px;
    border: 1px solid rgba(32, 219, 238, 0.5);
    color: rgba(255, 255, 255, 100);
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    background-color: rgba(10, 33, 42, 0.5);
    box-shadow: undefined, inset 0px 0px 30px 0px rgba(33, 235, 255, 0.41);
    padding: 0 20px;
    &:not(:last-child) {
      border-bottom: 1px solid rgba(32, 219, 238, 0.5);
    }
    &:hover,
    &.active {
      background: #20dbee;
    }
  }
}
</style>
