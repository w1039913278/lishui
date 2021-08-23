/**
 * search 面板
 */
const BaseGridSearch = {
  name: 'BaseGridSearch',
  inject: ['getBaseGrid'],
  render(h) {
    return h(
      'div',
      {
        style: 'height: 100%;'
      },
      [this.$slots.default, this.$scopedSlots.searchScope()]
    );
  }
};
export default BaseGridSearch;
