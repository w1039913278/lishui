<template>
  <div :class="$style.linkBox">
    <div><i class="el-icon-loading"></i></div>
  </div>
</template>

<script>
import mixinServe from '@constant/link-mixin.js';

export default {
  mixins: [mixinServe]
};
</script>

<style lang="less" module>
.link-box {
  height: 100%;
  position: relative;
  background-color: #fff;
  > div {
    width: 150px;
    height: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -75px;
    margin-left: 75px;
    text-align: center;
    i {
      font-size: 70px;
      line-height: 150px;
      color: #409eff;
    }
  }
}
</style>
