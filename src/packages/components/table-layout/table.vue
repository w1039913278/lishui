<template>
  <div class="base-table-container table-layout-01">
    <table :border="border" style="border-collapse: collapse;">
      <template v-for="(row, index) in currentRows">
        <tr :key="index">
          <template v-for="(tdPanel, tdIndex) in rowColoumns[index]">
            <td
              :key="tdIndex"
              :colspan="tdPanel['data']['props']['userColspan']"
              :rowspan="tdPanel['data']['props']['userRowspan']"
              :style="{ width: width, height: height, padding: padding }"
            >
              <!--作用域插槽-->
              <slot name="context-slot" v-bind:component="tdPanel"></slot>
            </td>
          </template>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BaseTableLayout',
  data() {
    this.desc =
      'table布局，按照普通表格的方法布局子元素（columns：3将父容器分成3列）';
    return {
      currentRows: [], // 行数 Array
      rowColoumns: [] // 一行的所有列 vNode Array
    };
  }
};
</script>

<style>
.base-table-container{

}
</style>
