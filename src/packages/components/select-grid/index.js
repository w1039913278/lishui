/**
 * @desc Select 下拉 grid 选择器
 */
import _assign from 'lodash/assign';
import _includes from 'lodash/includes';
import _toNumber from 'lodash/toNumber';
import _has from 'lodash/has';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _isEmpty from 'lodash/isEmpty';

const BaseSelectGrid = {
  name: 'BaseSelectGrid',
  inheritAttrs: false,
  model: {
    prop: 'selectGridValue',
    event: 'selectGridChange'
  },
  props: {
    // 最多只能选择几个数量
    maxItem: {
      type: Number,
      default: 20
    },
    // 输入框宽度
    width: {
      type: Number,
      default: 160
    },
    // grid 面板宽度
    gridWidth: {
      type: Number,
      default: 490
    },
    // 传入默认选中值 ['',''] 需要默认选中时请结合 'defaultCheckedRows' 参数
    // 值的匹配必须和 'defaultCheckedRows'相同
    selectGridValue: {
      type: [String, Array],
      default() {
        return [];
      }
    },
    // 默认要勾选 grid 的节点 keys 必须是唯一值 id 的 value
    // [{name: '', id: ''}] name 和 id 对应 displayField 和 valueField
    defaultCheckedRows: {
      type: Array,
      default() {
        return [];
      }
    },
    // 搜索栏字段，如：searchField="name"
    searchField: {
      type: String
    },
    // Select 组件头部内容
    prefixLabel: {
      type: String
    },
    // 是否多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 显示字段
    displayField: {
      type: String,
      default: 'name'
    },
    // 真实值
    valueField: {
      type: String,
      default: 'id'
    },
    // 外部事件扩展 只有 'change' 选中值发生改变事件
    listeners: {
      type: Object,
      default() {
        return {};
      }
    },
    // 自定义样式名
    ctCls: {
      type: Object
    },
    // 是否显示
    isDisplay: {
      type: Boolean,
      default: true
    },
    // 是否渲染
    isRender: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    selectGridValue(val, oldVal) {
      if (!_isNil(val) && val.length === 0) {
        this.clear();
      } else {
        // 单选
        this.setSingleNode();
      }
    }
  },
  data() {
    return {
      gridUserRef: `${this._uid}-selectGrid`,
      elSelectRef: `${this._uid}-base-select-grid-ref`,
      popoverVisible: false,
      // 本地数据
      curSelectRowList: [],
      curSelectLabelList: [],
      curSelectValueList: [], // 复选
      curSelectRow: null,
      curSelectLabel: '', // 单选
      curSelectValue: '',
      // curDefaultCheckedRows: [...this.defaultCheckedRows],
      gridValue: [],
      options: [], // [{ value: '', label: '' }]
      searchInput: ''
    };
  },
  created() {},
  methods: {
    /**
     * @desc 获取 grid 对象
     */
    getGrid() {
      return this.$refs[this.gridUserRef];
    },
    /**
     * @desc 手动打开 grid 下拉面板
     */
    handOpenGrid() {
      setTimeout(() => {
        this.popoverVisible = true;
      }, 0);
    },
    /**
     * @desc 创建 el-popover
     */
    createPopover() {
      const vNode = [];
      const h = this.$createElement;
      vNode.push(
        h(
          'el-popover',
          {
            ref: `${this._uid}-base-select-grid-popover`,
            props: {
              popperClass: 'base-select-grid-el-popover',
              placement: 'bottom-start',
              // title: '标题',
              width: this.gridWidth,
              trigger: 'click',
              value: this.popoverVisible
              // content: 'hello'
            },
            on: {
              input: val => {
                this.popoverVisible = val;
              }
            }
          },
          [
            this.createGrid(),
            h(
              'div',
              { slot: 'reference', style: { height: '0px' }, ref: 'bbb' },
              // 'click 激活'
              []
            )
          ]
        )
      );
      return vNode;
    },
    /**
     * @desc 创建 el-select 节点
     */
    createSelect() {
      const h = this.$createElement;
      let prefixLabelVNode = h();
      // Select 组件头部内容
      if (this.prefixLabel) {
        prefixLabelVNode = h(
          'span',
          { style: { lineHeight: '32px' }, slot: 'prefix' },
          this.prefixLabel
        );
      }
      const vNode = h(
        'el-select',
        {
          ref: this.elSelectRef,
          style: {
            width: `${this.width}px` // 文本框控件宽度
          },
          attrs: {
            id: this.$attrs.id,
            autofocus: this.$attrs.autofocus,
            placeholder: this.$attrs.placeholder
          },
          props: _assign(
            {},
            {
              value: this.multiple
                ? this.curSelectValueList
                : this.curSelectValue,
              clearable: true, // 有清除按钮
              multiple: this.multiple, // 设置多选，value对应为数组
              'collapse-tags': true // 合并多选
            },
            this.$attrs
          ),
          on: {
            'hook:mounted': () => {
              this.selectInputHeight = this.$refs[
                this.elSelectRef
              ].$el.offsetHeight; // input 框的高度
            },
            clear: () => {
              this.clear();
              this.$emit('selectGridChange', this.multiple ? [] : '');
              this.change([]);
              this.$emit('clear', this.multiple ? [] : '');
              this.setSelectPanel2InputOffsetTop();
            },
            'remove-tag': tag => {
              console.info('tag', tag);
              const index = _findIndex(
                this.curSelectValueList,
                value => value === tag
              );
              const optionIndex = _findIndex(
                this.options,
                item => item[this.valueField] === tag
              );
              if (index !== -1) {
                this.curSelectRowList.splice(index, 1);
                this.curSelectLabelList.splice(index, 1);
                this.curSelectValueList.splice(index, 1);
              }
              if (optionIndex !== -1) {
                this.options.splice(optionIndex, 1);
              }
              this.$emit('selectGridChange', this.curSelectValueList);
              this.change(this.curSelectRowList);
              this.$emit('remove-tag', this.multiple ? [] : '');
              this.setSelectPanel2InputOffsetTop();
              this.$refs[this.gridUserRef].selectRows([
                { field: this.valueField, value: tag }
              ]);
            }
          },
          nativeOn: {
            click: event => {
              if (
                !_has(this.$attrs, 'disabled') ||
                (_has(this.$attrs, 'disabled') &&
                  this.$attrs.disabled === false)
              ) {
                this.$refs[this.elSelectRef].blur();
                this.$refs.bbb.click(); // 如果是 el-button ，那么自动触发 click 事件 `this.$refs.bbb.$el.click();`
                event.stopPropagation();
                event.preventDefault();
                return false;
              }
            }
          }
        },
        [
          prefixLabelVNode,
          this.createOptions(),
          h(
            'div',
            {
              class: 'base-select-grid-down-empty',
              slot: 'empty',
              style: { display: 'none' }
            },
            []
          )
        ]
      );
      return vNode;
    },
    /**
     * @desc 创建下拉 grid 控件
     */
    createGrid() {
      const h = this.$createElement;
      let searchNode = h();
      if (!_isNil(this.searchField) && !_has(this.$slots, 'search')) {
        searchNode = this.createSearchBar();
      }
      if (_has(this.$slots, 'search')) {
        searchNode = this.$slots.search;
      }
      return h(
        'base-grid',
        {
          class: 'base-grid-panel-content-cls',
          ref: this.gridUserRef,
          attrs: {},
          props: _assign(
            {
              api: this.$attrs.api,
              // 初始化查询参数
              queryParams: this.$attrs.queryParams,
              columns: this.$attrs.columns,
              selectMode: this.multiple,
              isReloadGrid: true,
              isSelectedFirstRow: false,
              loadFilter: this.$attrs.loadFilter,
              tableAttributes: {
                size: 'mini',
                border: true
              },
              paginationAttributes: {
                layout: 'prev, pager, next, slot, ->, total',
                pageSize: 10,
                pageSizes: [5, 10, 15, 20]
              }
            },
            this.$attrs
          ),
          on: {
            'row-click': (row, column, event) => {
              // 单选，没有复选框
              if (!this.multiple) {
                this.curSelectLabel = row[this.displayField];
                this.curSelectValue = row[this.valueField];
                this.curSelectRow = row;
                this.$emit('selectGridChange', row[this.valueField]);
              }
              event.stopPropagation(); // js 阻止事件冒泡
            },
            select: (selection, row) => {
              // 当用户手动勾选数据行的 Checkbox 时触发的事件
              const values = _assign([], this.selectGridValue);
              const displayLabels = _assign([], this.curSelectLabelList);
              for (let i = 0, length = selection.length; i < length; i++) {
                if (!_includes(values, selection[i][this.valueField])) {
                  values.push(selection[i][this.valueField]);
                  displayLabels.push(selection[i][this.displayField]);
                }
              }
              if (_includes(this.selectGridValue, row[this.valueField])) {
                // 取消选中
                const index = this.selectGridValue.findIndex(
                  val => val === row[this.valueField]
                );
                if (index !== -1) {
                  values.splice(index, 1);
                  displayLabels.splice(index, 1);
                }
              }
              const selectRow = _find(this.curSelectRowList, o => {
                return _get(o, this.valueField) === row[this.valueField];
              });
              if (_isNil(selectRow)) {
                this.curSelectRowList.push(row);
              }
              this.curSelectLabelList = displayLabels;
              this.curSelectValueList = values;
              const option = _find(this.options, o => {
                return _get(o, this.valueField) === row[this.valueField];
              });
              if (_isNil(option)) {
                this.options.push({
                  [this.displayField]: row[this.displayField],
                  [this.valueField]: row[this.valueField]
                });
              }
              this.$emit('selectGridChange', values);
              this.setSelectPanel2InputOffsetTop();
            },
            'select-all': selection => {
              // 当用户手动勾选全选 Checkbox 时触发的事件
              const values = [];
              const displayLabels = [];
              for (let i = 0, length = selection.length; i < length; i++) {
                values.push(selection[i][this.valueField]);
                displayLabels.push(selection[i][this.displayField]);
                const option = _find(this.options, o => {
                  return _get(o, this.valueField) === selection[i][this.valueField];
                });
                const selectRow = _find(this.curSelectRowList, o => {
                  return _get(o, this.valueField) === selection[i][this.valueField];
                });
                if (_isNil(option)) {
                  this.options.push({
                    [this.displayField]: selection[i][this.displayField],
                    [this.valueField]: selection[i][this.valueField]
                  });
                }
                if (_isNil(selectRow)) {
                  this.curSelectRowList.push(selection[i]);
                }
              }
              this.curSelectLabelList = displayLabels;
              this.curSelectValueList = values;
              this.$emit('selectGridChange', values);
              this.setSelectPanel2InputOffsetTop();
            },
            onLoadSuccess: this.afterDataLoadHandler
          }
        },
        [h('template', { slot: 'search' }, [searchNode])]
      );
    },
    /**
     * @desc 创建搜索栏
     */
    createSearchBar() {
      const h = this.$createElement;
      const VNode = this.$createElement(
        'div',
        { class: 'base-select-grid__search-box' },
        [
          h(
            'el-input',
            {
              attrs: { placeholder: '请输入内容', maxlength: '40' },
              props: {
                value: this.searchInput,
                'show-word-limit': true,
                clearable: true
              },
              on: {
                input: val => {
                  this.searchInput = val;
                }
              }
            },
            []
          ),
          h(
            'el-button',
            {
              props: { type: 'primary' },
              on: {
                click: event => {
                  let params = { [this.searchField]: '' };
                  if (this.searchInput.length > 0) {
                    params = { [this.searchField]: this.searchInput };
                  }
                  this.getGrid().setQueryParams(params);
                  this.getGrid().reloadGrid();
                }
              }
            },
            ['搜索']
          )
        ]
      );
      return VNode;
    },
    /**
     * @desc 创建 el-option 节点
     */
    createOptions() {
      const h = this.$createElement;
      const vNode = this.options.map((option, index) => {
        return h('el-option', {
          style: {
            /* width: `${this.gridWidth}px`,
            height: 'auto',
            'max-height': `${this.gridHeight}px`,
            'background-color': this.backgroundColor,
            padding: '0px',
            overflow: 'auto', */
            display: 'absolute',
            top: '0px',
            left: '0px',
            height: '0px',
            'z-index': '-100'
            // display: 'none'
          },
          props: {
            key: option[this.valueField],
            label: option[this.displayField],
            value: option[this.valueField]
          },
          on: {
            'hook:mounted': () => {}
          }
        });
      });
      return vNode;
    },
    /**
     * @desc 设置单选-选中效果
     */
    setSingleNode() {},
    afterDataLoadHandler(data) {
      // 翻页时如果当前页有要选中的行那么设置选中效果
      setTimeout(() => {
        const selectRows = [];
        for (let i = 0, length = this.selectGridValue.length; i < length; i++) {
          selectRows.push({
            field: this.valueField,
            value: this.selectGridValue[i]
          });
          const defaultCheckedRow = _find(this.defaultCheckedRows, o => _get(o, this.valueField) === this.selectGridValue[i]);
          if (_isNil(_find(this.curSelectValueList, o => o === this.selectGridValue[i]))) {
            this.curSelectValueList.push(this.selectGridValue[i]);
            this.curSelectLabelList = _get(defaultCheckedRow, this.displayField);
          }
          if (!_isNil(defaultCheckedRow)) {
            if (_isEmpty(this.options)) {
              this.options.push({
                [this.displayField]: _get(defaultCheckedRow, this.displayField),
                [this.valueField]: _get(defaultCheckedRow, this.valueField)
              });
            } else {
              const option = _find(this.options, o => {
                return _get(o, this.valueField) === _get(defaultCheckedRow, this.valueField);
              });
              if (_isNil(option)) {
                this.options.push({
                  [this.displayField]: _get(defaultCheckedRow, this.displayField),
                  [this.valueField]: _get(defaultCheckedRow, this.valueField)
                });
              }
            }
          }
        }
        this.$refs[this.gridUserRef].selectRows(selectRows);
      }, 0);
    },
    /**
     * @desc 计算下拉面板和 input 框之间的高度差值
     */
    setSelectPanel2InputOffsetTop() {
      setTimeout(() => {
        const popoverEl = this.$refs[`${this._uid}-base-select-grid-popover`]
          .$el;
        if (!_isNil(popoverEl) && !_isNil(popoverEl.childNodes)) {
          const selectInputHeight = this.$refs[this.elSelectRef].$el
            .clientHeight; // input 框的高度
          const oldTopNum = this.$refs[
            this.gridUserRef
          ].$el.parentNode.style.top.replace('px', '');
          if (selectInputHeight > this.selectInputHeight) {
            const dValue = selectInputHeight - this.selectInputHeight; // 差值
            this.$refs[
              this.gridUserRef
            ].$el.parentNode.style.top = `${_toNumber(oldTopNum) +
              _toNumber(dValue)}px`;
          } else if (selectInputHeight <= this.selectInputHeight) {
            const dValue = this.selectInputHeight - selectInputHeight;
            if (dValue !== 0) {
              this.$refs[
                this.gridUserRef
              ].$el.parentNode.style.top = `${_toNumber(oldTopNum) -
                _toNumber(dValue)}px`;
            }
          }
          this.selectInputHeight = selectInputHeight;
        }
      }, 100);
    },
    /**
     * @desc 清空
     */
    clear: function () {
      if (this.multiple) {
        // 取消选中的行
        for (let i = 0, len = this.curSelectValueList.length; i < len; i++) {
          this.$refs[this.gridUserRef].selectRows([
            { field: this.valueField, value: this.curSelectValueList[i] }
          ]);
        }
      } else {
        // 单选-取消选中的行
        this.$refs[this.gridUserRef].selectRow(this.curSelectRow);
      }
      this.curSelectRowList = [];
      this.curSelectLabelList = [];
      this.curSelectValueList = [];
      this.curSelectRow = null;
      this.curSelectLabel = '';
      this.curSelectValue = '';
      // this.curDefaultCheckedRows = [];
      this.gridValue = [];
      this.options = [];
    },
    /**
     * @desc 自定义change事件
     * @param {Array|String} val
     */
    change(val) {
      'change' in this.listeners && this.listeners.change(val);
    }
  },
  render(h) {
    return h(
      'div',
      {
        ref: `${this._uid}-base-grid-panel`,
        style: { width: `${this.width}px` },
        class: { 'base-select-grid': true, [this.ctCls]: this.ctCls }
      },
      [this.createSelect(), this.createPopover()]
    );
  }
};
export default BaseSelectGrid;
