/**
 * @desc label 普通文本标签组件
 */
import _isNil from 'lodash/isNil';
import _isEqual from 'lodash/isEqual';
import _set from 'lodash/set';
import _assign from 'lodash/assign';
import _has from 'lodash/has';

const BaseLabel = {
  name: 'BaseLabel',
  inheritAttrs: false,
  props: {
    labelStyle: {
      type: Object,
      default() {
        return { color: '#3F3F46', 'font-size': '12px' };
      }
    },
    labelClass: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    html: {
      type: String,
      default: ''
    },
    isDisplay: {
      type: Boolean,
      default: true
    },
    isRender: {
      type: Boolean,
      default: true
    },
    listeners: {
      type: Object,
      default() {
        return {};
      }
    },
    // 子项之间的边距值 10px
    spaceVal: {
      type: String,
      default: '5px'
    }
  },
  methods: {
    /**
     * @desc 在 Label 被点击时时触发
     * @event BaseLabel#_clickEvent
     * @param {*} event
     */
    _clickEvent(event) {
      if (
        _isEqual(_isNil(this.listeners), false) &&
        _has(this.listeners, 'click')
      ) {
        this.listeners.click(event);
        return;
      }
      this.$emit('click', event);
    }
  },
  render(h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h();
    }
    const style = _assign(
      { marginLeft: this.spaceVal, marginRight: this.spaceVal },
      this.labelStyle
    );
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none');
    }
    return h('span', {
      ref: `${this._uid}-el-label-ref`,
      style,
      attrs: this.$attrs,
      class: this.labelClass,
      domProps: {
        innerHTML: this.html.length === 0 ? this.text : this.html
      },
      on: {
        click: this._clickEvent
      }
    });
  }
};
export default BaseLabel;
