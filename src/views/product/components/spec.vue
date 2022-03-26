<template>
  <div class="spec">
    <p class="name">美好即刻呈现富士手机照片打印机miniLink</p>
    <p class="desc">轻巧便携，高效出片</p>
    <p class="price">
      <span>72.00</span>
      <span>72.00</span>
    </p>
    <City />
  </div>
</template>
<script>
import City from "./city.vue";
export default {
  name: "Spec",
  components: {
    City,
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
}
</style>
