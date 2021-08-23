// @ts-nocheck
/**
 * Select 可编辑下拉选择器
 */
import _assign from 'lodash/assign';
import _isNil from 'lodash/isNil';

const BaseSelectInput = {
  name: 'BaseSelectInput',
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'selectInputChange'
  },
  props: {
    width: {
      type: String,
      default: 'auto'
    },
    emptyText: {
      type: String,
      default: '请输入内容'
    },
    // 访问的后台地址
    api: {
      type: String
    },
    // 初始化查询参数
    queryParams: {
      type: Object,
      default() {
        return {};
      }
    },
    // 本地数据源
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    // 数据过滤器
    loadFilter: {
      type: Function
    },
    // 默认显示的value值
    value: {
      type: [String, Number]
    },
    // 显示字段
    displayField: {
      type: String,
      default: 'name'
    },
    size: {
      type: String,
      default: 'medium'
    },
    ctStyle: {
      type: Object
    },
    ctCls: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isDisplay: {
      type: Boolean,
      default: true
    },
    isRender: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      vValue: this.value,
      curOptions: _assign([], this.options)
    };
  },
  mounted() {
    if (this.api) {
      this.initLoadStore();
    }
  },
  methods: {
    initLoadStore() {
      this.$api[this.api](this.queryParams)
        .then(resData => {
          if (!_isNil(this.loadFilter)) {
            resData = this.loadFilter(resData.data);
          }
          this.curOptions = resData.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    createInputComponent() {
      const inputComponent = this.$createElement('el-input', {
        class: 'base-select-input-edit',
        style: { width: this.width },
        attrs: {
          readonly: this.readonly,
          placeholder: this.emptyText,
          size: this.size
        },
        props: {
          value: this.vValue,
          disabled: this.disabled
        },
        nativeOn: {
          click: event => {
            if (!this.disabled) {
              this.$refs['combo-box-select'].$el.click();
              event.target.focus();
            }
          }
        },
        on: {
          input: value => {
            // v-model
            this.vValue = value;
            this.$emit('selectInputChange', this.vValue);
          },
          change: val => {
            // this.$emit('selectInputChange', val);
          }
        },
        ref: 'combo-box-input'
      });
      return inputComponent;
    },
    createSelectComponent() {
      const elOptions = [];
      if (_isNil(this.curOptions)) {
        return;
      }
      for (let i = 0, length = this.curOptions.length; i < length; i++) {
        const option = this.curOptions[i];
        const elOption = this.$createElement('el-option', {
          props: {
            label: option[this.displayField],
            value: option[this.displayField]
          }
        });
        elOptions.push(elOption);
      }
      const selectComponent = this.$createElement(
        'el-select',
        {
          class: 'base-select-input-select',
          style: {
            width: this.width
          },
          props: {
            value: this.vValue,
            multiple: false
          },
          on: {
            input: val => {
              this.vValue = val;
              // this.$refs['combo-box-input'].setTextValue(val);
            },
            change: val => {
              this.vValue = val;
              this.$emit('selectInputChange', val);
            }
          },
          ref: 'combo-box-select'
        },
        elOptions
      );
      return selectComponent;
    }
  },
  render(h) {
    // v-if
    if (!this.isRender) {
      return h();
    }
    // const style = { ...this.$props.ctStyle, width: this.width }
    const style = _assign({}, this.$props.ctStyle, { width: this.width });
    // v-show
    if (!this.isDisplay) {
      style.display = 'none';
    }
    return h(
      'div',
      {
        class: _assign({}, this.$props.ctCls || {}, {
          'base-select-input': true
        }),
        style: _assign({}, this.$props.ctStyle || {}, {
          width: this.width
        })
      },
      [this.createInputComponent(), this.createSelectComponent()] //
    );
  }
};
export default BaseSelectInput;
