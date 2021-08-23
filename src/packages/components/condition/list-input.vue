<template>
  <div class="listInput">
    <template v-for="(item, idx) in value">
      <slot :value="item" :index="idx"></slot>
    </template>
    <el-input
      v-model="inputVal"
      @blur="handlerAdd"
      @keyup.native.enter="handlerAdd"
      clearable
    ></el-input>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true,
      default: () => []
    },
    type: {
      default: ''
    }
  },
  data() {
    return {
      inputVal: ''
    };
  },
  methods: {
    handlerAdd() {
      if (this.inputVal.trim() === '') return;

      this.value.push(this.inputVal);
      this.inputVal = '';
      this.$emit('input', this.value);
    }
  }
};
</script>

<style lang="less" scoped>
.listInput {
  display: inline-block;
  .el-input {
    width: 140px;
    margin-left: 10px;
  }
}
</style>
