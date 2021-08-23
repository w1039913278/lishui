/**
 * @desc nesting-grid 嵌套列表组件
 */
import BaseGrid from '../grid/index.js';
import BaseGridPagination from '../grid/pagination/index.js';
import BaseGridTable from './table/index.js';
import BaseGridSearch from '../grid/search/index.js';
import BaseTBar from '../grid/t-bar/index.js';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _omit from 'lodash/omit';
import _set from 'lodash/set';
import _assign from 'lodash/assign';
import _find from 'lodash/find';
import _isNil from 'lodash/isNil';
import _findIndex from 'lodash/findIndex';
import _isEmpty from 'lodash/isEmpty';

const BaseNestingGrid = {
  name: 'BaseNestingGrid',
  extends: BaseGrid,
  model: {
    prop: 'nestingValue',
    event: 'nestingChange'
  },
  props: {
    // 嵌套表格的内置高度
    nestGridHeight: {
      type: Number,
      default: 200
    },
    // 嵌套表格的 grid 参数
    nestGrid: {
      type: Object
    },
    // 行数据的 Key 字段名称（嵌套表格时需要提供），必须是唯一值
    rowKeyField: {
      type: String,
      default: 'id'
    },
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // 定义外部 v-model 值 [{id: 1, children: [1,2,3]},{id: 2, children: [a,b,c]}]
    nestingValue: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否打开第一个嵌套的 grid 面板
    isOpenNestingGridFirst: {
      type: Boolean,
      default: true
    }
  },
  data() {
    this.curGridValue = _assign([], this.nestingValue); // 同 gridValue
    return {
      curIsSelectedFirstRow: this.isSelectedFirstRow,
      expends: [] // 默认展开的行，配合列的 type="expand" 时使用
    };
  },
  created() { },
  methods: {
    getCurGridValue() {
      return this.curGridValue;
    },
    setCurIsSelectedFirstRow(state = true) {
      this.curIsSelectedFirstRow = state;
    },
    /**
     * @desc 在数据加载成功的时候触发
     * @param {Array} table
     * @method
     */
    onLoadSuccess(table) {
      this.$nextTick(() => {
        // 选中效果
        const rows = [];
        for (let i = 0, len = this.curGridValue.length; i < len; i++) {
          rows.push({
            field: this.rowKeyField,
            value: _get(this.curGridValue[i], this.rowKeyField)
          });
        }
        this.selectRows(rows);
        if (!_isEmpty(table)) {
          // console.log(table[0].id, _get(table[0], this.rowKeyField));
          this.expends = [_get(table[0], this.rowKeyField)]; // 展开第一行（也可以展开指定的行）
        }
      });
      this.$emit(this.events.onLoadSuccess, table);
    }
  },
  render(h) {
    // v-if
    if (!this.isRender) {
      return h();
    }
    const style = {};
    // v-show
    if (!this.isDisplay) {
      _set(style, 'display', 'none');
    }
    return h(
      'base-border-layout',
      {
        ref: `${this._uid}-base-nesting-grid`,
        style,
        class: _assign(
          { 'base-nesting-grid': true },
          _get(this.$props, 'ctCls', {})
        ),
        props: {
          northHeight: 'auto',
          westWidth: '0px',
          eastWidth: '0px',
          southHeight: this.isShowPagination ? '36px' : '0px',
          isPadding: false
        }
      },
      [
        h(
          'base-border-layout',
          {
            slot: 'north',
            props: {
              northHeight: 'auto',
              southHeight: 'auto',
              isPadding: false
            }
          },
          [
            h(
              BaseGridSearch,
              {
                slot: 'north',
                scopedSlots: {
                  searchScope: () => {
                    if (_has(this.$scopedSlots, 'searchScope')) {
                      return this.$scopedSlots.searchScope(this.currentRow);
                    }
                    return h();
                  }
                }
              },
              [h('template', { slot: 'default' }, this.$slots.search)]
            ),
            h(
              BaseTBar,
              {
                slot: 'south',
                scopedSlots: {
                  tBarScope: () => {
                    if (_has(this.$scopedSlots, 'tBarScope')) {
                      return this.$scopedSlots.tBarScope(this.currentRow);
                    }
                    return h();
                  }
                }
              },
              [h('template', { slot: 'default' }, this.$slots.tBar)]
            )
          ]
        ),
        h(
          BaseGridTable,
          {
            slot: 'center',
            props: {
              api: this.api,
              queryParams: this.queryParams,
              columns: this.columns,
              isReloadGrid: this.isReloadGrid,
              isSelectedFirstRow: this.curIsSelectedFirstRow,
              isShowIndex: this.isShowIndex,
              indexLabel: this.indexLabel,
              selectMode: this.selectMode,
              loadFilter: this.loadFilter,
              slotNode: this.tableAttributes.slotNode,
              tableAttributes: this.tableAttributes,
              options: this.options,
              nestGridHeight: this.nestGridHeight,
              nestGrid: this.nestGrid,
              rowKeyField: this.rowKeyField,
              checkStrictly: this.checkStrictly,
              expends: this.expends,
              pagingParams: this.pagingParams,
              isFixedIndex: this.isFixedIndex,
              isFixedSelection: this.isFixedSelection,
              columnTool: this.columnTool
            },
            on: {
              /**
               * @desc 当用户手动勾选数据行的 Checkbox 时触发的事件-自定义事件
               * @param {Array} selection - 选中的行集
               * @param {Object} row - 当前选中行
               * @param {Array} nestingGridSelection - 内部嵌套 grid 选中的行集
               */
              'grid-select': (
                selection = [],
                row = {},
                nestingGridSelection = []
              ) => {
                const state = _find(
                  selection,
                  o => _get(o, this.rowKeyField) === _get(row, this.rowKeyField)
                ); // 选中或取消的状态
                const outGridRowIndex = _findIndex(
                  this.curGridValue,
                  o => _get(o, this.rowKeyField) === _get(row, this.rowKeyField)
                );
                if (outGridRowIndex !== -1) {
                  this.curGridValue.splice(outGridRowIndex, 1);
                }
                if (_isNil(state)) {
                  //  取消
                } else {
                  // 选中
                  const parentRow = _set(
                    {},
                    this.rowKeyField,
                    _get(row, this.rowKeyField)
                  );
                  _set(
                    parentRow,
                    'children',
                    _assign([], nestingGridSelection)
                  );
                  this.curGridValue.push(parentRow);
                }
                this.$emit('nestingChange', this.curGridValue);
              },
              /**
               * @desc 全选/全不选
               * @param {Array} selection - 选中的行集-自定义事件
               */
              'grid-select-all': (
                selection = [],
                nestingGridSelection = [],
                parentRowId
              ) => {
                if (_isEmpty(selection)) {
                  // 取消
                  this.curGridValue = [];
                } else {
                  // 选中
                  for (let i = 0, len = selection.length; i < len; i++) {
                    const parentRow = _set(
                      {},
                      this.rowKeyField,
                      _get(selection[i], this.rowKeyField)
                    );
                    if (
                      !_isNil(parentRowId) &&
                      _get(selection[i], this.rowKeyField) === parentRowId
                    ) {
                      _set(
                        parentRow,
                        'children',
                        _assign([], nestingGridSelection)
                      );
                    } else {
                      _set(parentRow, 'children', []);
                    }
                    this.curGridValue.push(parentRow);
                  }
                }
                this.$emit('nestingChange', this.curGridValue);
              },
              /**
               * @desc 当用户对某一行展开或者关闭的时候会触发该事件
               * @param {Object} row - 当前选中行
               * @param {Array} expandedRows - 当前展开的行集
               * @param {Array} nestingGridData - 内部嵌套 grid 的数据行
               * @param {String|Number} parentRowId - 嵌套 grid 对应的外部行 this.rowKeyField 的值
               */
              'grid-expand-change': (
                row = {},
                expandedRows = [],
                nestingGridData = []
              ) => {
                const selectedRows = this.getSelections();
                const state = _find(
                  selectedRows,
                  o => _get(o, this.rowKeyField) === _get(row, this.rowKeyField)
                ); // 选中或取消的状态
                if (_isNil(state)) {
                  // 不选中
                } else {
                  // 选中
                  if (_isEmpty(this.curGridValue)) {
                    this.curGridValue.push({ [this.rowKeyField]: _get(row, this.rowKeyField), children: [] });
                  }
                  const curValue = _find(
                    this.curGridValue,
                    o =>
                      _get(o, this.rowKeyField) === _get(row, this.rowKeyField)
                  );
                  if (!_has(curValue, 'children')) {
                    this.$set(curValue, 'children', []); // 需要是响应式
                  }
                  if (
                    _has(curValue, 'children') &&
                    _isEmpty(curValue.children)
                  ) {
                    _set(curValue, 'children', _assign([], nestingGridData));
                  }
                  this.$emit('nestingChange', this.curGridValue);
                }
              },
              /**
               * @desc 内部嵌套 grid 选中行事件-自定义事件
               * @param {Array} selections - 选中的行集
               * @param {Object} row - 当前选中行
               * @param {String|Number} parentRowId - 嵌套 grid 对应的外部行 this.rowKeyField 的值
               */
              nestingChange: (selections = [], row = {}, parentRowId) => {
                const state = _find(
                  selections,
                  o => _get(o, this.rowKeyField) === _get(row, this.rowKeyField)
                ); // 选中或取消的状态
                const existObj = _find(
                  this.curGridValue,
                  o => _get(o, this.rowKeyField) === parentRowId
                );
                if (!_isNil(state)) {
                  // 选中
                  if (_isNil(existObj)) {
                    const parentRow = _set({}, this.rowKeyField, parentRowId);
                    _set(parentRow, 'children', _assign([], selections));
                    this.curGridValue.push(parentRow);
                  } else {
                    const existChildObj = _find(
                      existObj.children,
                      o =>
                        _get(o, this.rowKeyField) ===
                        _get(row, this.rowKeyField)
                    );
                    _isNil(existChildObj) &&
                      existObj.children.push(_assign({}, row));
                  }
                } else {
                  // 取消
                  if (_isEmpty(selections)) {
                    const outGridRowIndex = _findIndex(
                      this.curGridValue,
                      o => _get(o, this.rowKeyField) === parentRowId
                    );
                    outGridRowIndex !== -1 &&
                      this.curGridValue.splice(outGridRowIndex, 1);
                  } else {
                    const cancelSelectedRowIndex = _findIndex(
                      existObj.children,
                      o =>
                        _get(o, this.rowKeyField) ===
                        _get(row, this.rowKeyField)
                    );
                    if (cancelSelectedRowIndex !== -1) {
                      existObj.children.splice(cancelSelectedRowIndex, 1);
                    }
                  }
                }
                this.$emit('nestingChange', this.curGridValue);
              }
            }
          },
          []
        ),
        h(
          BaseGridPagination,
          {
            slot: 'south',
            props: {
              currentPage: this.currentPage,
              pageSize: this.pageSize,
              pagingItems: this.paginationAttributes.pagingItems,
              paginationAttributes: _omit(this.paginationAttributes, [
                'currentPage',
                'pageSize',
                'isShowPagination',
                'pagingItems'
              ]),
              total: this.total,
              isShowPagination: this.isShowPagination
            }
          },
          []
        )
      ]
    );
  }
};
export default BaseNestingGrid;
