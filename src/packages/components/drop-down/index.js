/**
 * @desc Dropdown 下拉菜单
 */
import _assign from 'lodash/assign';
import _isNil from 'lodash/isNil';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import _has from 'lodash/has';

const BaseDropDown = {
  name: 'BaseDropDown',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String
    },
    options: {
      type: Array
    },
    cls: {
      type: String
    },
    // 自定义样式
    ctCls: {
      type: String
    },
    // 子项的样式 `el-dropdown-item`
    itemCtCls: {
      type: String
    },
    // 点击生成的悬浮面板样式名称
    dropdownMenuCls: {
      type: String
    }
  },
  methods: {
    /**
     * @desc 获取原生节点对象
     */
    getEl() {
      return this.$refs[`${this._uid}-base-drop-down`];
    },
    /**
     * @desc 手动隐藏下拉菜单
     */
    hide() {
      this.$refs[`${this._uid}-base-drop-down`].hide();
    },
    /**
     * @desc 创建 el-dropdown-item
     */
    createElDropdownItem() {
      const vNodes = [];
      if (!_isNil(this.options)) {
        for (let i = 0, len = this.options.length; i < len; i++) {
          const option = this.options[i];
          const vNode = _has(this.$scopedSlots, 'default')
            ? this.$scopedSlots.default(option)
            : this.$createElement(
              'el-dropdown-item',
              {
                class: { [this.itemCtCls]: this.itemCtCls },
                props: _omit(option, ['text', 'listeners']),
                nativeOn: _get(option, 'listeners', {})
              },
              [
                _has(option, 'render')
                  ? option.render.call(this.$parent, this.$createElement)
                  : option.text
              ]
            );
          vNodes.push(vNode);
        }
        if (_has(this.$slots, 'footer')) {
          vNodes.push(this.$slots.footer);
        }
      }
      return vNodes;
    }
  },
  render(h) {
    if (this.options.length === 0) {
      return _has(this.$slots, 'title')
        ? this.$slots.title
        : h('span', { style: 'cursor: pointer;' }, [this.title]);
    } else {
      return h(
        'el-dropdown',
        {
          ref: `${this._uid}-base-drop-down`,
          attrs: {
            id: this.$attrs.id
          },
          class: { 'base-drop-down': true, [this.cls]: this.cls },
          props: _assign({}, this.$attrs),
          on: this.$listeners
        },
        [
          h(
            'span',
            {
              class: { 'el-dropdown-link': true, [this.ctCls]: this.ctCls }
            },
            [
              _has(this.$slots, 'title') ? this.$slots.title : this.title,
              h('i', {
                class: _isNil(this.icon)
                  ? 'el-icon-arrow-down el-icon--right'
                  : this.icon
              })
            ]
          ),
          h(
            'el-dropdown-menu',
            {
              slot: 'dropdown',
              class: {
                'base-dropdown-menu': true,
                [this.dropdownMenuCls]: this.dropdownMenuCls
              }
            },
            this.createElDropdownItem()
          )
        ]
      );
    }
  }
};
export default BaseDropDown;
