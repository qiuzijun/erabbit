<template>
  <div class="table">
    <div class="thead">
      <p>
        <span>下单时间：{{ order.createTime }}</span>
        <span>订单编号：{{ order.id }}</span>
      </p>
      <p>
        <span v-if="order.countdown > -1">付款截止：{{ timeText }}</span>
        <span v-else>删除</span>
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
        <button>立即付款</button>
        <p>
          <RouterLink to="/member/order/41453543"> 查看订单 </RouterLink>
        </p>
        <p>
          <a href="javascript:;"> 取消订单 </a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { usePayTime } from "@/utils/time";
export default {
  name: "Table",
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
  setup(props) {
    console.log(props.order);
    const { start, timeText } = usePayTime();
    start(props.order.countdown);
    return { timeText };
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
    }
    P:first-child {
      span {
        margin-right: 20px;
      }
    }
  }
  .tbody {
    display: flex;
    p {
      margin-bottom: 10px;
    }
    ul {
      li {
        width: 489px;
        padding: 20px;
        border-right: 1px solid #f5f5f5;
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
</style>
