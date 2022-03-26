<template>
  <XtxMore title="热门品牌" name="国际经典 品质保证">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        @click="toggle(1)"
        href="javascript:;"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <div class="box" ref="box">
      <ul class="list" :style="{ transform: `translateX(${-index * 1240}px)` }">
        <li v-for="item in brands" :key="item.id">
          <RouterLink to="/">
            <img v-lazyload="item.picture" alt="" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </XtxMore>
</template>
<script>
import { ref } from "vue";
import { brand } from "@/api/api";
// import { useLazyData } from "@/hooks";
export default {
  name: "HomeBrand",
  setup() {
    // 获取数据
    const brands = ref([]);
    brand(10).then((data) => {
      brands.value = data.result;
    });

    // 切换效果，前提只有 0 1 两页
    const index = ref(0);
    // 1. 点击上一页
    // 2. 点击下一页
    const toggle = (step) => {
      const newIndex = index.value + step;
      if (newIndex < 0 || newIndex > 1) return;
      index.value = newIndex;
    };
    return { brands, toggle, index };
  },
};
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -7px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      .hoverShadow();
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
