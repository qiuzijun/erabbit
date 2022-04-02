<template>
  <div class="checkout">
    <h3>收货地址</h3>
    <Address :userAddresses="defaultAddresser" />
    <h3>商品信息</h3>
    <div class="table">
      <Table :columns="columns" :data="data" />
    </div>
    <h3>配送时间</h3>
    <div class="time">
      <MyButton title="不限送货时间：周一至周日" :Default="true" />
      <MyButton title="工作日送货：周一至周五" />
      <MyButton title="双休日、假日送货：周六至周日" />
    </div>
    <h3>支付方式</h3>
    <div class="payment">
      <MyButton title="在线支付" :Default="true" />
      <MyButton title="货到付款" />
      <MyButton title="货到付款需付5元手续费" :border="true" />
    </div>
    <h3>金额明细</h3>
    <div class="details">
      <Details :data="data" />
    </div>
    <div class="Submit">
      <button>提交订单</button>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from "vue";
import { toRefs } from "@vueuse/shared";
import { useStore } from "vuex";
import Details from "./components/details.vue";
import Address from "./components/address.vue";
import { memberOrderPre } from "@/api/member";
export default {
  name: "Checkout",
  components: {
    Details,
    Address,
  },
  setup(props) {
    const store = useStore();
    const state = reactive({
      columns: [
        {
          title: "商品信息",
          key: "goods",
          width: 520,
          height: 60,
        },
        {
          title: "单价",
          key: "price",
          width: 170,
          height: 60,
        },
        {
          title: "数量",
          key: "number",
          width: 170,
          height: 60,
        },
        {
          title: "小计",
          key: "subtotal",
          width: 170,
          height: 60,
        },
        {
          title: "实付",
          key: "paid",
          width: 170,
          height: 60,
        },
      ],
      userAddresses: [],
      defaultAddresser: {},
    });
    const data = computed(() => {
      return store.state.cart.list.filter((data) => {
        return data.selected == true;
      });
    });
    // console.log(data);
    const getMemberOrderPre = () => {
      memberOrderPre()
        .then(({ result }) => {
          state.userAddresses = result.userAddresses;
          result.userAddresses.forEach((data) => {
            if (data.isDefault == 0) {
              state.defaultAddresser = data;
            }
          });
        })
        .catch((err) => {});
    };
    getMemberOrderPre();
    return {
      data,
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
.checkout {
  width: 100%;
  background-color: white;
  margin-top: 20px;
  padding: 20px 15px;
  h3 {
    font-size: 18px;
    padding: 0 0 15px 0;
    border-bottom: 1px solid #f5f5f5;
  }
  .table {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .time,
  .payment {
    display: flex;
    margin-bottom: 20px;
  }
  .details {
    padding: 20px 50px;
    overflow: auto;
    border-bottom: 1px solid #f5f5f5;
  }
  .Submit {
    width: 100%;
    height: 90px;
    padding: 20px 50px;
    button {
      width: 180px;
      font-size: 16px;
      text-align: center;
      line-height: 50px;
      background: #27ba9b;
      border: none;
      border-radius: 4px;
      color: #fff;
      float: right;
      cursor: pointer;
    }
  }
}
</style>
