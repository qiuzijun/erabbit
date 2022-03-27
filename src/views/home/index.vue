<template>
  <div class="container">
    <AppBananr />
  </div>
  <!-- <div ref="box"> -->
  <XtxMore title="新鲜好物" name="新鲜出炉 品质靠谱" :data="list_1" />
  <XtxMore title="人气推荐" name="人气爆款 不容错过" :data="list_2" />
  <!-- </div> -->
  <HomeBrand />
  <HomeGoods v-for="item in list.slice(0, 4)" :key="item.id" :list="item" />
  <HomeSpecial />
</template>
<script setup>
import { reactive, toRefs, ref } from "@vue/reactivity";
import AppBananr from "../../components/bananr/bananr.vue";
import HomeBrand from "../../components/home-brand";
import HomeGoods from "../../components/home-goods.vue";
import HomeSpecial from "../../components/home-special.vue";
import { useIntersectionObserver } from "@vueuse/core";
import { getNew, hot } from "../../api/api";
import { computed } from "vue-demi";
import { useStore } from "vuex";
const box = ref(null);
const state = reactive({
  list_1: [],
  list_2: [],
});
const store = useStore();
const list = computed(() => {
  return store.state.category.list;
});
// 新鲜好物
const getNewList = async () => {
  let res;
  try {
    res = await getNew({
      limit: 4,
    });
  } catch (error) {
    console.log(error);
    return;
  }
  //console.log(res.result);
  state.list_1 = res.result;
};

// 人气推荐
const getHotList = async () => {
  let res;
  try {
    res = await hot({
      limit: 4,
    });
  } catch (error) {
    console.log(error);
    return;
  }
  //console.log(res.result);
  state.list_2 = res.result;
};
// 新鲜好物
getNewList();
// 人气推荐
getHotList();
// // stop 是停止观察是否进入或移出可视区域的行为
// const { stop } = useIntersectionObserver(box, ([{ isIntersecting }]) => {
//   if (isIntersecting) {
//     stop();
//     // 新鲜好物
//     getNewList();
//     // 人气推荐
//     getHotList();
//   }
// });
const { list_1, list_2 } = toRefs(state);
</script>
<style lang="less" scoped></style>
