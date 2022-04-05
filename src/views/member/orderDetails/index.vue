<template>
  <div class="orderDetails" v-if="data.id">
    <div class="top">
      <div class="details">
        <div class="money">
          <img src="../../../assets/images/finance.png" alt="" />
          <p>{{ orderState[data.orderState].name }}</p>
        </div>
        <div class="text">
          <p>订单编号：{{ data.id }}</p>
          <p>下单时间：{{ data.createTime }}</p>
        </div>
      </div>
      <div class="button" v-if="data.orderState !== 1">再次购买</div>
      <div class="buttons" v-else>
        <button>立即付款</button>
        <button @click="active = true">
          取消订单
          <teleport to="#app">
            <div class="mask" v-if="active">
              <div class="content">
                <h3>
                  取消订单
                  <close-outlined @click="active = false" />
                </h3>
                <div class="text">
                  <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
                  <p class="tip">请选择取消订单的原因（必选）：</p>
                  <ul>
                    <li
                      v-for="item in cancelReason"
                      :key="item.id"
                      @click="cancelReasonClick(item.id, item.name)"
                      :class="index == item.id ? 'active' : ''"
                    >
                      {{ item.name }}
                    </li>
                  </ul>
                  <div class="submit">
                    <button @click="active = false">取消</button>
                    <button @click="close">确定</button>
                  </div>
                </div>
              </div>
            </div>
          </teleport>
        </button>
      </div>
    </div>
    <Steps :createTime="data.createTime" :orderState="data.orderState" />
    <h3>订单商品</h3>
    <Table :columns="columns" :data="data.skus" />
    <h3>收货信息</h3>
    <div class="text">
      <p>
        <span>收货人：</span><span>{{ data.receiverContact }}</span>
      </p>
      <p>
        <span>联系方式：</span><span>{{ data.receiverMobile }}</span>
      </p>
      <p>
        <span>收货地址：</span><span>{{ data.receiverAddress }}</span>
      </p>
    </div>
    <h3>支付方式及送货时间</h3>
    <div class="text">
      <p>
        <span>支付方式：</span
        ><span>{{ data.payChannel == 1 ? "支付宝" : "微信" }}</span>
      </p>
      <p>
        <span>送货时间：</span><span>双休日、假日送货(适合于家庭地址)</span>
      </p>
    </div>
    <h3>发票信息</h3>
    <div class="text">
      <p><span>发票类型：</span><span>电子发票</span></p>
      <p><span>发票内容：</span><span>日用品</span></p>
      <p><span>发票抬头：</span><span>个人</span></p>
    </div>
    <h3>订单信息</h3>
    <div class="text">
      <p><span>订单编号：</span><span>在线支付</span></p>
      <p>
        <span
          >下单时间：<span>{{ data.createTime }}</span></span
        >
      </p>
    </div>
    <div class="money">
      <Details :data="data" />
    </div>
  </div>
  <div class="example" v-else>
    <a-spin size="large" />
  </div>
</template>
<script>
import { reactive, watch, ref } from "vue-demi";
import Steps from "./components/Steps.vue";
import { toRefs } from "@vueuse/shared";
import { useRoute } from "vue-router";
import { findOrderDetail, findOrderCancel } from "@/api/member";
import { Spin, message } from "ant-design-vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import Details from "./components/details.vue";
export default {
  name: "orderDetails",
  components: {
    Steps,
    ASpin: Spin,
    CloseOutlined,
    Details,
  },
  setup() {
    const active = ref(false);
    const index = ref(-1);
    const cancelReason = ref("");
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
      orderState: [
        {
          id: 0,
          name: "全部",
        },
        {
          id: 1,
          name: "待付款",
        },
        {
          id: 2,
          name: "待发货",
        },
        {
          id: 3,
          name: "待收货",
        },
        {
          id: 4,
          name: "待评价",
        },
        {
          id: 5,
          name: "已完成",
        },
        {
          id: 6,
          name: "已取消",
        },
      ],
      cancelReason: [
        {
          id: 0,
          name: "配送信息有误",
        },
        {
          id: 1,
          name: "商品买错了",
        },
        {
          id: 2,
          name: "重复下单/误下单",
        },
        {
          id: 3,
          name: "忘记使用优惠券、兔币等",
        },
        {
          id: 4,
          name: "其他渠道价格更低",
        },
        {
          id: 5,
          name: "不想买了",
        },
      ],
      data: {},
    });
    const route = useRoute();
    const cancelReasonClick = (id, name) => {
      index.value = id;
      cancelReason.value = name;
    };
    const close = () => {
      if (cancelReason.value == "") {
        message.warning("请选择取消订单的原因");
      } else {
        findOrderCancel({
          id: route.params.id,
          cancelReason: cancelReason.value,
        })
          .then(({ result }) => {
            message.success("取消成功");
            emit("deleteOrderLists");
          })
          .catch((err) => {
            message.error("取消失败");
          });
      }
    };

    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal) {
          findOrderDetail(newVal)
            .then(({ result }) => {
              console.log(result);
              state.data = result;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
      { immediate: true }
    );
    return {
      active,
      index,
      cancelReasonClick,
      close,
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
.orderDetails {
  padding: 60px 40px;
  background-color: white;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .details {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .money {
        text-align: center;
        margin-right: 100px;
        img {
          width: 40px;
          height: 40px;
          margin-bottom: 10px;
        }
      }
    }
    .button {
      width: 100px;
      height: 32px;
      color: white;
      text-align: center;
      line-height: 32px;
      border-radius: 4px;
      background: @xtxColor;
      cursor: pointer;
    }
    .buttons {
      button {
        width: 100px;
        height: 32px;
        color: white;
        text-align: center;
        line-height: 32px;
        border-radius: 4px;
        background: @xtxColor;
        border: none;
        cursor: pointer;
      }
      button:first-child {
        margin-right: 20px;
      }
      button:last-child {
        background: #ccc;
      }
    }
  }
  h3 {
    padding: 30px 0;
  }
  > .text {
    padding: 30px 20px;
    border: 1px solid #f5f5f5;
    p {
      span:first-child {
        color: #999;
      }
    }
  }
  .money {
    padding: 40px;
    overflow: auto;
  }
}
.example {
  width: 100%;
  height: 100%;
  text-align: center;
  background: white;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .content {
    width: 620px;
    height: 486px;
    border-radius: 4px;
    background-color: white;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;
    h3 {
      font-size: 18px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      .anticon {
        float: right;
      }
    }
    .text {
      padding: 20px;
      .tip {
        color: #999;
      }
      ul {
        overflow: auto;
        li {
          width: 256px;
          height: 45px;
          text-align: center;
          line-height: 45px;
          margin-right: 14px;
          margin-bottom: 20px;
          border: 1px solid #e4e4e4;
          float: left;
          cursor: pointer;
          &:hover {
            border: 1px solid @xtxColor;
          }
        }
        .active {
          border: 1px solid @xtxColor;
        }
      }
      .submit {
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          width: 180px;
          height: 50px;
          color: white;
          background: @xtxColor;
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }
        button:first-child {
          width: 180px;
          height: 50px;
          color: white;
          background: #e4e4e4;
          border-radius: 4px;
          border: none;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
