// 轮播
<template>
  <div class="bananr" @mouseover="autoPlay = false" @mouseout="autoPlay = true">
    <ul class="appBan">
      <li
        v-for="(item, i) in list"
        :key="item.id"
        :class="index == i ? 'fade' : ''"
      >
        <img v-lazyload="item.imgUrl" alt="" />
      </li>
    </ul>
    <a
      href="javascript:;"
      class="carousel-btn prev"
      :class="autoPlay ? '' : 'active'"
      @click="left"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a
      href="javascript:;"
      class="carousel-btn next"
      :class="autoPlay ? '' : 'active'"
      @click="right"
      ><i class="iconfont icon-angle-right"></i
    ></a>
  </div>
  <ul class="d">
    <li
      v-for="(item, i) in list"
      :key="item.id"
      :style="{ backgroundColor: index == i ? 'white' : '' }"
    ></li>
  </ul>
</template>
<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { bananr } from "../../api/api";
import { watchEffect, onUnmounted, watch } from "vue";
const state = reactive({
  index: 0,
  list: [],
  autoPlay: true,
});

// 获取轮播图
const getBananr = async () => {
  let res;
  try {
    res = await bananr({});
  } catch (error) {
    console.log(error);
    return;
  }
  state.list = res.result;
};
// 获取轮播图
getBananr();
const left = () => {
  if (state.index == 0) {
    state.index = state.list.length - 1;
  } else {
    state.index--;
  }
};
const right = () => {
  if (state.index == state.list.length - 1) {
    state.index = 0;
  } else {
    state.index++;
  }
};
let timer = null;
const autoPlayFn = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    state.index++;
    if (state.index >= state.list.length) {
      state.index = 0;
    }
  }, 3000);
};
watch(
  () => state.autoPlay,
  (newName) => {
    if (newName) {
      autoPlayFn();
    } else {
      clearInterval(timer);
    }
  }
);

watchEffect(() => {
  let list = state.list;
  if (list.length > 0) {
    autoPlayFn();
  }
});
onUnmounted(() => {
  clearInterval(timer);
});
const { list, index, autoPlay } = toRefs(state);
</script>
<style lang="less" scoped>
.bananr {
  width: 1240px;
  height: 500px;
  margin: 0 auto;
  overflow: hidden;
  cursor: pointer;
  > ul {
    width: 100%;
    height: 100%;
    li {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
    }
    .fade {
      opacity: 1;
      z-index: 1;
    }
  }
}
.d {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  li {
    width: 10px;
    height: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    margin-right: 15px;
    cursor: pointer;
    float: left;
  }
}
.carousel {
  &-btn {
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.2);
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 228px;
    z-index: 1;
    text-align: center;
    line-height: 44px;
    opacity: 0;
    transition: all 0.5s;
    &.prev {
      left: 270px;
    }
    &.next {
      right: 20px;
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
.active {
  opacity: 1;
}
</style>
