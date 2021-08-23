<template>
  <div :class="{ 'base-double-wing-container': true, [ctCls]: ctCls }">
    <div class="view">
      <div class="le">
        <slot name="left">
          <!--子列-->
        </slot>
      </div>
      <div class="mi">
        <el-scrollbar v-if="isMiddleScroll">
          <slot name="middle">
            <!--主列-->
          </slot>
        </el-scrollbar>
        <slot v-else name="middle">
            <!--主列-->
          </slot>
      </div>
      <div class="ri">
        <slot name="right">
          <!--附加列-->
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDoubleWing',
  props: {
    border: {
      type: String,
      default: null
    },
    // 自定义样式
    ctCls: {
      type: String
    },
    // 中间区域是否需要添加滚动组件
    isMiddleScroll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    this.desc = '双飞翼布局，左右两列需要设置宽度值，高度自适应父容器';
    return {
      height: 0,
      miWidth: 0 // 中间区域的宽度
    };
  },
  created() {}
};
</script>
