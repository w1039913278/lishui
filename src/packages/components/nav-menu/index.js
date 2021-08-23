/**
 * @desc NavMenu 导航菜单
 */
import _assign from 'lodash/assign';
import _get from 'lodash/get';
import _has from 'lodash/has';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _split from 'lodash/split';
import _join from 'lodash/join';
import _last from 'lodash/last';
import _isNil from 'lodash/isNil';
import _includes from 'lodash/includes';
import _find from 'lodash/find';

const BaseNavMenu = {
  name: 'BaseNavMenu',
  inheritAttrs: false,
  props: {
    // 导航菜单顶部标题栏文字
    navTitle: {
      type: String
    },
    // 导航菜单顶部标题栏文字左侧小图标
    navIcon: {
      type: String
    },
    // 收起导航的位置
    collapsePosition: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom'].indexOf(value) !== -1;
      }
    },
    collapseText: {
      type: String,
      default: '收起导航'
    },
    // 菜单数据
    menus: {
      type: Array,
      default() {
        return [];
      }
    },
    // subMenu 参数
    subMenuProps: {
      type: Object,
      default() {
        return {};
      }
    },
    // 侧栏收起状态
    collapsed: {
      type: Boolean,
      default: false
    },
    // svg 图标集合 [{name: 'studyState', component: studyState}]
    svgIcons: {
      type: Array,
      default() {
        return [];
      }
    },
    // 菜单内容区上面和下面两块区间的高度
    titleBlockHeight: {
      type: String,
      default: '40px'
    }
  },
  data() {
    this.defaultRouterPath = []; // 默认打开的第一个路由
    this.defaultBreadCrumbPath = []; // 默认打开的第一个路由对应的面包屑地址
    this.grade1Index = ''; // 一级菜单 index，适用于 1级菜单和2级菜单分离时设置（比如：顶部是一级菜单，左侧是二级菜单）
    this.subMenuList = [];
    return {
      firstSubMenuIndex: '',
      firstElMenuItem: '',
      collapseIcon: 'el-icon-s-fold', // 折叠图表
      isCollapse: this.collapsed, // 是否水平折叠收起菜单 （仅在 mode 为 vertical 时可用）
      collapsePanelWidth: 'auto'
    };
  },
  watch: {
    collapsed(val, oldVal) {
      if (val !== oldVal) {
        this.isCollapse = val;
      }
    }
    /* menus: { // 监听的对象
      handler: function (newV, oldV) {
        console.info('------------------------------------------');
        this.firstSubMenuIndex = '';
        this.firstElMenuItem = '';
      }
    } */
  },
  created() {
    /* setTimeout(() => {
      this.$emit('update:width', '64px');
    }, 3000); */
  },
  mounted() {
    this.$nextTick(function () {
      // DOM 现在更新了
      // `this` 绑定到当前实例
      this.collapsePanelWidth = `${this.$parent.$el.clientWidth}px`;
    });
  },
  methods: {
    /**
     * @desc 设置顶层 index 下标，用于一级菜单和二级菜单分离时区分不同的二级菜单 index
     * @param {Number} index - 路径下标
     */
    setGrade1Index(index = 0) {
      this.grade1Index = index;
    },
    /**
     * @desc 获取第一个 sub-menu 的 index 属性值
     */
    getFirstSubMenuIndex() {
      return this.firstSubMenuIndex;
    },
    /**
     * @desc 获取第一个 el-menu-item 的 index 属性值
     */
    getFirstElMenuItem() {
      return this.firstElMenuItem;
    },
    /**
     * @desc 获取 sub-menu 列表
     */
    getSubMenuList() {
      return this.subMenuList;
    },
    /**
     * @desc 获取默认打开的 menu 对应的面包屑路径
     */
    getDefaultBreadCrumbPath() {
      return this.defaultBreadCrumbPath;
    },
    /**
     * @desc 通过 el-menu-item 的 index 转换面包屑路径
     * @param {String} keyPath - 路径 0-0-0
     * @param {Boolean} isToPath=false - 是否需要返回 to 用于面包屑的路由跳转
     */
    getKeyPath2BreadCrumbPath(keyPath, isToPath = false) {
      let menus = this.menus;
      const breadCrumbPath = [];
      const aKeyPathList = _split(keyPath, '-');
      for (let i = 0, len = aKeyPathList.length; i < len; i++) {
        const menu = menus[aKeyPathList[i]];
        if (menu && _has(menu, 'menuName')) {
          const obj = {
            text: menu.menuName,
            menuCode: menu.menuCode,
            menuUrl: menu.menuUrl
          };
          if (isToPath) {
            obj.to = menu.menuCode;
          }
          breadCrumbPath.push(obj);
        }
        if (
          !_isNil(menu.children) &&
          _has(menu, 'children') &&
          menu.children.length > 0
        ) {
          menus = menu.children;
        }
      }
      return breadCrumbPath;
    },
    /**
     * @desc 根据菜单的 index 获取对应的路由路径
     * @param {String} index - 菜单对应的 index 属性
     */
    getRouterPath(index) {
      const sRouterPath = [];
      let menus = this.menus;
      for (const value of Object.values(_split(index, '-'))) {
        const menu = menus[value];
        if (menu) {
          menus = menu.children;
          sRouterPath.push(menu.menuCode);
        }
      }
      return _join(sRouterPath, '/');
    },
    /**
     * @desc 根据菜单的 index 获取菜单列表中最内部的一个节点
     * @param {String} index - 菜单对应的 index 属性
     */
    getLastMenu(index) {
      const sRouterPath = [];
      let menus = this.menus;
      for (const value of Object.values(_split(index, '-'))) {
        const menu = menus[value];
        if (menu) {
          menus = menu.children;
          sRouterPath.push(menu);
        }
      }
      return _last(sRouterPath);
    },
    /**
     * @desc 展开指定的 sub-menu
     * @param {String} index - 需要打开的 sub-menu 的 index
     */
    open(index = '0') {
      this.$refs[`${this._uid}-base-nav-menu-ref`].open(index);
    },
    /**
     * @desc 收起指定的 sub-menu
     * @param {String} index - 需要收起的 sub-menu 的 index
     */
    close(index = '0') {
      this.$refs[`${this._uid}-base-nav-menu-ref`].close(index);
    },
    /**
     * @desc 创建 导航菜单顶部标题栏
     */
    createNavTitle() {
      const vNode = [];
      if (_isNil(this.navTitle)) {
        return vNode;
      }
      const style = {
        'background-color': this.$attrs.backgroundColor,
        height: this.titleBlockHeight,
        'line-height': this.titleBlockHeight
      };
      if (this.collapsePosition === 'top') {
        _assign(style, { position: 'absolute', bottom: '0px' });
      }
      vNode.push(
        this.$createElement(
          'div',
          { class: { 'nav-top-title': true }, style },
          [
            !_isNil(this.navIcon) &&
              this.$createElement('i', { class: this.navIcon }, []),
            this.$createElement(
              'span',
              {
                style: { display: !this.isCollapse ? 'inline-block' : 'none' }
              },
              this.navTitle
            )
          ]
        )
      );
      return vNode;
    },
    /**
     * @desc 创建 收起导航
     */
    createContractBlock() {
      const vNode = [];
      if (
        !_has(this.$attrs, 'mode') ||
        (_has(this.$attrs, 'mode') && this.$attrs.mode !== 'horizontal')
      ) {
        const style = {
          'background-color': this.$attrs.backgroundColor,
          height: this.titleBlockHeight
        };
        if (this.collapsePosition === 'bottom') {
          _assign(style, { position: 'absolute', bottom: '0px' });
        } else {
          _assign(style, {
            'border-bottom': '1px solid rgba(236, 236, 236, 0.5)'
          });
        }
        vNode.push(
          // this.$createElement('template', { slot: 'default' }, [
          this.$createElement(
            'div',
            {
              style: style,
              class: { collapse: true },
              on: {
                click: () => {
                  this.isCollapse = !this.isCollapse;
                  this.collapseIcon = this.isCollapse
                    ? 'el-icon-s-unfold'
                    : 'el-icon-s-fold';
                }
              }
            },
            [
              this.$createElement('i', {
                class: { [this.collapseIcon]: true }
              }),
              this.$createElement(
                'span',
                {
                  style: { display: !this.isCollapse ? 'inline-block' : 'none' }
                },
                this.collapseText
              )
            ]
          )
          // ])
        );
      }
      return vNode;
    },
    /**
     * @desc 创建 el-subMenu
     */
    createSubMenu() {
      this.subMenuList = [];
      this.defaultBreadCrumbPath = [];
      const subMenuElements = [];
      for (let i = 0, len = this.menus.length; i < len; i++) {
        const menu = this.menus[i];
        let menuVNode = null;
        const iconUrl = this.getIconNode(menu);
        if (_has(menu, 'children') && !_isEmpty(menu.children)) {
          const subMenuIndex =
            this.grade1Index !== '' ? this.grade1Index + '-' + i : i + '';
          this.subMenuList.push(subMenuIndex);
          if (i === 0) {
            this.defaultBreadCrumbPath.push({
              text: _get(menu, 'menuName', '')
            });
          }
          if (i === 0) {
            this.firstSubMenuIndex = subMenuIndex;
          }
          // 二级
          const style = {};
          if (!_get(menu, 'isGroupShow', true)) {
            style.display = 'none'; // 是否要在组内一起展示该菜单
          }

          menuVNode = this.$createElement(
            'el-submenu',
            { key: subMenuIndex, props: { index: subMenuIndex }, style },
            [
              this.$createElement('template', { slot: 'title' }, [
                /* this.$createElement('i', {
                  class: _get(menu, 'iconUrl', '')
                }), */
                iconUrl,
                // _get(menu, 'menuName', '')
                this.$createElement(
                  'span',
                  { slot: 'title' },
                  _get(menu, 'menuName', '')
                )
              ]),
              this.createElMenuItemGroup(i, menu.children)
            ]
          );
        } else {
          const menuItemIndex =
            this.grade1Index !== '' ? this.grade1Index + '-' + i + '' : i + '';
          if (this.firstElMenuItem === '') {
            this.firstElMenuItem = menuItemIndex;
          }
          if (i === 0) {
            this.defaultBreadCrumbPath.push({
              text: _get(menu, 'menuName', '')
            });
          }
          const style = {};
          if (!_get(menu, 'isGroupShow', true)) {
            style.display = 'none'; // 是否要在组内一起展示该菜单
          }
          menuVNode = this.$createElement(
            'el-menu-item',
            { key: menuItemIndex, props: { index: menuItemIndex }, style },
            [
              iconUrl,
              // _get(menu, 'menuName', '')
              this.$createElement(
                'span',
                { slot: 'title' },
                _get(menu, 'menuName', '')
              )
            ]
          );
        }
        subMenuElements.push(menuVNode);
      }
      return subMenuElements;
    },
    /**
     * @desc 创建 el-menu-item
     */
    createElMenuItemGroup(parentIndex = 0, children = []) {
      const vNodes = [];
      for (let i = 0, len = children.length; i < len; i++) {
        // 三级
        const iconUrl = this.getIconNode(children[i]);
        if (_has(children[i], 'children') && !_isEmpty(children[i].children)) {
          if (i === 0) {
            this.defaultBreadCrumbPath.push({
              text: _get(children[i], 'menuName', '')
            });
          }
          const subMenuItems = _map(children[i].children, (item, key) => {
            const iconUrl = this.getIconNode(item);
            if (key === 0) {
              this.defaultBreadCrumbPath.push({
                text: _get(item, 'menuName', '')
              });
            }
            const menuItemIndex =
              this.grade1Index !== ''
                ? this.grade1Index + '-' + parentIndex + '-' + i + '-' + key
                : parentIndex + '-' + i + '-' + key;
            if (this.firstElMenuItem === '') {
              this.firstElMenuItem = menuItemIndex;
            }
            return this.$createElement(
              'el-menu-item',
              { props: { index: menuItemIndex } },
              [
                // this.$createElement('i', { class: _get(item, 'iconUrl', '') }),
                iconUrl,
                item.menuName
              ]
            );
          });
          const subMenuIndex =
            this.grade1Index !== ''
              ? this.grade1Index + '-' + parentIndex + '-' + i
              : parentIndex + '-' + i;
          if (parentIndex === 0) {
            this.firstSubMenuIndex = subMenuIndex;
          }
          this.subMenuList.push(subMenuIndex);
          const style = {};
          if (!_get(children[i], 'isGroupShow', true)) {
            style.display = 'none'; // 是否要在组内一起展示该菜单
          }
          vNodes.push(
            this.$createElement(
              'el-submenu',
              { key: subMenuIndex, props: { index: subMenuIndex }, style },
              [
                this.$createElement('template', { slot: 'title' }, [
                  /* this.$createElement('i', {
                    class: _get(children[i], 'iconUrl', '')
                  }), */
                  iconUrl,
                  children[i].menuName
                ]),
                subMenuItems
              ]
            )
          );
        } else {
          if (i === 0) {
            this.defaultBreadCrumbPath.push({
              text: _get(children[i], 'menuName', '')
            });
          }
          if (this.firstElMenuItem === '') {
            this.firstElMenuItem =
              this.grade1Index !== ''
                ? this.grade1Index + '-' + parentIndex + '-' + i
                : parentIndex + '-' + i;
          }
          const style = {};
          if (!_get(children[i], 'isGroupShow', true)) {
            style.display = 'none'; // 是否要在组内一起展示该菜单
          }
          vNodes.push(
            this.$createElement(
              'el-menu-item',
              {
                style,
                props: {
                  index:
                    this.grade1Index !== ''
                      ? this.grade1Index + '-' + parentIndex + '-' + i
                      : parentIndex + '-' + i
                }
              },
              [
                /* this.$createElement('i', {
                  class: _get(children[i], 'iconUrl', '')
                }), */
                iconUrl,
                _get(children[i], 'menuName', '')
              ]
            )
          );
        }
      }
      return vNodes;
    },
    /**
     * @desc 转换 menu 菜单中的 iconUrl
     * @param {Object} item - menu 对象
     */
    getIconNode(item = {}) {
      let iconUrl = _get(item, 'iconUrl', '');
      if (_includes(iconUrl, 'svg-')) {
        // svg图
        const curUrl = iconUrl.replace('svg-', '');
        const svgObj = _find(this.svgIcons, o => o.name === curUrl);
        if (!_isNil(svgObj)) {
          iconUrl = this.$createElement(_get(svgObj, 'component', 'span'), {
            style: { width: '24px', height: '16px', marginRight: '5px' }
          });
        } else {
          // iconUrl = this.$createElement('i', {}, []);
        }
      } else {
        iconUrl = this.$createElement('i', { class: iconUrl });
      }
      return iconUrl;
    }
  },
  render(h) {
    const style = {
      height: '100%',
      paddingBottom: _isNil(this.navTitle)
        ? this.titleBlockHeight
        : `${parseInt(this.titleBlockHeight) * 2}px`
    };
    if (_has(this.$attrs, 'mode') && this.$attrs.mode === 'horizontal') {
      style.width = '100%';
    }
    return h(
      'div',
      {
        style: {
          height: '100%',
          'overflow-y': 'hidden',
          'background-color': this.$attrs.backgroundColor
        },
        class: { 'base-nav-menu-box': true }
      },
      [
        this.collapsePosition === 'top'
          ? this.createContractBlock()
          : this.createNavTitle(),
        h(
          'el-menu',
          {
            ref: `${this._uid}-base-nav-menu-ref`,
            style,
            attrs: {
              id: this.$attrs.id
            },
            class: { 'base-nav-menu': true },
            props: _assign({}, this.$attrs, {
              'default-active': this.$attrs.defaultActive,
              collapse: this.isCollapse
            }),
            on: this.$listeners
          },
          [this.createSubMenu()]
        ),
        this.collapsePosition === 'bottom'
          ? this.createContractBlock()
          : this.createNavTitle()
      ]
    );
    /* return h(
      'el-menu',
      {
        ref: `${this._uid}-base-nav-menu-ref`,
        style,
        attrs: {
          id: this.$attrs.id
        },
        class: { 'base-nav-menu': true },
        props: _assign({}, this.$attrs, {
          'default-active': this.$attrs.defaultActive,
          collapse: this.isCollapse
        }),
        on: this.$listeners
      },
      [
        this.navTitle && this.createNavTitle(),
        this.collapsePosition === 'top' && this.createContractBlock(),
        this.createSubMenu(),
        this.collapsePosition === 'bottom' && this.createContractBlock()
      ]
    ); */
  }
};

export default BaseNavMenu;
