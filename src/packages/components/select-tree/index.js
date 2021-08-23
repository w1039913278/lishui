/**
 * @desc select-tree 选择器
 */
import _assign from 'lodash/assign';
import _includes from 'lodash/includes';
import _findIndex from 'lodash/findIndex';
import _isNil from 'lodash/isNil';
import _toNumber from 'lodash/toNumber';
import _isEmpty from 'lodash/isEmpty';
import _has from 'lodash/has';
import _omit from 'lodash/omit';

const BaseSelectTree = {
  name: 'BaseSelectTree',
  inheritAttrs: false,
  model: {
    prop: 'selectTreeValue',
    event: 'selectTreeChange'
  },
  props: {
    // 传入默认选中值 ['',''] String 需要默认选中时请结合 'defaultCheckedKeys' 参数
    // 值的匹配必须和 'defaultCheckedKeys'相同
    value: {
      default() {
        return [];
      }
    },
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
    // tree面板宽度
    treeWidth: {
      type: Number,
      default: 200
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
    // 默认要勾选tree的节点keys 必须是唯一值id的value
    // 适用于数据源由外部传入，如果是远程获取必须在数据中增加'check'字段标明是否选中
    defaultCheckedKeys: {
      type: Array,
      default() {
        return [];
      }
    },
    // 定义外部 v-model 值，默认值 null 因为单选传入 String ，多选 array 并不确定
    selectTreeValue: {
      default() {
        return null;
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
    // 是否显示完整的路径（true 显示完整的路径，false 仅显示最后一级）
    showAllLevels: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selectTreeValue(val, oldVal) {
      if (!_isNil(val) && val.length === 0) {
        this.clear();
      } else {
        // 单选
        if (val !== this.curSelectValue) {
          this.setSingleNode();
        }
      }
    }
  },
  data() {
    this.popoverOffsetTop = 0; // 下拉面板的 offsetTop 偏差值
    this.selectInputHeight = 0; // select 控件对应的 input 框的高度
    return {
      placement: 'bottom-start',
      treeUserRef: `${this._uid}-selectTree`,
      popoverVisible: false,
      // 本地数据
      curSelectNodeList: [],
      curSelectLabelList: [],
      curSelectValueList: [], // 复选
      curSelectNode: null,
      curSelectLabel: '', // 单选
      curSelectValue: '',
      curDefaultCheckedKeys: [...this.defaultCheckedKeys],
      treeValue: [],
      options: [] // [{ value: '', label: '' }]
    };
  },
  created() {},
  methods: {
    /**
     * @desc 获取 tree 对象
     */
    getTree() {
      return this.$refs[this.treeUserRef];
    },
    /**
     * @desc 手动打开tree下拉面板
     */
    handOpenTree() {
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
            ref: `${this._uid}-base-select-tree-popover`,
            props: {
              popperClass: 'base-el-popover',
              placement: this.placement,
              // title: '标题',
              width: this.treeWidth,
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
            this.createTree(),
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
     * @desc 创建 el-tree 节点
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
      const style = { width: `${this.width}px` }; // 文本框控件宽度};
      const vNode = h(
        'el-select',
        {
          ref: `${this._uid}-base-select-tree-ref`,
          style,
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
                `${this._uid}-base-select-tree-ref`
              ].$el.offsetHeight; // input 框的高度
            },
            clear: () => {
              this.clear();
              this.$refs[this.treeUserRef].clearChecked();
              this.$emit('selectTreeChange', this.multiple ? [] : '');
              this.change([]);
              this.setSelectPanel2InputOffsetTop();
              this.$emit('clear', this.multiple ? [] : '');
            },
            'remove-tag': tag => {
              const index = _findIndex(
                this.curSelectValueList,
                value => value === tag
              );
              const optionIndex = _findIndex(
                this.options,
                item => item[this.valueField] === tag
              );
              if (index !== -1) {
                this.curSelectNodeList.splice(index, 1);
                this.curSelectLabelList.splice(index, 1);
                this.curSelectValueList.splice(index, 1);
              }
              if (optionIndex !== -1) {
                this.options.splice(optionIndex, 1);
              }
              this.$emit('selectTreeChange', this.curSelectValueList);
              this.change(this.curSelectNodeList);
              this.$refs[this.treeUserRef].setCheckedKeys(
                this.curSelectValueList
              );
              this.setSelectPanel2InputOffsetTop();
              this.$emit('remove-tag', this.multiple ? [] : '');
            }
          },
          nativeOn: {
            click: event => {
              const selectTree = this.$refs[
                `${this._uid}-base-select-tree-ref`
              ];
              if (
                !_isNil(selectTree) &&
                !_isNil(selectTree.$el) &&
                !_isNil(document.body.clientHeight)
              ) {
                if (
                  document.body.clientHeight -
                    selectTree.$el.parentNode.offsetTop <
                  470
                ) {
                  this.placement = 'top-start';
                }
              }
              if (
                !_has(this.$attrs, 'disabled') ||
                (_has(this.$attrs, 'disabled') &&
                  this.$attrs.disabled === false)
              ) {
                this.$refs[`${this._uid}-base-select-tree-ref`].blur();
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
              class: 'base-select-tree-down-empty',
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
     * @desc 创建 el-option 节点
     */
    createOptions() {
      const h = this.$createElement;
      const vNode = this.options.map((option, index) => {
        return h('el-option', {
          style: {
            /* width: `${this.treeWidth}px`,
            height: 'auto',
            'max-height': `${this.treeHeight}px`,
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
     * @desc 创建下拉 tree 控件
     */
    createTree() {
      const h = this.$createElement;
      const that = this;
      return h('base-tree', {
        style: {
          height: '100%',
          overflow: 'auto',
          'font-weight': 'normal'
        },
        class: 'select-tree-panel',
        ref: this.treeUserRef,
        attrs: {
          defaultCheckedKeys: this.curDefaultCheckedKeys,
          checkStrictly: this.multiple, // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
          showCheckbox: this.multiple, // 出现复选框
          ..._omit(this.$attrs, [
            'defaultCheckedKeys',
            'checkStrictly',
            'showCheckbox'
          ])
        },
        props: _assign(
          {},
          {
            displayField: this.displayField,
            valueField: this.valueField,
            treeValue: this.treeValue, // v-model value 属性
            listeners: {
              nodeClick: (record, node, tree) => {
                // 使 input 失去焦点，并隐藏下拉框
                this.$refs[`${this._uid}-base-select-tree-ref`].blur();
                const eventName = _has(this.$listeners, 'nodeClick')
                  ? 'nodeClick'
                  : 'node-click';
                this.$emit(eventName, record, node, tree);
              },
              checkChange: (record, checked, childCheckNodes) => {
                if (
                  this.curSelectValueList.includes(record[this.valueField]) &&
                  !checked
                ) {
                  const index = this.curSelectValueList.findIndex(
                    value => value === record[this.valueField]
                  );
                  const optionIndex = this.options.findIndex(
                    item => item[this.valueField] === record[this.valueField]
                  );
                  if (index !== -1) {
                    this.curSelectValueList.splice(index, 1);
                    this.curSelectLabelList.splice(index, 1);
                    this.curSelectNodeList.splice(index, 1);
                  }
                  if (optionIndex) {
                    this.options.splice(optionIndex, 1);
                  }
                }
              }
            }
          },
          this.$attrs
        ),
        on: {
          // 数据加载完成
          afterLoadStore(data) {
            // 默认选中
            if (!_isNil(that.selectTreeValue)) {
              if (that.multiple) {
                that.curDefaultCheckedKeys.push(...that.selectTreeValue);
              } else {
                // that.curDefaultCheckedKeys.push(that.selectTreeValue); // 单选不用设置，因为单选其实没有选中的效果
              }
              setTimeout(() => {
                if (that.multiple) {
                  const nodes = that.$refs[that.treeUserRef].getCheckedNodes();
                  if (!_isEmpty(nodes)) {
                    for (let i = 0, len = nodes.length; i < len; i++) {
                      const treeNode = that.getTree()
                        .getTree()
                        .getNode(nodes[i][that.valueField]);
                      const levelStr = that.getTree().getNodeParentLevel(treeNode);
                      that.options.push({
                        [that.valueField]: nodes[i][that.valueField],
                        [that.displayField]: that.showAllLevels ? levelStr : nodes[i][that.displayField]
                      });
                      if (that.multiple) {
                        that.curSelectValueList.push(nodes[i][that.valueField]);
                      }
                    }
                    if (!that.multiple) {
                      that.curSelectValue = nodes[0][that.valueField];
                    }
                  }
                } else {
                  // 单选
                  that.setSingleNode();
                }
              }, 0);
            }
          },
          check: (node, treeCheckedNode) => {
            // 多选-点击复选框
            this.$refs.bbb.click(); // 防止下拉树面板在点击后隐藏
            this.setSelectPanel2InputOffsetTop();
            if (this.multiple) {
              const checkedKeys = this.$refs[this.treeUserRef]
                .getTree()
                .getCheckedKeys();
              // 操作最大的选中数量
              if (checkedKeys.length > this.maxItem) {
                this.$refs[this.treeUserRef].setCheckedKeys(
                  this.curSelectValueList
                );
                return;
              }
              if (!_includes(checkedKeys, node[this.valueField])) {
                this.change(this.curSelectNodeList);
                return;
              }
              this.curSelectNodeList.push(node);
              this.curSelectLabelList.push(node[this.displayField]);
              this.curSelectValueList.push(node[this.valueField]);
              const treeNode = this.getTree()
                .getTree()
                .getNode(node[this.valueField]);
              const levelStr = this.getTree().getNodeParentLevel(treeNode);
              this.options.push({
                [this.displayField]: this.showAllLevels
                  ? levelStr
                  : node[this.displayField],
                [this.valueField]: node[this.valueField]
              });
              this.$emit('selectTreeChange', this.curSelectValueList);
              this.change(this.curSelectNodeList);
            }
          },
          // v-model input事件
          currentChange: (record = {}, curNode = {}) => {
            // 单选
            if (!this.multiple) {
              if (
                _has(this.$attrs, 'isSelectedLastNode') &&
                this.$attrs.isSelectedLastNode
              ) {
                const treeProps = this.$refs[this.treeUserRef].props;
                // 设置需要选中最里面的节点
                if (
                  _has(record, treeProps.children) &&
                  !_isNil(_get(record, treeProps.children)) &&
                  _get(record, treeProps.children).length !== 0
                ) {
                  return;
                }
              }
              if (
                _has(this.$attrs, 'selectedLevel') &&
                this.$attrs.selectedLevel &&
                curNode.level !== this.$attrs.selectedLevel
              ) {
                return;
              }
              const node = this.getTree()
                .getTree()
                .getNode(record[this.valueField]);
              const levelStr = this.getTree().getNodeParentLevel(node);
              this.options = [];
              this.options.push({
                [this.displayField]: this.showAllLevels
                  ? levelStr
                  : record[this.displayField],
                [this.valueField]: record[this.valueField]
              });
              this.curSelectValue = record[this.valueField];
              this.curSelectLabel = record[this.displayField];
              this.$emit('selectTreeChange', this.curSelectValue);
              this.change({
                [this.displayField]: record[this.displayField],
                [this.valueField]: record[this.valueField]
              });
            }
          },
          // 清空数据事件
          clearData: () => {
            this.clear();
            this.$refs[this.treeUserRef].clearChecked();
            this.$emit('selectTreeChange', this.multiple ? [] : '');
            this.change([]);
            this.setSelectPanel2InputOffsetTop();
            this.$emit('clear', this.multiple ? [] : '');
          }
        }
      });
    },
    /**
     * @desc 设置单选-选中效果（单选其实在树上面没有选中效果）
     */
    setSingleNode() {
      const that = this;
      if (
        !_isNil(that.$refs[that.treeUserRef]) &&
        !_isNil(that.$refs[that.treeUserRef].getTree()) &&
        !_isNil(that.selectTreeValue)
      ) {
        const checkedNode = that.$refs[that.treeUserRef]
          .getTree()
          .getNode(that.selectTreeValue);
        if (!_isNil(checkedNode)) {
          const record = checkedNode;
          this.options = [];
          this.options.push({
            [that.displayField]: this.showAllLevels
              ? this.getTree().getNodeParentLevel(checkedNode)
              : record.data[that.displayField],
            [that.valueField]: record.data[that.valueField]
          });
          that.curSelectValue = record.data[that.valueField];
          that.curSelectLabel = record.data[that.displayField];
          that.$emit('selectTreeChange', that.curSelectValue);
          that.change({
            [that.displayField]: record.data[that.displayField],
            [that.valueField]: record.data[that.valueField]
          });
        }
      }
    },
    /**
     * @desc 计算下拉面板和input框之间的高度差值
     */
    setSelectPanel2InputOffsetTop() {
      setTimeout(() => {
        const popoverEl = this.$refs[`${this._uid}-base-select-tree-popover`]
          .$el;
        if (!_isNil(popoverEl) && !_isNil(popoverEl.childNodes)) {
          const selectInputHeight = this.$refs[
            `${this._uid}-base-select-tree-ref`
          ].$el.clientHeight; // input 框的高度
          // console.info('abc ', this.$refs[`${this._uid}-base-select-tree-ref`]);
          const oldTopNum = this.$refs[
            this.treeUserRef
          ].$el.parentNode.style.top.replace('px', '');
          // console.info(this.selectInputHeight, selectInputHeight);
          if (selectInputHeight > this.selectInputHeight) {
            const dValue = selectInputHeight - this.selectInputHeight; // 差值
            this.$refs[
              this.treeUserRef
            ].$el.parentNode.style.top = `${_toNumber(oldTopNum) +
              _toNumber(dValue)}px`;
          } else if (selectInputHeight <= this.selectInputHeight) {
            const dValue = this.selectInputHeight - selectInputHeight;
            // console.info('================', dValue);
            if (dValue !== 0) {
              this.$refs[
                this.treeUserRef
              ].$el.parentNode.style.top = `${_toNumber(oldTopNum) -
                _toNumber(dValue)}px`;
            }
          }
          this.selectInputHeight = selectInputHeight;
        }
      }, 100);
      // console.info('abc ', this.$refs.bbb.offsetTop);
      /* console.info(this.$refs[this.treeUserRef].$el.parentNode.style.top.replace('px', ''));
        console.info('33333333 ', this.$refs[`${this._uid}-base-select-tree-popover`].$el.childNodes[0].offsetTop);
        console.info('4444 ', this.$refs[this.treeUserRef].$el.parentNode); */
    },
    /**
     * @desc 清空
     */
    clear: function () {
      this.curSelectNodeList = [];
      this.curSelectLabelList = [];
      this.curSelectValueList = [];
      this.curSelectNode = null;
      this.curSelectLabel = '';
      this.curSelectValue = '';
      this.curDefaultCheckedKeys = [];
      this.treeValue = [];
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
        ref: `${this._uid}-base-select-panel`,
        style: { width: `${this.width}px` },
        class: { 'base-select-tree': true, [this.ctCls]: this.ctCls }
      },
      [this.createSelect(), this.createPopover()]
    );
  }
};
export default BaseSelectTree;
