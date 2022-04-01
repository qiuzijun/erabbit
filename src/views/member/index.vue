<template>
  <div class="member">
    <div class="left">
      <MemberAside />
    </div>
    <div class="right">
      <router-view />
    </div>
  </div>
</template>
<script>
import MemberAside from "./components/member/memberAside.vue";
export default {
  name: "Member",
  components: {
    MemberAside,
  },
};
</script>
<style lang="less" scoped>
.member {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 220px;
  }
  .right {
    width: 1000px;
    // background-color: white;
  }
}
</style>
