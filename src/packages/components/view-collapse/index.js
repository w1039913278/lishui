/**
 * @desc Collapse 折叠面板，用于多组件共存在一个页面时切换使用，主要想替换 v-if 或者 v-show
 */
import _isNil from 'lodash/isNil';
import _hasIn from 'lodash/hasIn';

const BaseViewCollapse = {
  name: 'BaseViewCollapse',
  inheritAttrs: false,
  model: {
    prop: 'activeName',
    event: 'changeActiveName'
  },
  props: {
    activeName: {
      type: String
    },
    // 需要触发组件激活事件的 ref 值，激活事件 viewCollapseActivated
    propsRef: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  watch: {
    activeName(val, oldVal) {
      if (val !== oldVal) {
        this.curActiveName = val;
        setTimeout(() => {
          for (let i = 0, len = this.propsRef.length; i < len; i++) {
            const view = this.$parent.$refs[this.propsRef[i].ref];
            if (!_isNil(view) && this.activeName === this.propsRef[i].name && _hasIn(view.$options, 'viewCollapseActivated')) {
              view.$options.viewCollapseActivated.call(view); // 激活事件
            }
          }
        }, 0);
      }
    }
  },
  data() {
    return {
      curActiveName: this.activeName,
      itemHeight: undefined
    };
  },
  created() {
    this.$nextTick(() => {
      // console.info(
      //   this.$refs[`${this._uid}-el-collapse-ref`].$parent.$parent.$el
      //     .clientHeight
      // );
      this.itemHeight = `${this.$refs[`${this._uid}-el-collapse-ref`].$parent.$parent.$el.clientHeight - 2}px`;
      // console.info(this.$refs[`${this._uid}-el-collapse-ref`].$children);
      // this.$refs[`${this._uid}-el-collapse-ref`].$children[0].$el.style.height = 300;
    });
  },
  render(h) {
    const collapseItemList = [];
    for (let i = 0, len = this.$slots.default.length; i < len; i++) {
      const slotNode = this.$slots.default[i];
      // slotNode.elm.style.height = '500px';
      const collapseItem = h(
        'el-collapse-item',
        {
          // style: { height: this.itemHeight },
          props: {
            ...slotNode.data.attrs
          }
        },
        [h('div', { style: { height: this.itemHeight } }, [slotNode])]
      );
      collapseItemList.push(collapseItem);
    }
    return h(
      'el-collapse',
      {
        ref: `${this._uid}-el-collapse-ref`,
        class: 'base-collapse',
        props: {
          value: this.curActiveName,
          accordion: true
        },
        on: {
          // change: val => {
          //   this.$emit('change', val); // 只是改变 this.curActiveName 的值无法触发 change 事件
          // },
          input: val => {
            this.curActiveName = val + '';
            this.$emit('changeActiveName', val + '');
          }
        }
      },
      collapseItemList
    );
  }
};
export default BaseViewCollapse;
