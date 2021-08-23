/**
 * @desc  tree 树状组件
 */
import _assign from 'lodash/assign';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';
import _has from 'lodash/has';
import _isEmpty from 'lodash/isEmpty';
import _isNil from 'lodash/isNil';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _keys from 'lodash/keys';
import _hasIn from 'lodash/hasIn';
import _forEach from 'lodash/forEach';
import _join from 'lodash/join';
import _reverse from 'lodash/reverse';

const BaseTree = {
  name: 'BaseTree',
  inheritAttrs: false,
  model: {
    prop: 'treeValue',
    event: 'treeChange'
  },
  props: {
    props: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          value: 'value',
          isLeaf: 'leaf'
        };
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
    // 默认树组件懒加载
    lazy: {
      type: Boolean,
      default: true
    },
    api: {
      type: String,
      required: true
    },
    queryParams: {
      type: Object,
      default() {
        return {};
      }
    },
    // 根节点label
    rootLabel: {
      type: String,
      default: '根目录'
    },
    // 根节点信息
    root: {
      type: Object,
      default() {
        return {
          [this.valueField]: 0,
          [this.displayField]: this.rootLabel,
          [this.props.children]: []
        };
      }
    },
    // 是否渲染根节点
    isRenderRoot: {
      type: Boolean,
      default: true
    },
    // 推荐 id 作为唯一键
    /* nodeKey: {
      type: String,
      default: 'id'
    }, */
    // 过滤返回数据（该函数带一个参数'data'用来指向源数据）
    loadFilter: {
      type: Function
    },
    // 自定义内联 style
    ctStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    // 自定义样式 class
    ctCls: {
      type: Object,
      default() {
        return {};
      }
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
    // 事件
    listeners: {
      type: Object,
      default: () => {}
    },
    // 定义外部 v-model 值，默认值 null 因为单选传入 String ，多选 Array 并不确定
    treeValue: {
      default() {
        return null;
      }
    },
    // 是否自动展开第一层树的节点 相当于设置 :default-expanded-keys="[0]"
    // 如果设置了 default-expanded-keys 同时 isExpandFirstPath 为 true 的话会在 default-expanded-keys 中自动添加 0
    isExpandFirstPath: {
      type: Boolean,
      default: true
    },
    // 控件右侧操作菜单栏（注意：如果配置了 handleMenuScope 作用域插槽，那么就算传入了 `handleMenu` 也不会进行生成）
    handleMenu: {
      type: Array
    },
    // 控件右侧操作菜单栏 icon
    handleIcon: {
      type: String,
      default: 'el-icon-more'
    },
    // 数据源用于快速创建一个简易tree
    store: {
      type: Array,
      default() {
        return [
          /* {
            label: '一级 1',
            children: [{
              label: '二级 1-1',
              check: true // 默认选中当前节点
            }, {
              label: '二级 1-2'
            }]
          } */
        ];
      }
    },
    // 第一次载入时是否自动刷新 tree 数据
    isReloadTree: {
      type: Boolean,
      default: true
    },
    // 是否只选取最里层的节点
    isSelectedLastNode: {
      type: Boolean,
      default: false
    },
    // 选取的层级（不能和 isSelectedLastNode 同时设置）
    selectedLevel: {
      type: Number,
      validator: function (value) {
        return value >= 0;
      }
    }
  },
  data() {
    this.handleMenuEnum = {
      add: 'add', // 新增模式
      edit: 'edit', // 编辑模式
      delete: 'delete' // 删除模式
    };
    this.events = {
      afterLoadStore: 'afterLoadStore' // 数据加载完成之后
    };
    this.curQueryParams = {};
    this.editingNode = null; // 当前处于编辑状态的节点
    this.isFirst = true; // 是否第一次加载，主要用于判断 `懒加载` 时是不是第一次请求
    this.rootData = { [this.nodeKey]: 0 }; // 根节点 { [this.nodeKey]: 0 }
    return {
      nodeKey: '',
      defaultExpandedKeys: _get(this.$attrs, 'default-expanded-keys', []),
      editingValue: '', // 正在编辑的文本域值
      curData: [] // 数据集
    };
  },
  created() {
    this.nodeKey = this.valueField;
    /* this.$nextTick(() => {
      var btn = document.getElementsByTagName('body');
      btn.onclick = function () {
        console.info('这是第一种点击方式');
      };
    }); */
  },
  mounted() {
    if (!this.lazy && this.isReloadTree) {
      this.handLoadStore();
    }
  },
  methods: {
    /**
     * @desc 手动触发查询
     */
    handLoadStore() {
      if (!this.lazy) {
        // 非懒加载
        this.loadStore()
          .then(data => {
            if (!_isEmpty(data)) {
              if (this.isRenderRoot) {
                this.root[this.props.children] = data;
                this.curData = [this.root];
              } else {
                if (data.length > 0) {
                  this.rootData[this.nodeKey] = data[0][this.nodeKey];
                }
                this.curData = data;
              }
            }
            // 数据读取完成触发事件
            this.$emit(this.events.afterLoadStore, data);
            // 自动展开第一行
            if (
              this.isExpandFirstPath &&
              !_has(this.$attrs, 'default-expanded-keys') &&
              (data.length === 1 || this.isRenderRoot)
            ) {
              this.defaultExpandedKeys.push(_get(data[0], this.nodeKey));
            }
          })
          .finally(() => {});
      } else {
        // 懒加载
      }
    },
    /**
     * @typedef {Object} options - 选项配置对象
     * @property {Number} id - 指定在延迟开始前调用
     * @property {String} text - 节点文本
     * @property {String} label - 节点名称
     * @property {Boolean} isLeaf - 是否子节点
     * @property {Object} data - 后端提供的节点源数据对象
     */
    /**
     * @desc 加载子树数据的方法，仅当 lazy 属性为true 时生效
     * @param {options} node - 节点信息
     * @param {Promise} resolve - promise.resolve
     * @method
     */
    loadNode(node, resolve) {
      if (node.level === 0 && this.isRenderRoot) {
        return resolve([this.root]);
      }
      this.loadStore(node)
        .then(data => {
          // this.curData = data; // 懒加载的数据不一样，是分批获取的，需要添加到指定的 curData的 某个节点内的 children 属性中
          resolve(data);
          // 数据读取完成触发事件
          this.$emit(this.events.afterLoadStore, data);
          // 自动展开第一行
          if (
            this.isExpandFirstPath &&
            !_has(this.$attrs, 'default-expanded-keys') &&
            (data.length === 1 || this.isRenderRoot)
          ) {
            this.defaultExpandedKeys.push(_get(data[0], this.nodeKey));
          }
        })
        .catch(() => resolve([]))
        .finally(() => {});
    },
    /**
     * @desc 加载树
     * @param {Object} node - 树的节点
     * @method
     */
    loadStore(node = {}) {
      return new Promise((resolve, reject) => {
        if (!_isNil(this.store) && !_isEmpty(this.store)) {
          resolve(this.store);
          return;
        }
        if (!this.api) {
          resolve([]);
          return;
        }
        const params = _assign(
          {},
          this.queryParams,
          // { [this.nodeKey]: _isEmpty(node) ? '' : _get(node.data, this.nodeKey) },
          this.curQueryParams
        );
        if (!_isEmpty(_get(node.data, this.nodeKey))) {
          params[this.nodeKey] = _get(node.data, this.nodeKey);
        }
        this.$api[this.api]({ params: params })
          .then(resList => {
            if (this.loadFilter) {
              resList = this.loadFilter(resList);
            }
            const resData = [];
            const checkedNodes = [];
            if (this.isFirst) {
              this.isFirst = false;
              if (resList.data.length > 0) {
                this.rootData[this.nodeKey] = resList.data[0][this.nodeKey];
              }
            }
            for (let i = 0; i < resList.data.length; i++) {
              const element = resList.data[i];
              element[this.props.label] = element[this.displayField];
              element[this.props.value] = element[this.valueField];
              // 设置需要默认选中的节点
              if (_has(element, 'check') && element.check) {
                const node = _set({}, this.nodeKey, element[this.nodeKey]);
                checkedNodes.push(node);
              }
              resData.push(element);
            }
            if (checkedNodes.length > 0) {
              setTimeout(() => {
                // 默认勾选的节点 Array
                this.getTree().setCheckedNodes(checkedNodes);
              }, 0);
            }
            resolve(resData);
          })
          .catch(error => {
            throw new Error(error);
          });
      });
    },
    /**
     * @desc 设置查询参数
     * @param {Object} params
     * @method
     */
    setQueryParams(params = {}) {
      this.curQueryParams = {};
      return Object.assign(this.curQueryParams, params);
    },
    /**
     * @desc 获取根节点
     */
    getRootData() {
      return this.getTree().getNode(this.rootData[this.nodeKey]);
    },
    /**
     * @desc 获取 el-tree 对象
     * @method
     */
    getTree() {
      return this.$refs[`${this._uid}-el-tree-ref`];
    },
    /**
     * @desc 刷新整棵树，不管节点
     */
    refreshAll() {
      this.loadStore().then(data => {
        if (!_isEmpty(data)) {
          if (this.isRenderRoot) {
            this.root.children = data;
            this.curData = [this.root];
          } else {
            this.curData = data;
          }
        }
        // 数据读取完成触发事件
        this.$emit(this.events.afterLoadStore, data);
      });
    },
    /**
     * @desc 刷新某个节点
     * @param {*} nodeData
     * @method
     * @private
     */
    refreshNode(nodeData) {},
    /**
     * @desc 刷新整棵树
     * @method
     *
     */
    refresh() {
      const node = this.getTree().getNode(this.rootData[this.nodeKey]);
      node.loading = true;
      this.loadStore(node)
        .then(resData => {
          this.getTree().updateKeyChildren(node.data[this.valueField], resData);
        })
        .catch(error => {
          throw new Error(error);
        })
        .finally(() => {
          node.loading = false;
        });
    },
    /**
     * @desc 更新某个节点（支持懒加载和非懒加载）
     * @example
     * this.$refs['complicate-tree-ref'].updateNode(node, { label: value });
     */
    updateNode(node, params = {}) {
      if (!_isNil(params) && _hasIn(node.data, _keys(params))) {
        const key = _keys(params)[0];
        _set(node, `data.${key}`, params[key]);
      }
    },
    /**
     * @desc 删除某个节点
     * @param {Object} node - 当前选中节点
     */
    deleteNode(node = {}) {
      if (!_isEmpty(node)) {
        const parent = node.parent;
        const children = parent.data[this.props.children] || parent.data;
        const index = children.findIndex(d => d.id === node.data.id);
        children.splice(index, 1);
      }
    },
    /**
     * @desc 默认展开指定的节点
     */
    expandedNode(node = {}) {
      // node.expanded = true;
      /* if (!_isEmpty(node) && _has(node, this.valueField)) {
        this.$refs[`${this._uid}-el-tree-ref`].store.nodesMap[
          node.data[this.valueField]
        ].expanded = true; // 默认展开指定的1个节点，如果是3层节点，第3层设置展开那么上面的2层还是没有展开看起来还是关闭的样子
      } */
      if (!_isEmpty(node) && !_isNil(node.data) && _has(node, this.valueField)) {
        const whileFn = (parentNode) => {
          if (!parentNode.expanded) {
            parentNode.expanded = true;
          }
          if (!_isNil(parentNode.parent)) {
            whileFn(parentNode.parent);
          }
        };
        if (_has(node, 'expanded')) {
          const curNode = this.$refs[`${this._uid}-el-tree-ref`].store.nodesMap[
            node.data[this.valueField]
          ];
          if (!_isNil(curNode) && !_isNil(curNode.parent)) {
            whileFn(curNode.parent);
          }
          if (!curNode.expanded) {
            curNode.expanded = true; // 默认展开指定节点
          }
        }
      }
    },
    /**
     * @desc 新增加一个节点
     */
    insertNode(node, data = {}) {
      if (!_isEmpty(node) && _has(data, this.valueField)) {
        if (_isNil(_get(node.data, this.props.children))) {
          this.$set(node.data, this.props.children, []);
        }
        node.data[this.props.children].push(data);
        setTimeout(() => {
          this.expandedNode(node); // 默认展开指定节点
        }, 0);
      }
    },
    /**
     * @desc 获取节点的所有上层节点
     * @param {Object} node - 当前 tree 的节点对象
     * @param {Boolean} isHaveSelf - 是否包含自身的值
     */
    getNodeParentLevel(node, isHaveSelf = true) {
      if (
        !_has(node, 'data') &&
        !_has(node.data, this.nodeKey) &&
        !_has(node.data, this.valueField)
      ) {
        return;
      }
      const levelStr = isHaveSelf ? [_get(node.data, this.displayField)] : [];
      const whileFn = curNode => {
        if (_has(curNode, `data.${this.displayField}`)) {
          levelStr.push(_get(curNode.data, this.displayField));
        }
        if (_has(curNode, 'parent') && !_isNil(curNode.parent)) {
          whileFn(curNode.parent);
        }
      };
      if (_has(node, 'parent') && !_isNil(node.parent)) {
        whileFn(node.parent);
      } else {
        levelStr.push(_get(node.data, this.displayField));
      }
      return _join(_reverse(levelStr), '/');
    },
    /**
     * @desc 通过 keys 设置目前勾选的节点
     * @method
     * @example
     * this.$refs['base-tree'].setCheckedKeys([2, 5])
     */
    setCheckedKeys(keys = []) {
      /* const defaultCheckNodes = this.getCheckedNodes();
      if (!_isEmpty(defaultCheckNodes)) {
        for (let i = 0; i < defaultCheckNodes.length; i++) {
          keys.push(_get(defaultCheckNodes[i], this.nodeKey));
        }
      } */
      this.getTree().setCheckedKeys(keys);
    },
    /**
     * @desc 若节点可被选择,则返回目前被选中的节点所组成的数组
     * @method
     * @return Array
     */
    getCheckedNodes() {
      return this.getTree().getCheckedNodes();
    },
    /**
     * @desc 清空树的数据（静态数据 store 清空请在外部自行操作）
     */
    clearData() {
      if (this.lazy) {
        if (this.isRenderRoot) {
          this.getTree().remove(_get(this.root, this.valueField, 0));
        } else {
          const nodesMap = this.getTree().store.nodesMap;
          _forEach(nodesMap, (value, key) => {
            const id = _get(value, `data.${this.valueField}`);
            if (!_isNil(id)) {
              this.getTree().remove(id);
            }
          });
          /* this.getTree().remove(1);
          this.getTree().remove(2);
          this.getTree().remove(3); */
        }
      } else {
        this.curData = [];
      }
      if (
        _has(this.$listeners, 'clearData') ||
        _has(this.$listeners, 'clear-data')
      ) {
        this.$emit('clearData');
      }
    },
    /**
     * @desc 清空选中的节点
     * @method
     */
    clearChecked() {
      this.getTree().setCheckedKeys([]);
    },
    /**
     * @desc 节点被点击时的回调
     * @param {Object} record
     * @param {*} node
     * @param {*} tree
     * @event
     */
    nodeClick(record, node, tree) {
      if (_has(this.listeners, 'nodeClick')) {
        this.listeners.nodeClick(record, node, tree);
        return;
      }
      const eventName = _has(this.$listeners, 'nodeClick')
        ? 'nodeClick'
        : 'node-click';
      this.$emit(eventName, record, node, tree);
    },
    /**
     * @desc 节点选中状态发生变化时的回调
     * @param {Object} record - 节点记录
     * @param {Boolean} checked - 节点本身是否被选中
     * @param {Array} childCheckNodes - 节点的子树中是否有被选中的节点
     * @event
     */
    checkChange(record, checked, childCheckNodes) {
      if (_has(this.listeners, 'checkChange')) {
        this.listeners.checkChange(record, checked, childCheckNodes);
        return;
      }
      const eventName = _has(this.$listeners, 'checkChange')
        ? 'checkChange'
        : 'check-change';
      this.$emit(eventName, record, checked, childCheckNodes);
    },
    /**
     * @desc 当复选框被点击的时候触发
     * @param {Object} node - 节点对象
     * @param {Object} treeCheckedNode - 树目前的选中状态对象
     * @event
     */
    nodeBoxCheck(node, treeCheckedNode) {
      if (_has(this.listeners, 'check')) {
        this.listeners.check(node, treeCheckedNode);
        return;
      }
      this.$emit('check', node, treeCheckedNode);
      // 触发v-model input事件
      const treeEventName = _has(this.$listeners, 'treeChange')
        ? 'treeChange'
        : 'tree-change';
      this.$emit(
        treeEventName,
        _map(this.getTree().getCheckedNodes(), o => _get(o, this.valueField))
      );
    },
    /**
     * @desc 当前选中节点变化时触发的事件 点击节点，并不是复选框
     * @param {Object} record - 当前节点的数据
     * @param {Object} node - 当前节点的 Node 对象
     * @event
     */
    currentChange(record, node) {
      if (_has(this.listeners, 'currentChange')) {
        this.listeners.currentChange(node, record, node);
        return;
      }
      const eventName = _has(this.$listeners, 'currentChange')
        ? 'currentChange'
        : 'current-change';
      this.$emit(eventName, record, node);
      // 触发v-model input事件
      const treeEventName = _has(this.$listeners, 'treeChange')
        ? 'treeChange'
        : 'tree-change';
      this.$emit(treeEventName, _get(record, this.valueField));
    },
    /**
     * @desc 当某一节点被鼠标右键点击时会触发该事件
     * @param {*} event
     * @param {*} nodeData
     * @param {*} node
     */
    nodeContextmenu(event, record, node, nodeElement) {
      const eventName = _has(this.$listeners, 'nodeContextmenu')
        ? 'nodeContextmenu'
        : 'node-contextmenu';
      this.$emit(eventName, event, record, node, nodeElement);
      event.preventDefault();
    },
    /**
     * @desc 创建 el-dropdown-item
     * @method
     * @private
     * @param {Object} data - 当前节点的数据
     * @param {Object} node - 当前节点的 Node 对象
     */
    createElDropdownItem({ node, data }) {
      const vNodes = [];
      if (!_isNil(this.handleMenu)) {
        for (let i = 0, len = this.handleMenu.length; i < len; i++) {
          const option = this.handleMenu[i];
          let renderNode = option.text;
          if (!_has(option, 'divided')) {
            option.divided = true;
          }
          if (!_has(option, 'isClose')) {
            option.isClose = true; // 点击关闭下拉面板
          }
          if (_has(option, 'render')) {
            renderNode = option.render(this.$createElement); // 自定义节点
          }
          if (_has(option, 'isPopconfirm') && option.isPopconfirm) {
            renderNode = this.$createElement(
              'el-popconfirm',
              {
                props: {
                  title: _get(option, 'title', ''),
                  placement: 'left',
                  iconColor: 'red'
                },
                on: {
                  onConfirm: () => {
                    _has(option, 'listeners.onConfirm') &&
                      option.listeners.onConfirm({ node, data });
                  },
                  confirm: () => {
                    _has(option, 'listeners.onConfirm') &&
                      option.listeners.onConfirm({ node, data });
                    _has(option, 'listeners.confirm') &&
                      option.listeners.confirm({ node, data });
                  },
                  onCancel: () => {
                    _get(option, 'listeners.onCancel', () => {});
                  },
                  cancel: () => {
                    _get(option, 'listeners.onCancel', () => {});
                    _get(option, 'listeners.cancel', () => {});
                  }
                }
              },
              [
                this.$createElement(
                  'span',
                  { slot: 'reference', style: 'display: block;' },
                  [
                    _has(option, 'render')
                      ? option.render(this.$createElement)
                      : _get(option, 'text', '')
                  ]
                )
              ]
            ); // 二次确认框
          }
          vNodes.push(
            this.$createElement(
              'el-dropdown-item',
              {
                props: _omit(option, ['text', 'listeners', 'render']),
                nativeOn: {
                  click: event => {
                    if (_get(option, 'isClose', true)) {
                      this.$refs[
                        `${node[this.nodeKey]}-tree-el-dropdown`
                      ].hide();
                      document.body.click(); // 用于隐藏 isPopconfirm: true 时的气泡确认框
                    }
                    _has(option, 'listeners.click') &&
                      option.listeners.click({ node, data });
                  }
                }
              },
              [renderNode]
            )
          );
        }
      }
      return vNodes;
    },
    /**
     * @desc 创建点击树形控件右侧更多按钮展示的下拉菜单
     * @method
     * @private
     * @param {Object} data - 当前节点的数据
     * @param {Object} node - 当前节点的 Node 对象
     */
    createHandleMenu({ node, data }) {
      const h = this.$createElement;
      let textNode = h('span', { class: 'el-tree-node__label' }, [
        h(
          'div',
          {
            class: {
              'base-tree-node-item': true,
              [`item-${this._uid}-${node.data[this.valueField]}`]: true
            }
          },
          [h('span', {}, [node.label]), this.createEditNode(h, node)]
        )
      ]);
      let menuNode = _isNil(this.handleMenu)
        ? undefined
        : h(
          'el-dropdown-menu',
          { slot: 'dropdown' },
          this.createElDropdownItem({ node, data })
        );
      if (_has(this.$scopedSlots, 'default')) {
        // 默认插槽
        textNode = h(
          'div',
          {
            class: {
              'base-tree-node-item': true,
              [`item-${this._uid}-${node.data[this.valueField]}`]: true
            }
          },
          [
            this.$scopedSlots.default({ node, data }),
            this.createEditNode(h, node)
          ]
        );
      }
      if (_has(this.$scopedSlots, 'handleMenuScope')) {
        // 下拉菜单插槽
        menuNode = this.$scopedSlots.handleMenuScope({ node, data });
      }
      let handleIconNode = h('i', { class: this.handleIcon }, []);
      if (_has(this.$scopedSlots, 'handleIconScope')) {
        handleIconNode = this.$scopedSlots.handleIconScope({ node, data });
      }
      const vNode = h(
        'span',
        {
          class: 'handle-menu-tree-node',
          on: {
            click: event => {
              if (event.target.tagName === 'I') {
                document.body.click(); // 用于隐藏 isPopconfirm: true 时的气泡确认框
                event.stopPropagation();
                event.preventDefault();
                return false; // i 图标标签
              }
            }
          }
        },
        [
          textNode,
          !_isNil(menuNode)
            ? h('span', { class: { 'tree-el-dropdown-box': true } }, [
              h(
                'el-dropdown',
                {
                  ref: `${node[this.nodeKey]}-tree-el-dropdown`,
                  props: {
                    'hide-on-click': false,
                    trigger: 'click',
                    size: 'mini'
                  },
                  on: {
                    'visible-change': state => {
                      if (
                        !_isNil(this.editingNode) &&
                          node.data[this.valueField] !==
                            this.editingNode.data[this.valueField]
                      ) {
                        this.changeEditModel(false);
                      }
                    },
                    command: val => {
                      if (_isNil(val)) {
                        return;
                      }
                      const aChildList = _get(
                        this.$refs[`${node[this.nodeKey]}-tree-el-dropdown`],
                        '$children[0].$children',
                        []
                      );
                      const item = _find(
                        aChildList,
                        o => _get(o, '$options.propsData.command', '') === val
                      );
                      let isClose = _get(
                        item,
                        '$vnode.data.props.isClose',
                        true
                      );
                      if (_has(item.$attrs, 'isClose')) {
                        isClose = item.$attrs.isClose;
                      }
                      if (isClose === true) {
                        this.$refs[
                          `${node[this.nodeKey]}-tree-el-dropdown`
                        ].hide();
                        document.body.click(); // 用于隐藏 isPopconfirm: true 时的气泡确认框
                      }
                      // 编辑模式
                      if (val === this.handleMenuEnum.edit) {
                        this.editingValue = node.data[this.displayField]; // 正在编辑的值
                        this.editingNode = node; // 正在编辑的节点
                        this.changeEditModel();
                      }
                      // 新增模式
                      if (val === this.handleMenuEnum.add) {
                        this.changeEditModel(false);
                        if (_has(this.$listeners, 'addNodeHandle')) {
                          this.$emit('addNodeHandle', node, node.data, val);
                        } else {
                          const newChild = {
                            id: `${this._uid}-${Math.ceil(
                              Math.random() * 1000
                            )}`,
                            label: '新增节点',
                            children: []
                          };
                          if (!node.data.children) {
                            this.$set(node.data, 'children', []);
                          }
                          node.data.children.push(newChild);
                          setTimeout(() => {
                            this.expandedNode(node); // 默认展开指定节点
                          }, 0);
                        }
                      }
                      // 删除模式
                      if (val === this.handleMenuEnum.delete) {
                        this.changeEditModel(false);
                        this.$emit('deleteNodeHandle', node, node.data, val);
                      }
                    }
                  }
                },
                [
                  h('span', { class: 'el-dropdown-link' }, [handleIconNode]),
                  menuNode
                ]
              )
            ])
            : h('span', { class: 'el-dropdown-link' }, [handleIconNode])
        ]
      );
      return vNode;
    },
    /**
     * @desc 创建编辑节点 el-input
     */
    createEditNode(h, node) {
      return h('div', { 'base-node-item_wrap': true }, [
        h('el-input', {
          class: 'base-tree-node-edit-input',
          attrs: {
            maxlength: '30'
          },
          props: {
            value: this.editingValue,
            'show-word-limit': true
          }, // node.data[this.displayField]
          on: {
            input: val => {
              this.editingValue = val;
            }
          },
          nativeOn: {
            click: event => {
              event.stopPropagation();
              event.preventDefault();
              return false; // 静止事件冒泡，触发到 tree 的 node-click 事件
            }
          }
        }),
        h('i', {
          attrs: { title: '提交' },
          class: { 'el-icon-check': true, 'confirm-btn': true },
          on: {
            click: event => {
              this.$emit('editNodeHandle', node, this.editingValue, event);
              setTimeout(() => {
                this.changeEditModel(false);
              }, 200);
            }
          }
        }),
        h('i', {
          attrs: { title: '取消' },
          class: { 'el-icon-close': true, 'cancel-btn': true },
          on: {
            click: () => {
              this.changeEditModel(false);
            }
          }
        })
      ]);
    },
    /**
     * @desc 切换只读和编辑模式
     */
    changeEditModel(model = true) {
      if (
        !_isNil(this.editingNode) &&
        !_isNil(
          document.getElementsByClassName(
            `item-${this._uid}-${this.editingNode.data[this.valueField]}`
          )[0]
        )
      ) {
        const aNodeList = document.getElementsByClassName(
          `item-${this._uid}-${this.editingNode.data[this.valueField]}`
        )[0].childNodes;
        /* const aNode = document.getElementsByClassName(
          `item-${this._uid}-${this.editingNode.data[this.valueField]}`
        )[0];
        aNode.style.width = 'auto'; */
        aNodeList[0].style.display = model ? 'none' : 'inline-block';
        aNodeList[1].style.display = model ? 'inline-block' : 'none';
        const offsetLeft = aNodeList[1].offsetLeft; // 距离左侧容器的间距
        // eslint-disable-next-line no-unused-vars
        const editBoxOffsetWidth = aNodeList[1].offsetWidth; // 编辑操作容器的宽度
        // eslint-disable-next-line no-unused-vars
        const treeBoxOffsetWidth = this.$refs[`${this._uid}-el-tree-ref`].$el
          .offsetWidth; // tree 面板容器的宽度
        aNodeList[1].style.position = 'relative';
        if (model && offsetLeft > 60) {
          aNodeList[1].style.left = `-${offsetLeft / 2}px`;
        }
        if (!model) {
          aNodeList[1].style.left = '0px';
        }
        if (this.$attrs['show-checkbox']) {
          let checkBoxNode;
          if (!_isNil(this.handleMenu) && !_has(this.$scopedSlots, 'handleMenuScope')) {
            checkBoxNode = _get(
              aNodeList[1],
              'parentNode.parentNode.parentNode.children[0].parentNode.parentNode.childNodes'
            );
          }
          if (_has(this.$scopedSlots, 'handleMenuScope')) {
            checkBoxNode = _get(
              aNodeList[1],
              'parentNode.parentNode.parentNode.children'
            );
          }
          if (model && !_isNil(checkBoxNode)) {
            // 复选框
            if (
              !_isNil(checkBoxNode) &&
              checkBoxNode.length > 0 &&
              checkBoxNode[1].className === 'el-checkbox'
            ) {
              checkBoxNode[1].style.display = 'none';
            }
          } else {
            if (
              !_isNil(checkBoxNode) &&
              checkBoxNode.length > 0 &&
              checkBoxNode[1].className === 'el-checkbox'
            ) {
              checkBoxNode[1].style.display = 'inline';
            }
          }
        }
        // aNodeList[1].style.marginLeft = '-20px';
        // console.info('aNodeList[1] ', aNodeList[1].offsetWidth, this.$refs[`${this._uid}-el-tree-ref`], treeBoxOffsetWidth, editBoxOffsetWidth, offsetLeft);
        if (!model) {
          this.editingValue = '';
          this.editingNode = null;
        }
      }
    }
  },
  render(h) {
    // v-if
    if (_isEqual(this.isRender, false)) {
      return h();
    }
    const style = _assign({}, _get(this.$props, 'ctStyle', { width: '100%' }));
    // v-show
    if (_isEqual(this.isDisplay, false)) {
      _set(style, 'display', 'none');
    }
    let scopedSlotVNode;
    if (
      !_isEmpty(this.$scopedSlots) &&
      (_has(this.$scopedSlots, 'default') ||
        _has(this.$scopedSlots, 'handleMenuScope'))
    ) {
      scopedSlotVNode = {
        default: ({ node, data }) => {
          return this.createHandleMenu({ node, data });
        }
      };
    } else if (_isEmpty(this.$scopedSlots) && !_isNil(this.handleMenu)) {
      scopedSlotVNode = {
        default: ({ node, data }) => {
          return this.createHandleMenu({ node, data });
        }
      };
    }
    const oLoadAction = this.lazy
      ? { load: this.loadNode }
      : { data: this.curData }; // 数据加载的方式
    if (this.lazy && !this.isReloadTree) {
      oLoadAction.load = new Promise((resolve, reject) => {
        resolve([]);
      });
    }
    _assign(this.props, { label: this.displayField });
    return h(
      'el-scrollbar',
      { style: {}, class: { 'base-tree-el-scrollbar': true } },
      [
        h(
          'el-tree',
          {
            ref: `${this._uid}-el-tree-ref`,
            class: _assign(
              { 'base-tree': true },
              _get(this.$props, 'ctCls', {})
            ),
            style,
            scopedSlots: scopedSlotVNode, // 自定义树节点的内容，参数为 { node, data }
            props: _assign(
              {},
              {
                // load: this.loadNode,
                // data: this.curData,
                props: _omit(this.props, ['value']),
                lazy: this.lazy,
                'expand-on-click-node': false,
                'node-key': this.nodeKey
              },
              oLoadAction,
              this.$attrs,
              { defaultExpandedKeys: this.defaultExpandedKeys }
            ),
            on: _assign({}, this.$listeners, {
              'node-click': (record, node, tree) => {
                if (
                  (this.isSelectedLastNode &&
                    (_isNil(_get(record, this.props.children)) ||
                      _get(record, this.props.children, []).length === 0)) ||
                  !this.isSelectedLastNode
                ) {
                  if (
                    !_isNil(this.selectedLevel) &&
                    _has(node, 'level') &&
                    node.level !== this.selectedLevel
                  ) {
                    return;
                  }
                  document.body.click(); // 用于隐藏 isPopconfirm: true 时的气泡确认框
                  this.nodeClick(record, node, tree);
                  this.changeEditModel(false);
                }
              }, // 节点被点击时的回调
              'check-change': this.checkChange, // 节点选中状态发生变化时的回调
              check: (node, treeCheckedNode) => {
                if (
                  (this.isSelectedLastNode &&
                    (_isNil(_get(node, this.props.children)) ||
                      _get(node, this.props.children, []).length === 0)) ||
                  !this.isSelectedLastNode
                ) {
                  const treeNode = this.getTree().getNode(
                    _get(node, this.valueField)
                  );
                  if (
                    !_isNil(this.selectedLevel) &&
                    _has(treeNode, 'level') &&
                    treeNode.level !== this.selectedLevel
                  ) {
                    return;
                  }
                  document.body.click(); // 用于隐藏 isPopconfirm: true 时的气泡确认框
                  this.nodeBoxCheck(node, treeCheckedNode);
                }
              }, // 当复选框被点击的时候触发
              'current-change': this.currentChange, // 当前选中节点变化时触发的事件 点击节点，并不是复选框
              'node-contextmenu': this.nodeContextmenu, // 当某一节点被鼠标右键点击时会触发该事件
              'node-expand': (data, node, component) => {
                this.changeEditModel(false);
                const eventName = _has(this.$listeners, 'nodeExpand')
                  ? 'nodeExpand'
                  : 'node-expand';
                this.$emit(eventName, data, node, component);
              }
            })
          },
          []
        )
      ]
    );
  }
};
export default BaseTree;
