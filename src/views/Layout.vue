<template>
  <!-- 顶部 -->
  <AppTopnav />
  <!-- 头部 -->
  <AppHeader />
  <main>
    <router-view />
  </main>
  <!-- 底部 -->
  <AppFooter />
</template>
<script setup>
import AppTopnav from "@/components/app-topnav";
import AppHeader from "@/components/app-header";
import AppFooter from "@/components/app-footer";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const store = useStore();
store.dispatch("category/getList");
</script>
<style lang="less" scoped>
main {
  width: 1240px;
  margin: 0 auto;
}
</style>
