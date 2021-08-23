/**
 * @desc 列表内容自动定时滚动 grid（不建议数据量比较大，因为滚动 grid 不分页）
 */
import _map from 'lodash/map';
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';
import _slice from 'lodash/slice';
import _sum from 'lodash/sum';

const BaseRollGrid = {
  name: 'BaseRollGrid',
  inheritAttrs: false,
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
    // 列 el-table-column 的配置
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // 走马灯的高度 （100px）
    height: {
      type: Number
    },
    // 自定义样式
    ctCls: {
      type: Object,
      default() {
        return {};
      }
    },
    // 多少数据分一组
    groupDataNum: {
      type: Number,
      default: 3
    },
    // 定时器间隔时间（毫秒）
    waitTime: {
      type: Number,
      default: 1500
    },
    // 是否自动播放
    autoplay: {
      type: Boolean,
      default: true
    },
    // 是否为斑马纹 table （必须在 groupDataNum > 1 时才能起效果）
    stripe: {
      type: Boolean,
      default: false
    },
    // 表格边框
    border: {
      type: Boolean,
      default: false
    }
  },
  data() {
    this.loading = null;
    this.timer = null; // 定时器
    // this.tableHeader = 0;
    return {
      tableData: [],
      appendHeight: 0,
      tableHeader: 0
    };
  },
  watch: {
    tableHeader(val, oldVal) {
      if (!_isNil(this.height)) {
        this.appendHeight = this.height - val;
      }
    },
    autoplay(val, oldVal) {
      if (val !== oldVal && val && !_isEmpty(this.tableData)) {
        this.closeTimer();
        // 重置
        const sChildTableList = this.$refs[
          `${this._uid}-base-roll-grid-append-box`
        ].children;
        for (let i = 0, len = sChildTableList.length; i < len; i++) {
          this.$refs[`child-roll-el-table-${i}`].$el.style.transform =
            'translateY(0px) scale(1)';
        }
        // 启动定时器
        setTimeout(() => {
          this.timer = setInterval(this.rollHandler, this.waitTime);
        }, 0);
      }
      if (val !== oldVal && !val && !_isNil(this.timer)) {
        this.closeTimer();
      }
    },
    tableData(val, oldVal) {
      this.$nextTick(function () {
        // 此处可以监听子 table 已经渲染完成并挂载到了父级元素上
        if (_isNil(this.timer) && !_isEmpty(val) && this.autoplay) {
          this.timer = setInterval(this.rollHandler, this.waitTime);
          /* this.timer = setTimeout(this.rollHandler, 1000);
          setTimeout(this.rollHandler, 3000);
          setTimeout(this.rollHandler, 5000);
          setTimeout(this.rollHandler, 7000);
          setTimeout(this.rollHandler, 9000);
          setTimeout(this.rollHandler, 12000); */
        }
      });
    }
  },
  created() {
    setTimeout(this.init, 0);
  },
  mounted() {
    // el-table__header
    this.$nextTick(() => {
      this.tableHeader = this.$refs[
        `${this._uid}-base-roll-grid`
      ].$children[4].$el.clientHeight; // 外层表格的表头高度
    });
  },
  beforeDestroy() {
    // 移除定时器
    this.closeTimer();
  },
  methods: {
    // 关闭和清除定时器
    closeTimer() {
      if (!_isNil(this.timer)) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    /**
     * @desc 定时滚动
     */
    rollHandler() {
      const sChildTableList = this.$refs[
        `${this._uid}-base-roll-grid-append-box`
      ].children;
      //  setTimeout setInterval
      let firstHeight = 0;
      let firstTableHeight = 0;
      let e = 0;
      for (let n = 0, len1 = sChildTableList.length; n < len1; n++) {
        const myIndex = this.$refs[`child-roll-el-table-${n}`].myIndex;
        if (myIndex === 0) {
          e = n;
          firstTableHeight = this.$refs[`child-roll-el-table-${n}`]
            .firstTableHeight;
          break;
        }
      }
      for (let i = 0, len = sChildTableList.length; i < len; i++) {
        const curRefTable = this.$refs[`child-roll-el-table-${i}`];
        const childTableHeight = curRefTable.$el.clientHeight;
        i === 0 && firstTableHeight === 0 && (firstHeight = childTableHeight);
        const myIndex = curRefTable.myIndex;
        if (myIndex === 0) {
          const sliceList = _map(
            _slice(sChildTableList, i + 1),
            item => item.clientHeight
          );
          const scrollTopVal = _sum(sliceList);
          curRefTable.$el.style.transform = `translateY(${scrollTopVal}px) scale(1)`; // 549 343
          curRefTable.myIndex = len - 1;
          curRefTable.myTranslateY = scrollTopVal;
          e = i + 1;
        } else {
          const d = curRefTable.myTranslateY;
          if (d === 0) {
            curRefTable.$el.style.transform = `translateY(${-firstHeight -
              firstTableHeight}px) scale(1)`;
            curRefTable.myTranslateY = -firstHeight - firstTableHeight;
          } else {
            curRefTable.$el.style.transform = `translateY(${d -
              firstTableHeight}px) scale(1)`; // 526-183=343
            curRefTable.myTranslateY = d - firstTableHeight;
          }
        }
      }
      e >= sChildTableList.length && (e = 0);
      const topRefTable = this.$refs[`child-roll-el-table-${e}`];
      topRefTable.myIndex = 0; // 1
      topRefTable.firstTableHeight = topRefTable.$el.clientHeight; // c[0]; // 183
    },
    /**
     * @desc 加载数据
     */
    init() {
      if (!this.api) {
        return;
      }
      this.loadMask();
      const params = _assign({}, this.queryParams);
      this.$api[this.api]({ params })
        .then(response => {
          const data = _get(
            response,
            _get(this['$base-global-options'], 'grid.data', ''),
            []
          );
          // const data = response.data.results;
          this.tableData = data;
        })
        .catch(error => {
          this.tableData = [];
          throw new Error(error);
        })
        .finally(() => {
          this.loading.close();
        });
    },
    /**
     * @desc 显示加载中遮罩
     * @method
     */
    loadMask() {
      this.loading = this.$loading({
        lock: true,
        target: this.$refs[`${this._uid}-base-roll-grid`].$el
      });
    },
    /**
     * @desc 构建列 el-table-column
     */
    tableColumnNodes() {
      return _map(this.columns, elem => {
        return this.$createElement('el-table-column', {
          props: _assign({}, _omit(elem, ['render', 'renderHeader', 'unit'])),
          scopedSlots: {
            default: ({ row, column, $index }) => {
              // 自定义列的内容
              return row[column.property];
            },
            header: ({ column, $index }) => {
              return column.label;
            }
          }
        });
      });
    },
    /**
     * @desc 构建 el-carousel-item
     */
    createElCarouselItem() {
      const vNodes = [];
      if (_isEmpty(this.tableData)) {
        return vNodes;
      }
      const sGroupList = this.group(this.tableData);
      for (let i = 0, len = sGroupList.length; i < len; i++) {
        const vElTableNode = this.$createElement(
          'el-table',
          {
            ref: `child-roll-el-table-${i}`,
            props: {
              data: sGroupList[i],
              stripe: this.stripe,
              showHeader: false
            },
            on: {
              // 数据更改导致的虚拟 DOM 重新渲染和打补丁，此时高度 height 值已经可以获取
              'hook:updated': e => {},
              // 元素挂载完成，此时远程数据 tableData 可能还未获取到
              'hook:mounted': e => {
                this.$refs[`child-roll-el-table-${i}`].myIndex = i;
                this.$refs[`child-roll-el-table-${i}`].myTranslateY = 0;
                if (i === 0) {
                  this.$refs[`child-roll-el-table-${i}`].firstTableHeight = 0;
                }
                this.$refs[`child-roll-el-table-${i}`].$el.style.transform =
                  'translateY(0px) scale(1)'; // ${i * 200}
              }
            }
          },
          [this.tableColumnNodes()]
        );
        vNodes.push(vElTableNode);
      }
      return vNodes;
    },
    /**
     * @desc 数据分组
     * @param
     */
    group(data) {
      var result = [];
      var groupItem;
      for (let i = 0; i < data.length; i++) {
        if (i % this.groupDataNum === 0) {
          groupItem != null && result.push(groupItem);
          groupItem = [];
        }
        groupItem.push(data[i]);
      }
      result.push(groupItem);
      return result;
    }
  },
  render(h) {
    return h(
      'el-table',
      {
        ref: `${this._uid}-base-roll-grid`,
        class: _assign(
          { 'base-roll-grid': true },
          _get(this.$props, 'ctCls', {})
        ),
        style: 'width: 100%;', // height: 100%;overflow: auto;
        props: {
          data: [],
          border: this.border,
          height: this.tableData.length > 0 ? '' : `${this.height}px`
        }
      },
      [
        this.tableColumnNodes(),
        h('template', { slot: 'empty' }, [
          this.tableData.length > 0
            ? h('div', { style: 'min-height: 0px;' }, [])
            : h('div', { style: 'min-height: 0px;' }, ['没有查询到数据'])
        ]),
        h('template', { slot: 'append' }, [
          // this.createElCarouselItem()
          h(
            'div',
            {
              ref: `${this._uid}-base-roll-grid-append-box`,
              style: {
                height:
                  this.appendHeight === 0 || this.tableData.length === 0
                    ? false
                    : `${this.appendHeight}px`,
                overflow: 'hidden'
              } // height: `${this.height - 40}px`
            },
            [this.tableData.length > 0 && this.createElCarouselItem()]
          )
          /* h(
            'div',
            {
              style: 'border: 1px solid red;height: 100%;box-sizing:border-box;',
              props: {
                // height: this.height
                //   ? this.height
                //   : `${40 * this.groupDataNum}px`,
                // height: '500px',
                direction: 'vertical',
                autoplay: true
              }
            },
            [this.createElCarouselItem()]
          ) */
        ])
      ]
    );
  }
};
export default BaseRollGrid;
