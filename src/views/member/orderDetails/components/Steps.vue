<template>
  <div class="Steps">
    <a-steps :current="orderState - 1">
      <a-step title="提交订单" :description="createTime"> </a-step>
      <a-step title="付款成功"></a-step>
      <a-step title="商品发货"></a-step>
      <a-step title="确认收货"></a-step>
      <a-step title="订单完成"></a-step>
    </a-steps>
  </div>
</template>
<script>
import { ref } from "vue";
import { Steps, Step } from "ant-design-vue";
export default {
  name: "Steps",
  components: {
    ASteps: Steps,
    AStep: Step,
  },
  props: {
    createTime: {
      type: String,
      default: "",
    },
    orderState: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    console.log(props.orderState);
    return {};
  },
};
</script>
<style lang="less" scoped>
.Steps {
  margin-top: 50px;
}
/deep/.ant-steps-item-finish .ant-steps-item-icon {
  border-color: @xtxColor;
}
/deep/.ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon {
  color: @xtxColor;
}
/deep/.ant-steps-item-finish
  > .ant-steps-item-container
  > .ant-steps-item-content
  > .ant-steps-item-title::after {
  background-color: @xtxColor;
}
/deep/.ant-steps-item-process .ant-steps-item-icon {
  background: @xtxColor;
  border-color: @xtxColor;
}
</style>
