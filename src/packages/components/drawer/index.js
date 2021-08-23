/**
 * @desc 抽屉
 */
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _keys from 'lodash/keys';
import _has from 'lodash/has';
import _isNil from 'lodash/isNil';

const BaseDrawer = function (options = {}) {
  const that = this;
  const optionsKey = _keys(options);
  const VueModal = Vue.extend({
    provide: function () {
      return {
        getDrawer: this
      };
    },
    router: that.$router,
    store: that.$store,
    props: optionsKey,
    render(h) {
      return h(
        'el-drawer',
        {
          class: { 'base-drawer': true, [options.ctCls]: options.ctCls },
          props: _assign(
            {
              destroyOnClose: true,
              visible: this.visible,
              direction: 'rtl',
              title: this.curTitle
            },
            _omit(this.$props, ['listeners', 'title']),
            {}
          ),
          ref: `${this._uid}-base-drawer`,
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
              if (_has(options, 'listeners.closed')) {
                options.listeners.closed();
              }
              if (!_isNil(this.isDestroy) && this.isDestroy) {
                this.$destroy();
                if (_has(this, '$el')) {
                  this.$el.remove();
                }
              }
            }
          }
        },
        [
          _has(options.component, 'render')
            ? h(options.component)
            : options.component,
          h('template', { slot: 'title' }, this.appendTitle())
        ]
      );
    }
  });
  const instance = new VueModal({
    propsData: options,
    data() {
      return {
        visible: false,
        curTitle: _get(options, 'title', '详情')
      };
    },
    created() {
      this.$nextTick(() => {
        document.body.appendChild(instance.$mount().$el);
      });
    },
    methods: {
      /**
       * @desc 设置标题
       * @param {String} title - 标题
       */
      setTitle(title) {
        this.curTitle = title;
      },
      // 打开
      open(event) {
        setTimeout(() => {
          this.visible = true;
        }, 0);
      },
      // 关闭（隐藏-未销毁实例）
      close(event) {
        // this.visible = false;
        setTimeout(() => {
          this.closeDrawer();
        }, 0);
      },
      // 关闭（销毁实例）
      closeDrawer() {
        this.$refs[`${this._uid}-base-drawer`].closeDrawer();
      },
      // Drawer 标题区的内容
      appendTitle() {
        return _has(this.$props, 'slotNode.title')
          ? [this.$props.slotNode.title(this.$createElement)]
          : [];
      }
    }
  });
  /* if (_has(options, 'container') && !_isNil(options.container)) {
    options.container.appendChild(instance.$mount().$el);
  } */
  return instance;
};
export default BaseDrawer;
