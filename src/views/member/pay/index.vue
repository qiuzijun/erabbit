<template>
  <div class="pay">
    <div class="success">
      <a-result status="success"></a-result>
      <div class="text" v-if="order !== null">
        <p>订单提交成功！请尽快完成支付。</p>
        <p v-if="order.countdown > -1">
          支付还剩 <span>{{ timeText }}</span
          >, 超时后将取消订单
        </p>
        <p v-else>订单已经超时</p>
      </div>
    </div>
    <p>
      应付总额：<span>￥{{ payable }}</span>
    </p>
  </div>
  <div class="payType">
    <h3>选择以下支付方式付款</h3>
    <h3>支付平台</h3>
    <ul>
      <li>
        <img
          src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg"
          alt=""
        />
      </li>
      <li>
        <img
          src="	https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png"
          alt=""
        />
      </li>
    </ul>
    <h3>支付方式</h3>
    <ul>
      <li>招商银行</li>
      <li>工商银行</li>
      <li>建设银行</li>
      <li>农业银行</li>
      <li>交通银行</li>
    </ul>
  </div>
</template>
<script>
import { Result } from "ant-design-vue";
import { useRoute } from "vue-router";
import { usePayTime } from "@/utils/time";
import { findOrderDetail } from "@/api/member";
import { computed, onMounted, ref } from "vue";
export default {
  name: "Pay",
  components: {
    AResult: Result,
  },
  setup() {
    const { start, timeText } = usePayTime();
    const route = useRoute();
    const order = ref(null);
    const payable = computed(() => route.query.pay);
    findOrderDetail(route.params.id).then((data) => {
      order.value = data.result;
      // 后端提供 countdown 倒计时秒数
      if (data.result.countdown > -1) {
        start(data.result.countdown);
      }
    });
    return {
      order,
      timeText,
      payable,
    };
  },
};
</script>
<style lang="less" scoped>
.pay {
  width: 100%;
  background-color: white;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .success {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .text {
      p:first-child {
        font-size: 20px;
      }
      p:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  > p {
    color: #999;
    font-size: 16px;
    padding: 48px 32px;
    span {
      font-size: 20px;
      color: @priceColor;
    }
  }
}
.payType {
  width: 100%;
  height: 400px;
  background-color: white;
  margin-top: 20px;
  padding: 0 32px;
  h3 {
    padding: 20px 0;
    border-bottom: 1px solid #f5f5f5;
  }
  ul {
    margin-top: 15px;
    overflow: auto;
    li {
      width: 150px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      float: left;
      cursor: pointer;
      img {
        display: block;
      }
      &:hover {
        border: 1px solid @xtxColor;
      }
    }
  }
}
/deep/.ant-result-success .ant-result-icon > .anticon {
  color: @xtxColor;
}
</style>
