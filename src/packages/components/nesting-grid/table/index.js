/**
 * Table 表格组件
 */
import BaseGridTable from '../../grid/table/index.js';
import _isNil from 'lodash/isNil';
import _filter from 'lodash/filter';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _map from 'lodash/map';

const BaseNestingGridTable = {
  name: 'BaseNestingGridTable',
  extends: BaseGridTable,
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
    // 行数据的 Key （嵌套表格时需要提供）
    rowKeyField: {
      type: String,
      default: 'id'
    },
    // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // 展开的列值
    expends: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    this.checkedStructure = []; // 选中行的结构
    this.nestingGrid = null; // 嵌套在插槽内部的 grid 对象
    return {};
  },
  created() {},
  methods: {
    /**
     * @desc 当用户手动勾选数据行的 Checkbox 时触发的事件
     * @param {Array} selection - 所有勾选的行
     * @param {object} row - 当前选中行
     */
    _select(selection, row) {
      if (_has(this.getBaseGrid.$listeners, 'select')) {
        this.getBaseGrid.$emit('select', selection, row);
      }
      // 全选或全取消选中嵌套的 grid
      if (_isNil(this.nestingGrid)) {
        this.$emit('grid-select', selection, row, []);
        return;
      }
      if (
        !_isNil(this.nestingGrid.getElTable()) &&
        this.nestingGrid.correlationRowId === _get(row, this.rowKeyField)
      ) {
        const checkedState = _find(
          selection,
          o => _get(o, this.rowKeyField) === _get(row, this.rowKeyField)
        ); // 选中状态
        if (_isNil(checkedState)) {
          // 嵌套 grid 全部取消选中
          this.nestingGrid.clearSelection();
          this.$emit('grid-select', selection, row, []);
        } else {
          this.nestingGrid.getElTable().toggleAllSelection();
          this.$emit('grid-select', selection, row, this.nestingGrid.getData());
        }
      } else {
        this.$emit('grid-select', selection, row, []);
      }
    },
    /**
     * @desc 当用户手动勾选全选 Checkbox 时触发的事件
     * @param {Array} selection - 当前页所有的选中行
     */
    _selectAll(selection) {
      if (_has(this.getBaseGrid.$listeners, 'select-all')) {
        this.getBaseGrid.$emit('select-all', selection);
      }
      this.$emit(
        'grid-select-all',
        selection,
        _isNil(this.nestingGrid.getElTable()) ? [] : this.nestingGrid.getData(),
        _isNil(this.nestingGrid.getElTable())
          ? undefined
          : this.nestingGrid.correlationRowId
      );
      if (_isNil(this.nestingGrid)) {
        return;
      }
      if (!_isEmpty(selection)) {
        /* console.info('1', this.nestingGrid.getSelections());
        if (!_isEmpty(this.nestingGrid.getSelections())) {
          this.nestingGrid.getElTable().toggleAllSelection();
        } else {
          !_isNil(this.nestingGrid.getElTable()) && this.nestingGrid.getElTable().toggleAllSelection();
        } */
        !_isNil(this.nestingGrid.getElTable()) &&
          this.nestingGrid.getElTable().toggleAllSelection();
      } else {
        !_isNil(this.nestingGrid.getElTable()) &&
          this.nestingGrid.clearSelection();
      }
    },
    /**
     * @desc 当用户对某一行展开或者关闭的时候会触发该事件
     */
    _expandChange(row, expandedRows) {
      const rowIsExpanded = _find(
        expandedRows,
        o => o[this.rowKeyField] === row[this.rowKeyField]
      ); // 展开的行
      if (rowIsExpanded) {
        const closeExpandRows = _filter(
          expandedRows,
          o => o[this.rowKeyField] !== row[this.rowKeyField]
        );
        for (let i = 0, len = closeExpandRows.length; i < len; i++) {
          this.getEl().toggleRowExpansion(closeExpandRows[i]);
        }
      }
      /* this.$off('afterOnLoadSuccess');
      this.$on('afterOnLoadSuccess', data => {
        this.$emit('grid-expand-change', row, expandedRows, data);
      }); */
    },
    // 展开列
    nestingColumn() {
      const h = this.$createElement;
      const nestGrid = props => {
        if (_isNil(this.getBaseGrid.$scopedSlots.nestGridScope)) {
          return h();
        }
        const vNode = this.getBaseGrid.$scopedSlots.nestGridScope(
          _get(props, 'row', {})
        );
        setTimeout(
          nestingNode => {
            const innerGrid = vNode[0].componentInstance;
            innerGrid.$off('onLoadSuccess');
            innerGrid.getElTable().$off('select'); // 操作父 row 的选中会导致嵌套组件重绘需要解绑 select 事件
            innerGrid.$on('onLoadSuccess', data => {
              this.$nextTick(() => {
                this.$emit('afterOnLoadSuccess', data);
                this.nestingGrid = vNode[0].componentInstance;
                this.nestingGrid.correlationRowId = _get(
                  props,
                  `row.${this.rowKeyField}`
                );
                if (
                  !_isNil(this.getBaseGrid.getData()) &&
                  !_isEmpty(this.getBaseGrid.getData())
                ) {
                  const outGridFirstRow = this.getBaseGrid.getData()[0];
                  let outGridCheckedRow = this.getBaseGrid.getSelections();
                  // 切换展开父 grid 行时是否选中嵌套 gird
                  let outRowChecked = _find(
                    outGridCheckedRow,
                    o =>
                      _get(o, this.rowKeyField) ===
                      _get(props, `row.${this.rowKeyField}`)
                  );
                  // 第一次是否要选中
                  if (
                    this.isSelectedFirstRow &&
                    outGridFirstRow[this.rowKeyField] ===
                      _get(props, `row.${this.rowKeyField}`)
                  ) {
                    const gridValueObj = _find(
                      this.getBaseGrid.getCurGridValue(),
                      o =>
                        _get(o, this.rowKeyField) ===
                        _get(outGridFirstRow, this.rowKeyField)
                    );
                    if (_isNil(gridValueObj)) {
                      const nestingGrid = nestingNode[0].componentInstance; // 嵌套 grid
                      nestingGrid.getElTable().toggleAllSelection(); // 初始化时的全选效果
                      setTimeout(() => {
                        this.$emit(
                          'grid-expand-change',
                          outRowChecked,
                          [outRowChecked],
                          data
                        );
                      }, 0);
                      this.getBaseGrid.setCurIsSelectedFirstRow(false); // 设置第一次已经选中完成，后续操作就要重置成 false
                      return;
                    }
                    this.getBaseGrid.selectRows([
                      {
                        field: this.rowKeyField,
                        value: _get(outGridFirstRow, this.rowKeyField)
                      }
                    ]);
                    outGridCheckedRow = this.getBaseGrid.getSelections();
                    outRowChecked = _find(
                      outGridCheckedRow,
                      o =>
                        _get(o, this.rowKeyField) ===
                        _get(props, `row.${this.rowKeyField}`)
                    );
                    this.getBaseGrid.setCurIsSelectedFirstRow(false);
                  }
                  if (!_isNil(outRowChecked)) {
                    // 外部行的选中状态
                    const curGridValue = this.getBaseGrid.getCurGridValue();
                    const curValue = _find(
                      curGridValue,
                      o =>
                        _get(o, this.rowKeyField) ===
                        this.nestingGrid.correlationRowId
                    );
                    if (!_isNil(curValue) && _isEmpty(curValue.children)) {
                      this.nestingGrid.getElTable().toggleAllSelection();
                      setTimeout(() => {
                        this.$emit(
                          'grid-expand-change',
                          outRowChecked,
                          [outRowChecked],
                          data
                        );
                      }, 0);
                    } else {
                      const childValues = _get(curValue, 'children');
                      !_isEmpty(childValues) &&
                        this.nestingGrid.selectRows(
                          _map(childValues, o => ({
                            field: this.rowKeyField,
                            value: _get(o, this.rowKeyField)
                          }))
                        );
                    }
                  }
                }
              });
            });
            innerGrid.getElTable().$on('select', (selections, row) => {
              this.$emit(
                'nestingChange',
                selections,
                row,
                this.nestingGrid.correlationRowId
              ); // 触发 grid v-model 事件
              const outGridSelections = this.getBaseGrid.getSelections();
              if (_isEmpty(selections) && !_isEmpty(outGridSelections)) {
                // 嵌套的 grid 在全部取消选中后将外部 grid 的选中行取消选中效果
                const mateOutGridSelectRow = _find(
                  outGridSelections,
                  o => o[this.rowKeyField] === this.nestingGrid.correlationRowId
                );
                if (!_isNil(mateOutGridSelectRow)) {
                  this.getBaseGrid.selectRows([
                    {
                      field: this.rowKeyField,
                      value: this.nestingGrid.correlationRowId
                    }
                  ]);
                }
              }
              if (
                selections.length === this.nestingGrid.getData().length ||
                this.checkStrictly
              ) {
                // 嵌套的 grid 在全部选中后将外部 grid 的选中行选中效果
                // 选中嵌套 grid 时是否需要关联选中父节点
                const mateOutGridSelectRow = _find(
                  outGridSelections,
                  o => o[this.rowKeyField] === this.nestingGrid.correlationRowId
                );
                if (_isNil(mateOutGridSelectRow)) {
                  this.getBaseGrid.selectRows([
                    {
                      field: this.rowKeyField,
                      value: this.nestingGrid.correlationRowId
                    }
                  ]);
                }
              }
            });
          },
          0,
          vNode
        );
        return vNode;
      };
      return h('el-table-column', {
        props: { type: 'expand' },
        scopedSlots: {
          default: props => {
            return h(
              'div',
              {
                key: `${this._uid}-${_get(props.row, this.rowKeyField)}`,
                style: { height: `${this.nestGridHeight}px` },
                class: { 'base-nesting-table-box': true }
              },
              [nestGrid(props)]
            );
          }
        }
      });
    }
  },
  render(h) {
    return h(
      'el-table',
      {
        ref: `${this._uid}-base-table`,
        class: _get(this.$props, 'ctCls', {}),
        props: _assign({ border: true }, this.tableAttributes, {
          height: _get(this.tableAttributes, 'height', '100%'), // 实现固定表头的表格，数据可滚动
          highlightCurrentRow: this._highlightCurrentRow,
          data: this.tableData,
          'expand-row-keys': this.expends
        }),
        on: _assign(
          {},
          _omit(this.getBaseGrid.$listeners, [
            'selection-change',
            'row-dblclick',
            'row-click'
          ]),
          {
            'selection-change': this._selectionChangeEvent,
            'row-dblclick': this._rowDblclickEvent,
            'row-click': this._rowClickEvent,
            select: this._select,
            'select-all': this._selectAll,
            'expand-change': this._expandChange
          }
        ),
        directives: [
          {
            name: 'loading',
            value: this.loading
            // 'v-loading': true
          }
        ]
      },
      [
        this.nestingColumn(),
        this.multipleSelectNode(),
        this.indexColumn(),
        this.tableColumnNodes(),
        h('template', { slot: 'append' }, this.appendNode())
      ]
    );
  }
};
export default BaseNestingGridTable;
