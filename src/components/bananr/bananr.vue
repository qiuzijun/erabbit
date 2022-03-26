<template>
  <div class="bananrContent">
    <Bananr />
    <BananrNav />
  </div>
</template>
<script setup>
import Bananr from "./app-bananr.vue";
import BananrNav from "./app-bananr-nav.vue";
import { reactive, ref, toRefs } from "@vue/reactivity";
const state = reactive({
  autoPlay: true,
});
</script>
<style lang="less" scoped>
.bananrContent {
  //   cursor: pointer;
}
</style>
