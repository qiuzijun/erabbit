<template>
  <div class="moneyText">
    <p>
      <span>商品件数：</span>
      <span>{{ total.count }}件</span>
    </p>
    <p>
      <span>商品总价： </span>
      <span>¥{{ total.price }}</span>
    </p>
    <p>
      <span
        >运
        <i class="i"></i>
        费：
      </span>
      <span>¥{{ total.postFee }}</span>
    </p>
    <p>
      <span>应付总额： </span>
      <span>¥{{ total.payable }}</span>
    </p>
  </div>
</template>
<script>
import { reactive } from "vue";
import { toRefs } from "@vueuse/shared";
export default {
  name: "Details",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      total: {
        count: props.data.totalNum,
        price: props.data.totalMoney,
        postFee: props.data.postFee,
        payable: props.data.payMoney,
      },
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
.moneyText {
  min-width: 240px;
  float: right;
  p {
    span:last-child {
      float: right;
    }
    .i {
      width: 20px;
      display: inline-block;
    }
  }
  p:last-child {
    span:last-child {
      font-size: 20px;
      color: #cf4444;
    }
  }
}
</style>
