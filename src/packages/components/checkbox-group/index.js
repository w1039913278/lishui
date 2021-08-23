/**
 * @desc 多选框组
 */
import _isEqual from 'lodash/isEqual';
import _set from 'lodash/set';
import _assign from 'lodash/assign';
import _isNil from 'lodash/isNil';
import _get from 'lodash/get';
import _has from 'lodash/has';

const BaseCheckboxGroup = {
  name: 'BaseCheckboxGroup',
  inheritAttrs: false,
  model: {
    prop: 'checkBoxGroupValue',
    event: 'checkBoxGroupChange'
  },
  props: {
    api: {
      type: String,
      default: ''
    },
    queryParams: {
      type: Object,
      default() {
        return {};
      }
    },
    // 静态数据
    options: {
      type: Array
    },
    // 定义外部 v-model 值，默认值 null 因为单选传入 String ，多选 array 并不确定
    checkBoxGroupValue: {
      type: Array,
      default() {
        return [];
      }
    },
    // 自定义样式名
    ctCls: {
      type: String
    },
    // 外部事件扩展 只有 'change' 选中值发生改变事件
    listeners: {
      type: Object,
      default() {
        return {};
      }
    },
    // 显示字段
    displayField: {
      type: String,
      default: 'name'
    },
    // 值字段
    valueField: {
      type: String,
      default: 'id'
    },
    isRender: {
      type: Boolean,
      default: true
    },
    isDisplay: {
      type: Boolean,
      default: true
    },
    loadFilter: {
      type: Function,
      default: null
    },
    // [Checkbox Attributes](https://element.eleme.cn/#/zh-CN/component/checkbox#checkbox-attributes)
    checkboxAttributes: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    this.curQueryParams = {};
    return {
      curValue: this.checkBoxGroupValue,
      curOptions: this.options || []
    };
  },
  watch: {
    checkBoxGroupValue(val, oldVal) {
      this.curValue = val;
    },
    options(val, oldVal) {
      this.curOptions = val;
    }
  },
  mounted() {
    if (_isNil(this.options)) {
      this.loadData();
    }
  },
  methods: {
    /**
     * @desc 加载数据
     * @method
     */
    loadData() {
      if (!this.api) {
        return;
      }
      const params = _assign({}, this.queryParams, this.curQueryParams);
      this.$api[this.api]({ params }).then(response => {
        this.tableData = _isNil(this.loadFilter)
          ? response
          : this.loadFilter(response);
        this.curOptions = _get(
          response,
          _get(this['$base-global-options'], 'checkboxGroup.data', 'data')
        );
      });
    },
    /**
     * @desc 设置查询参数
     * @param {Object} params - 查询对象参数
     */
    setQueryParams(params = {}) {
      this.curQueryParams = {};
      return Object.assign(this.curQueryParams, params);
    },
    /**
     * @desc 获取数据集，如果本地数据可以直接在外部使用 options 参数的入参变量
     */
    getStore() {
      return this.curOptions;
    },
    /**
     * @desc 刷新
     */
    reload() {
      this.loadData();
    },
    /**
     * @desc 创建 el-checkbox
     */
    createElCheckbox() {
      const VNode = [];
      for (let i = 0, len = this.curOptions.length; i < len; i++) {
        const option = this.curOptions[i];
        const node = this.$createElement(
          'el-checkbox',
          {
            props: _assign(
              {},
              {
                label: _get(option, this.valueField),
                key: _get(option, this.valueField)
              },
              this.checkboxAttributes
            )
          },
          [_get(option, this.displayField)]
        );
        VNode.push(node);
      }
      return VNode;
    }
  },
  render(h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h();
    }
    const style = {};
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none');
    }
    return h(
      'el-checkbox-group',
      {
        ref: `${this._uid}-el-checkbox-group`,
        class: { 'base-checkbox-group': true, [this.ctCls]: this.ctCls },
        style,
        props: _assign(
          {},
          {
            value: this.curValue
          },
          this.$attrs
        ),
        on: {
          change: value => {
            if (
              _isEqual(_isNil(this.listeners), false) &&
              _has(this.listeners, 'change')
            ) {
              this.listeners.change(value);
              return;
            }
            this.$emit('change', value);
          },
          // v-model
          input: val => {
            this.curValue = val;
            this.$emit('checkBoxGroupChange', val);
          }
        }
      },
      this.createElCheckbox()
    );
  }
};
export default BaseCheckboxGroup;
