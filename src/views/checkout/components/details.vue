<template>
  <div class="text">
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
import { onMounted, reactive, nextTick } from "vue";
import { toRefs } from "@vueuse/shared";
export default {
  name: "Details",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      total: {
        count: 0,
        price: 0,
        postFee: 0,
        payable: 0,
      },
    });
    props.data.forEach((data) => {
      state.total.count += data.count;
      state.total.price += data.count * data.price * 1;
      state.total.postFee = Math.max(state.total.postFee, data.postFee);
    });
    state.total.payable = state.total.postFee + state.total.price;
    nextTick(() => {
      emit("payable", state.total.payable);
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
.text {
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
