<template>
  <div class="base-icon-picker" :style="{ width: this.width }">
    <el-input v-model="inputVal" type="text" clearable>
      <el-popover
        v-model="visible"
        slot="prepend"
        placement="right"
        width="400"
        trigger="click"
        popper-class="base-icon-picker-popper"
      >
        <div class="icon-tab-outer">
          <i
            class="iconfont"
            @click="choose(item)"
            v-for="(item, index) in iconList"
            :class="
              Object.prototype.toString.call(item).slice(8, -1) === 'String'
                ? item
                : undefined
            "
            :key="index"
            ><component
              v-bind:is="item.component"
              style="width: 16px;height: 17px;"
              v-if="
                Object.prototype.toString.call(item).slice(8, -1) === 'Object'
              "
            ></component
          ></i>
        </div>
        <el-button slot="reference">
          <template v-if="inputVal && inputVal.includes('svg-')">
            <component
              v-bind:is="findSvg(svgStr2Str(inputVal))"
              style="width: 16px;height: 17px;"
            ></component>
          </template>
          <template v-else>
            <i class="iconfont" :class="inputVal">
              <span class="icon-placeolder" v-show="!inputVal">请选择</span>
            </i>
          </template>
        </el-button>
      </el-popover>
      <!-- <el-button slot="prepend">
        </el-button> -->
    </el-input>
  </div>
</template>
<script>
import { iconClassName } from '@/assets/font/iconfont/iconfont-classname.js';
import _isObject from 'lodash/isObject';
import _find from 'lodash/find';
import _get from 'lodash/get';
/**
 * @desc 图标选择器
 * @example
 * 外部加载 svg 图
 * import icons from '@/plugins/icons.js';
 * <base-icon-picker ref="myIconPicker"></base-icon-picker>
 * this.$nextTick(() => {
 *  this.$refs.myIconPicker.addSvg(icons);
 * });
 */
export default {
  name: 'BaseIconPicker',
  model: {
    prop: 'value',
    event: 'iconVal'
  },
  props: {
    width: {
      type: String
    },
    value: [String, Object]
  },
  data() {
    return {
      inputVal: this.value,
      visible: false,
      iconList: [],
      svgIcons: []
    };
  },
  watch: {
    value(val) {
      // console.log(val);
      this.inputVal = val;
    }
  },
  created() {
    this.iconList = iconClassName;
  },
  methods: {
    inputChange() {
      // console.log(this);
      // this.$emit('input', this.$event.target.value);
    },
    choose(item) {
      item = _isObject(item) ? `svg-${item.name}` : item;
      this.$emit('iconVal', item);
      this.inputVal = item;
      this.visible = false;
    },
    /**
     * @desc 去除 svg- 字符
     */
    svgStr2Str(val) {
      return val.replace('svg-', '');
    },
    /**
     * @desc 名称获取 svg 对象
     */
    findSvg(val) {
      const oSvg = _find(this.iconList, o => o.name === val);
      return _get(oSvg, 'component');
    },
    /**
     * @desc 添加 svg icon图
     */
    addSvg(icons = []) {
      for (let i = 0, len = icons.length; i < len; i++) {
        if (!_find(this.iconList, o => o.name === icons[i].name)) {
          this.iconList.push(icons[i]);
        }
      }
    }
  }
};
</script>
