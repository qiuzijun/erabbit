<template>
  <RouterLink :to="`/product/${list.id}`">
    <img v-lazyload="list.picture" :alt="list.name" />
    <p class="name">{{ list.name }}</p>
    <p class="desc">{{ list.desc }}</p>
    <p class="price">¥{{ list.price }}</p>
  </RouterLink>
</template>
<script>
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
export default {
  name: "RelevantList",
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const container = ref(null);
    useIntersectionObserver(
      container,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          console.log(1111);
        } else {
          console.log(2222);
        }
      },
      {
        threshold: 0,
      }
    );
  },
};
</script>
<style lang="less" scoped>
a {
  display: block;
  width: 220px;
  height: 300px;
  padding: 20px 30px;
  text-align: center;
  transition: all 0.5s;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
    text-align: center;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
  }
  .price {
    font-size: 20px;
    color: @priceColor;
  }
}
</style>
