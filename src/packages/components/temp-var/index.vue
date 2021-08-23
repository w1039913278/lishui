<script>
export default {
  name: 'BaseTempVar',
  functional: true,
  render: (h, ctx) => {
    // 调用名为 default 的默认插槽函数，并将参数props传入
    return ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props || {});
  }
};
</script>
