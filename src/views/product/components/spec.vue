<template>
  <div class="spec">
    <p class="name">{{ list.name }}</p>
    <p class="desc">{{ list.desc }}</p>
    <p class="price">
      <span>{{ list.price }}</span>
      <span>{{ list.oldPrice }}</span>
    </p>
    <City />
    <Specifications :specs="list.specs" :skus="list.skus" />
    <Number />
    <div class="button">加入购物车</div>
  </div>
</template>
<script>
import City from "./city.vue";
import Specifications from "./Specifications.vue";
import Number from "./number.vue";
import { ref } from "vue";
export default {
  name: "Spec",
  components: {
    City,
    Specifications,
    Number,
  },
  props: {
    list: Object,
    default: () => {},
  },
};
</script>
<style lang="less" scoped>
.spec {
  width: 660px;
  height: 600px;
  padding: 30px 30px 30px 0;
  > p {
    margin-bottom: 10px;
  }
  .name {
    font-size: 22px;
  }
  .desc {
    color: #999;
  }
  .price {
    span:first-child {
      font-size: 22px;
      color: @priceColor;
      margin-right: 5px;
      &::before {
        content: "¥";
        color: @priceColor;
        font-size: 12px;
      }
    }
    span:last-child {
      color: #999;
      text-decoration: line-through;
      &::before {
        content: "¥";
        color: #999;
        font-size: 12px;
      }
    }
  }
  .button {
    width: 180px;
    height: 50px;
    font-size: 16px;
    color: white;
    background-color: @xtxColor;
    text-align: center;
    line-height: 50px;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
  }
}
</style>
