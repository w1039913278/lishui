/**
 * 工具栏
 * 默认位于查询栏下方
 */
const BaseTBar = {
  name: 'BaseTBar',
  inject: ['getBaseGrid'],
  render(h) {
    return h(
      'div',
      {
        style: 'height: 100%;'
      },
      [this.$slots.default, this.$scopedSlots.tBarScope()]
    );
  }
};
export default BaseTBar;
