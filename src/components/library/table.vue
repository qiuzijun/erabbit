<template>
  <div class="table">
    <div class="thead">
      <p>
        <span>下单时间：{{ order.createTime }}</span>
        <span>订单编号：{{ order.id }}</span>
      </p>
      <p>
        <span v-if="order.countdown > -1">付款截止：{{ timeText }}</span>
        <span v-else @click="Delete" class="delete">删除</span>
      </p>
    </div>
    <div class="tbody">
      <div class="goods">
        <ul>
          <li v-for="data in order.skus" :key="data.id">
            <img v-lazyload="data.image" alt="" />
            <div class="text">
              <p>
                <span>{{ data.name }}</span>
                <span>¥{{ data.curPrice }}</span>
                <span>x{{ data.quantity }}</span>
              </p>
              <p>规格:{{ data.attrsText }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="state">
        <p>{{ orderState[order.orderState].name }}</p>
      </div>
      <div class="amount">
        <p>¥{{ order.payMoney }}</p>
        <p>（含运费：¥{{ order.postFee }}）</p>
        <p>在线支付</p>
      </div>
      <div class="action">
        <button v-if="order.countdown > -1">立即付款</button>
        <p>
          <RouterLink :to="`/member/order/${order.id}`"> 查看订单 </RouterLink>
        </p>
        <p>
          <a
            href="javascript:;"
            @click="active = true"
            v-if="order.countdown > -1"
          >
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
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { usePayTime } from "@/utils/time";
import { findOrderCancel, deleteOrderLists } from "@/api/member";
import { CloseOutlined } from "@ant-design/icons-vue";
import { toRefs } from "@vueuse/shared";
import { message } from "ant-design-vue";
export default {
  name: "Table",
  components: {
    CloseOutlined,
  },
  props: {
    order: {
      type: Object,
      default: () => ({}),
    },
    orderState: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const active = ref(false);
    const index = ref(-1);
    const cancelReason = ref("");
    const state = reactive({
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
    });
    const { start, timeText } = usePayTime();
    start(props.order.countdown);
    const cancelReasonClick = (id, name) => {
      index.value = id;
      cancelReason.value = name;
    };
    const close = () => {
      if (cancelReason.value == "") {
        message.warning("请选择取消订单的原因");
      } else {
        findOrderCancel({
          id: props.order.id,
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
    const Delete = () => {
      let id = props.order.id;
      deleteOrderLists({
        ids: [id],
      })
        .then((data) => {
          message.success("删除成功");
          emit("deleteOrderLists");
        })
        .catch((err) => {
          message.error("删除失败");
        });
    };
    return {
      index,
      timeText,
      active,
      cancelReasonClick,
      close,
      Delete,
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
.table {
  width: 100%;
  margin-top: 20px;
  border: 1px solid #f5f5f5;
  .thead {
    height: 50px;
    padding: 0 20px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin-bottom: 0px !important;
      .delete {
        color: #999;
        cursor: pointer;
      }
    }
    P:first-child {
      span {
        margin-right: 20px;
      }
    }
  }
  .tbody {
    display: flex;
    .goods {
      border-right: 1px solid #f5f5f5;
    }
    p {
      margin-bottom: 10px;
    }
    ul {
      li {
        width: 489px;
        padding: 20px;
        display: flex;
        justify-content: flex-start;
        img {
          width: 68px;
          height: 69px;
          margin-right: 10px;
        }
        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p:first-child {
            span {
              margin-right: 30px;
            }
          }
          p:last-child {
            color: #999;
          }
        }
      }
    }
    .state {
      width: 120px;
      padding: 20px;
      text-align: center;
      border-right: 1px solid #f5f5f5;
    }
    .amount {
      width: 200px;
      padding: 20px;
      text-align: center;
      border-right: 1px solid #f5f5f5;
      p:first-child {
        color: @priceColor;
      }
    }
    .action {
      width: 140px;
      padding: 20px;
      text-align: center;
      button {
        width: 100px;
        height: 32px;
        color: white;
        background-color: @xtxColor;
        border-radius: 4px;
        border: none;
        margin-bottom: 10px;
        cursor: pointer;
      }
      p {
        a {
          display: block;
          &:hover {
            color: @xtxColor !important;
          }
        }
      }
    }
  }
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
