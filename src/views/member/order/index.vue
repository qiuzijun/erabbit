<template>
  <div class="order">
    <Tabs @pageIndex="orderStateIndex" :list="evaPage.items" />
    <Page :counts="evaPage.pages" @pageIndex="pageIndex" />
  </div>
</template>
<script>
import Page from "../../product/components/page.vue";
import { findOrderList } from "@/api/member";
import { reactive, watchEffect, ref } from "vue-demi";
export default {
  components: { Page },
  name: "Order",
  setup(props) {
    const state = reactive({
      order: {
        orderState: 0,
        page: 1,
        pageSize: 5,
      },
    });
    const evaPage = ref({});
    const orderStateIndex = (id) => (state.order.orderState = id);
    const pageIndex = (id) => (state.order.page = id);
    const getFindOrderList = () => {
      findOrderList(state.order)
        .then(({ result }) => {
          evaPage.value = result;
          console.log(result);
        })
        .catch((err) => {});
    };
    watchEffect(() => {
      let order = state.order;
      getFindOrderList();
    });
    return {
      orderStateIndex,
      pageIndex,
      evaPage,
    };
  },
};
</script>
<style lang="less" scoped>
.order {
  width: 100%;
  background-color: white;
}
</style>
