/**
 * @desc 对话框
 */
import Vue from 'vue';
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _keys from 'lodash/keys';
import _has from 'lodash/has';
import _get from 'lodash/get';
import _concat from 'lodash/concat';
/**
 * @typedef {Object} options - 选项配置对象
 * @property {Object} component - 组件对象
 * @property {Object} container - html 节点容器
 */

/**
 * @param {options} options - 选项配置
 * @example
 * mounted(){
 *   this.dialogInstance = this.$baseDialog({component: Detail,container: this.$el,title: '添加',slotNode: {}});
 * },
 * methods: {
 *   onOpenBaseDialog() {
 *     this.dialogInstance.open();
 *   }
 * }
 */

const BaseDialog = function (options = {}) {
  const that = this;
  const optionsKey = _keys(options);
  const VueModal = Vue.extend({
    provide: function () {
      return {
        getBaseDialog: () => {
          return this;
        }
      };
    },
    router: that.$router,
    store: that.$store,
    props: optionsKey,
    render(h) {
      let customClass = 'base-el-dialog';
      if (
        _has(this.$props, 'customClass') ||
        _has(this.$props, 'custom-class')
      ) {
        customClass +=
          ' ' +
          _get(this.$props, 'customClass', '') +
          ' ' +
          _get(this.$props, 'custom-class', '');
      }
      let contentNode = h();
      if (_has(options.component, 'render')) {
        contentNode = h(options.component);
      } else if (_has(options.component(), 'el')) {
        const detailOption = options.component();
        contentNode = h(detailOption.el, _omit(detailOption, ['el']), [
          _get(detailOption, 'text')
        ]); // ref 对象无法获取
      } else {
        contentNode = options.component();
      }
      return h(
        'el-dialog',
        {
          class: {
            'base-dialog__wrapper': true,
            [options.ctCls]: options.ctCls
          },
          props: _assign(
            {
              destroyOnClose: true,
              title: '详情',
              visible: this.visible,
              customClass
            },
            _omit(this.$props, ['listeners', 'customClass']),
            {}
          ),
          on: {
            open: () => {
              if (_has(options, 'listeners.open')) {
                options.listeners.open();
              }
            },
            opened: () => {
              if (_has(options, 'listeners.opened')) {
                options.listeners.opened();
              }
            },
            close: () => {
              this.visible = false;
              if (_has(options, 'listeners.close')) {
                options.listeners.close();
              }
            },
            closed: () => {
              if (options.isDestroy) {
                this.$destroy();
                if (_has(this, '$el')) {
                  this.$el.remove();
                }
              }
              if (_has(options, 'listeners.closed')) {
                options.listeners.closed();
              }
            }
          }
        },
        [
          contentNode,
          h('template', { slot: 'title' }, this.appendTitle()),
          h('template', { slot: 'footer' }, this.appendFooter())
        ]
      );
    }
  });
  const instance = new VueModal({
    propsData: options,
    data() {
      return {
        visible: false
      };
    },
    created() {
      this.$nextTick(() => {
        document.body.appendChild(instance.$mount().$el);
      });
    },
    methods: {
      // 打开
      open(event) {
        setTimeout(() => {
          this.visible = true;
        }, 0);
      },
      // 关闭
      close(event) {
        setTimeout(() => {
          this.visible = false;
        }, 0);
      },
      // 关闭（销毁实例）
      closeDialog() {
        instance.$destroy();
        if (_has(instance, '$el')) {
          instance.$el.remove();
        }
      },
      // Dialog 标题区的内容
      appendTitle() {
        return _has(this.$props, 'slotNode.title')
          ? [this.$props.slotNode.title(this.$createElement)]
          : [];
      },
      // Dialog 按钮操作区的内容
      appendFooter() {
        const buttonsVNode = [];
        for (
          let i = 0, len = _get(options, 'buttons', []).length;
          i < len;
          i++
        ) {
          const option = options.buttons[i];
          buttonsVNode.push(
            that.$createElement(
              'el-button',
              {
                props: _get(option, 'props', function () {
                  return {};
                })(),
                on: option.on
              },
              [option.text]
            )
          );
        }
        return _has(this.$props, 'slotNode.footer')
          ? _concat(
            [this.$props.slotNode.footer(this.$createElement)],
            buttonsVNode
          )
          : _concat([], buttonsVNode);
      }
    }
  });
  /* if (_has(options, 'container')) {
    options.container.appendChild(instance.$mount().$el);
  } */
  // document.body.appendChild(instance.$mount().$el);
  return instance;
};
export default BaseDialog;
