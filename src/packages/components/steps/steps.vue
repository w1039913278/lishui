<template>
  <div
    class="el-steps"
    :class="[!simple && 'el-steps--' + direction, simple && 'el-steps--simple']"
  >
    <slot></slot>
  </div>
</template>

<script>
import Migrating from './mixins/migrating.js';

export default {
  name: 'BaseSteps',
  provide: function () {
    return {
      getPanel: () => {
        return this;
      }
    };
  },
  mixins: [Migrating],

  props: {
    space: [Number, String],
    active: Number,
    direction: {
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean,
    simple: Boolean,
    finishStatus: {
      type: String,
      default: 'finish'
    },
    processStatus: {
      type: String,
      default: 'process'
    },
    // up/down content 的描述信息在时间轴的上面还是下面（el-steps 组件不能调整这个参数）
    position: {
      type: String,
      default: 'down',
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['up', 'down'].indexOf(value) !== -1;
      }
    }
  },

  data() {
    return {
      steps: [],
      stepOffset: 0
    };
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          center: 'center is removed.'
        }
      };
    }
  },

  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal);
    },

    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
};
</script>
