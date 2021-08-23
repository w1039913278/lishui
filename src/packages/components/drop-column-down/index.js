/**
 * @desc Dropdown 下拉面板菜单
 */
import _assign from 'lodash/assign';
import _isNil from 'lodash/isNil';
import _has from 'lodash/has';
import _map from 'lodash/map';

const BaseDropColumnDown = {
  name: 'BaseDropColumnDown',
  inheritAttrs: false,
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 图标
    icon: {
      type: String
    },
    // 子项
    options: {
      type: Array
    }
  },
  data() {
    return {
      curHideOnClick: true // 是否在点击菜单项后隐藏菜单
    };
  },
  methods: {
    /**
     * @desc 创建 el-dropdown-item
     */
    createElDropdownItem() {
      const vNodes = [];
      if (!_isNil(this.options)) {
        for (let i = 0, len = this.options.length; i < len; i++) {
          const oOption = this.options[i];
          const oVOption = [];
          for (let n = 0, childLen = oOption.length; n < childLen; n++) {
            const oItem = oOption[n];
            const oChildItem = _map(oItem.list, row => {
              return this.$createElement(
                'div',
                {
                  on: {
                    click: event => {
                      if (_has(this.$listeners, 'click')) {
                        this.$listeners.click(
                          event,
                          JSON.parse(JSON.stringify(row))
                        );
                        setTimeout(() => {
                          if (
                            !_isNil(
                              this.$refs[
                                `${this._uid}-base-drop-column-down-title`
                              ]
                            )
                          ) {
                            this.$refs[
                              `${this._uid}-base-drop-column-down-title`
                            ].click(); // 点击节点后隐藏面板
                          }
                        }, 0);
                      }
                      if (
                        (this.$attrs.trigger === 'hover' ||
                          _isNil(this.$attrs.trigger)) &&
                        (_isNil(this.$attrs['hide-on-click']) ||
                          this.$attrs['hide-on-click'] === true)
                      ) {
                        this.$refs[
                          `${this._uid}-base-drop-column-down`
                        ].$children[0].$el.style.display = 'none';
                      }
                    }
                  }
                },
                [this.$createElement('i', { class: row.icon }), row.label]
              );
            });
            oVOption.push(
              this.$createElement('div', {}, [
                this.$createElement('div', { class: 'title' }, [oItem.title]),
                oChildItem
              ])
            );
          }
          const vColumn = this.$createElement(
            'div',
            { class: 'column' },
            oVOption
          );
          vNodes.push(vColumn);
        }
      }
      return this.$createElement(
        'div',
        {
          ref: `${this._uid}-base-drop-column-down`,
          class: 'base-drop-column-down-menu'
        },
        vNodes
      );
    }
  },
  render(h) {
    return h(
      'el-dropdown',
      {
        ref: `${this._uid}-base-drop-column-down`,
        attrs: {
          id: this.$attrs.id
        },
        class: { 'base-drop-column-down': true },
        props: _assign({}, this.$attrs),
        on: this.$listeners
      },
      [
        h(
          'span',
          {
            ref: `${this._uid}-base-drop-column-down-title`,
            class: 'el-dropdown-link'
          },
          [
            !_isNil(this.icon)
              ? h('i', { class: this.icon, style: { 'padding-right': '9px' } })
              : h(),
            this.title,
            h('i', { class: 'el-icon-arrow-down el-icon--right' })
          ]
        ),
        h('el-dropdown-menu', { slot: 'dropdown' }, [
          this.createElDropdownItem()
        ])
      ]
    );
  }
};
export default BaseDropColumnDown;
