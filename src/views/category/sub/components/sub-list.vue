<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <RouterLink :to="`/product/${item.id}`">
        <img v-lazyload="item.picture" :alt="item.name" />
        <p class="name">{{ item.name }}</p>
        <p class="desc">{{ item.desc }}</p>
        <p class="price">¥{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
</template>
<script>
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
export default {
  name: "SubList",
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
          //console.log(1111);
        } else {
          //console.log(2222);
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
ul {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  li {
    .hoverShadow();
    margin-right: 20px;
    margin-bottom: 20px;
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
  }
}
</style>
