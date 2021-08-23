/**
 * @desc grid 列表组件
 */
import BaseGridPagination from './pagination/index.js';
import BaseGridTable from './table/index.js';
import BaseGridSearch from './search/index.js';
import BaseTBar from './t-bar/index.js';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _omit from 'lodash/omit';
import _set from 'lodash/set';
import _assign from 'lodash/assign';
import _isNil from 'lodash/isNil';

const BaseGrid = {
  name: 'BaseGrid',
  provide() {
    return {
      getBaseGrid: this
    };
  },
  components: {
    BaseGridPagination,
    BaseGridTable,
    BaseGridSearch,
    BaseTBar
  },
  props: {
    // api接口
    api: {
      type: String,
      required: true
    },
    // 初始查询条件
    queryParams: {
      type: Object,
      default() {
        return {};
      }
    },
    // 自定义样式
    ctCls: {
      type: Object,
      default() {
        return {};
      }
    },
    // 列 el-table-column 的配置
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否多选
    selectMode: {
      type: Boolean,
      default: false
    },
    // 是否显示index下标列
    isShowIndex: {
      type: Boolean,
      default: false
    },
    // 下标行的名称
    indexLabel: {
      type: String,
      default: '序号'
    },
    // 默认选择第一行
    isSelectedFirstRow: {
      type: Boolean,
      default: false
    },
    // 第一次载入时是否自动刷新列表数据
    isReloadGrid: {
      type: Boolean,
      default: true
    },
    // 边框
    border: {
      type: Boolean,
      default: false
    },
    // 是否显示分页数量选择器
    isShowPagination: {
      type: Boolean,
      default: true
    },
    // v-if
    isRender: {
      type: Boolean,
      default: true
    },
    // v-show
    isDisplay: {
      type: Boolean,
      default: true
    },
    // Table Attributes
    tableAttributes: {
      type: Object,
      default() {
        return {};
      }
    },
    // Pagination Attributes
    paginationAttributes: {
      type: Object,
      default() {
        return {};
      }
    },
    // 过滤返回数据（该函数带一个参数'data'用来指向源数据）
    loadFilter: {
      type: Function,
      default: data => data
    },
    // 静态数据（api设置为空）
    options: {
      type: Object
    },
    // 自定义当前分页参数 {page: 'page',size: 'size',total: 'data.total',data: 'data.records',pageNum: 'current',pageSize: 'size'}
    pagingParams: {
      type: Object
    },
    // 是否冻结下标列
    isFixedIndex: {
      type: Boolean,
      default: false
    },
    // 是否冻结多选框列
    isFixedSelection: {
      type: Boolean,
      default: false
    },
    // 插槽操作列配置
    columnTool: {
      type: Object,
      default() {
        return {
          label: '操作'
          // fixed: 'right'
        };
      }
    }
  },
  data() {
    this.layout = 'border'; // 布局
    this.baseGridTable = null; // table 组件实例
    this.paginationInstance = null; // Pagination 分页 组件实例
    this.events = {
      onLoadSuccess: 'onLoadSuccess', // 在数据加载成功的时候触发
      onLoadError: 'onLoadError', // 在载入远程数据产生错误的时候触发
      onBeforeLoad: 'onBeforeLoad', // 在载入请求数据之前触发，如果返回 false 可终止载入数据操作（验证参数）
      onChangeRowEvent: 'onChangeRowEvent' // 选中行事件-单选
    };
    return {
      currentRow: {}, // 当前选中行
      contextMenuRow: {}, // 右键点击行
      contextMenuColumn: {}, // 右键点击列
      currentPage: _get(
        this.paginationAttributes,
        'currentPage',
        _get(
          this['$base-global-options'],
          'grid.paginationAttributes.currentPage',
          ''
        )
      ), // 当前页数
      pageSize: _get(
        this.paginationAttributes,
        'pageSize',
        _get(
          this['$base-global-options'],
          'grid.paginationAttributes.pageSize',
          ''
        )
      ), // 每页显示条目个数
      total: 0 // 总条目数
    };
  },
  watch: {
    paginationAttributes: {
      handler(val) {
        if (_has(val, 'pageSize')) {
          this.pageSize = val.pageSize;
        }
        if (_has(val, 'currentPage')) {
          this.currentPage = val.currentPage;
        }
      },
      immediate: true
    }
  },
  created() {
    if (_isNil(this.currentPage)) {
      this.currentPage = 1;
    }
    if (_isNil(this.pageSize)) {
      this.pageSize = 30;
    }
  },
  methods: {
    /**
     * @desc 设置表格的总数量
     * @param {Number} num=0 - 数量
     */
    setTotal(num = 0) {
      this.total = num;
    },
    /**
     * @desc 设置 baseGridTable 组件实例
     * @method
     * @param {Object} tableInstance - 组件实例对象 this
     */
    setTableEl(tableInstance) {
      this.baseGridTable = tableInstance;
    },
    /**
     * @desc 设置查询参数
     * @param {Object} params - 查询对象参数
     */
    setQueryParams(params = {}) {
      this.getTable().setQueryParams(params);
    },
    /**
     * @desc 获取 BaseGridTable 组件实例
     * @method
     * @returns {Object} BaseGridTable 组件的实例对象 this
     */
    getTable() {
      return this.baseGridTable;
    },
    /**
     * @desc 获取 el-table 组件实例（用于直接操作 element-ui的el-table组件的方法）
     * @method
     * @returns {Object} el-table组件
     */
    getElTable() {
      return this.baseGridTable.getEl();
    },
    /**
     * @desc 获取查询总数
     * @method
     * @returns {Number} 总数
     */
    getTotal() {
      return this.total;
    },
    /**
     * @desc 获取总页数
     * @method
     * @returns {Number} 总页数
     */
    getTotalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    /**
     * @desc 返回加载完毕后的数据
     * @method
     * @returns {Array}
     */
    getData() {
      return this.getTable().tableData;
    },
    /**
     * @desc 返回单选选中的行-单选
     * @method
     * @returns {Object}
     */
    getSelected() {
      return this.getTable().getSelectedRow();
    },
    /**
     * @desc 返回复选时所有被选中的行-多选
     * @method
     * @returns {Array}
     */
    getSelections() {
      return this.getTable().getSelectedRows();
    },
    /**
     * @desc 选中一行-单选
     * @method
     */
    selectRow(row = {}) {
      this.getTable().setCurrentRow(row);
    },
    /**
     * @desc 选择多行
     * @method
     */
    selectRows(rows = []) {
      this.getTable().toggleRowSelection(rows);
    },
    /**
     * @desc 选择当前页中所有的行
     */
    selectAll() {
      this.getTable().toggleAllSelection();
    },
    /**
     * @desc 用于多选表格，清空用户的选择
     * @method
     */
    clearSelection() {
      this.getElTable().clearSelection();
    },
    /**
     * @desc 刷新 table 组件，会回到第一页
     * @method
     */
    reloadGrid() {
      this.currentPage = 1;
      this.getTable().loadData();
    },
    /**
     * @desc 刷新 table 组件，保留在当前页
     * @method
     */
    loadGrid() {
      this.getTable().loadData();
    },
    /** Pagination 分页组件 */
    /**
     * @desc 设置 BaseGridPagination 组件实例
     * @method
     * @param {Object} paginationInstance - 组件实例对象 this
     */
    setPaginationEl(paginationInstance) {
      this.paginationInstance = paginationInstance;
    },
    /**
     * @desc pageSize 改变时会触发
     * @param {number} pageSize - 每页条数
     * @method
     */
    onSizeChange(pageSize) {
      this.pageSize = pageSize;
      if (this.currentPage === 1 || this.currentPage * pageSize <= this.total) {
        this.loadGrid();
      } else {
        this.currentPage = 1;
        this.loadGrid();
      }
    },
    /**
     * @desc currentPage 改变时会触发
     * @param {number} page - 当前页
     * @method
     */
    onCurrentChange(page) {
      this.currentPage = page;
      this.loadGrid();
    },
    /**
     * @desc 在数据加载成功的时候触发
     * @param {Array} table
     * @method
     */
    onLoadSuccess(table) {
      this.$emit(this.events.onLoadSuccess, table);
    },
    /**
     * @desc 在载入远程数据产生错误的时候触发
     * @method
     */
    onLoadError() {
      this.$emit(this.events.onLoadError);
    },
    /**
     * @desc 更新选中行
     * @param {Object} row - 选中行（如果是复选也只会是当前点击的这行）
     * @method
     */
    updateCurrentRow(row) {
      this.currentRow = row;
      this.$emit(this.events.onChangeRowEvent, row);
    },
    /**
     * @desc 更新右键选中记录 行和列
     * @param {Object} row - 选中行
     * @param {Object} column - 选中列
     * @method
     */
    updateContextMenuSelectedRecord(row = {}, column = {}) {
      this.contextMenuRow = row;
      this.contextMenuColumn = column;
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
        ref: `${this._uid}-base-grid`,
        style,
        class: _assign({ 'base-grid': true }, _get(this.$props, 'ctCls', {})),
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
              isSelectedFirstRow: this.isSelectedFirstRow,
              isShowIndex: this.isShowIndex,
              indexLabel: this.indexLabel,
              selectMode: this.selectMode,
              loadFilter: this.loadFilter,
              slotNode: this.tableAttributes.slotNode,
              tableAttributes: this.tableAttributes,
              options: this.options,
              pagingParams: this.pagingParams,
              isFixedIndex: this.isFixedIndex,
              isFixedSelection: this.isFixedSelection,
              columnTool: this.columnTool
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
export default BaseGrid;
