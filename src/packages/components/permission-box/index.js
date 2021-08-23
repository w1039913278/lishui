/**
 * @desc 权限盒子容器组件
 */
import _isArray from 'lodash/isArray';
import _findIndex from 'lodash/findIndex';
import _findLastIndex from 'lodash/findLastIndex';
import _assign from 'lodash/assign';
import _get from 'lodash/get';
import _has from 'lodash/has';

const BasePermissionBox = {
  name: 'BasePermissionBox',
  inheritAttrs: false,
  props: {
    // 控件类型
    element: {
      type: String,
      default: 'el-button'
    },
    // 按钮 code
    code: {
      type: String
    }
  },
  data() {
    return {
      /**
       * @desc 模块中的按钮组
       * @examples
       * [{name: '添加', code: 'add'},{name: '删除', code: 'delete'}]
       */
      buttons: [],
      disabled: false
    };
  },
  created() {
    // 监听路由变化
    this.$watch(
      '$route',
      function (val, oldVal) {
        const index = _findLastIndex(val.matched, item => {
          return _has(item, 'meta.buttons');
        });
        this.buttons = _get(val.matched[index], 'meta.buttons');
      },
      { immediate: true }
    );
  },
  methods: {},
  render(h) {
    // 权限判断
    if (
      this.buttons &&
      _isArray(this.buttons) &&
      this.code &&
      this.buttons.length > 0
    ) {
      const index = _findIndex(this.buttons, btn => _get(btn, 'code', btn.href) === this.code);
      if (index === -1) {
        return h();
      }
      if (_has(this.buttons[index], 'status')) {
        this.disabled = !_get(this.buttons[index], 'status', 0); // 1 启用 0 禁用
      }
      if (_has(this.buttons[index], 'flag')) {
        this.disabled = !_get(this.buttons[index], 'flag', 0);
      }
    }
    return h(
      this.element,
      {
        ref: `${this._uid}-permission-box-ref`,
        attrs: {
          id: this.$attrs.id
        },
        props: _assign({}, this.$attrs, { disabled: this.disabled }),
        on: this.$listeners
      },
      [this.$slots.default]
    );
  }
};

export default BasePermissionBox;
