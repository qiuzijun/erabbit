<template>
  <div class="order">
    <Tabs
      @pageIndex="orderStateIndex"
      :list="evaPage.items"
      @deleteOrder="deleteOrder"
    />
    <Page :counts="evaPage.pages" @pageIndex="pageIndex" />
    <div class="example" v-if="active">
      <a-spin size="large" />
    </div>
  </div>
</template>
<script>
import Page from "../../product/components/page.vue";
import { findOrderList } from "@/api/member";
import { reactive, watchEffect, ref } from "vue-demi";
import { Spin } from "ant-design-vue";
export default {
  components: { Page, ASpin: Spin },
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
    const active = ref(false);
    const orderStateIndex = (id) => (state.order.orderState = id);
    const pageIndex = (id) => (state.order.page = id);
    const getFindOrderList = () => {
      active.value = true;
      findOrderList(state.order)
        .then(({ result }) => {
          evaPage.value = result;
          //   console.log(result);
          active.value = false;
        })
        .catch((err) => {});
    };
    const deleteOrder = () => {
      getFindOrderList();
    };
    watchEffect(() => {
      let order = state.order;
      getFindOrderList();
    });
    return {
      orderStateIndex,
      pageIndex,
      evaPage,
      deleteOrder,
      active,
    };
  },
};
</script>
<style lang="less" scoped>
.order {
  width: 100%;
  background-color: white;
  position: relative;
  .example {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
