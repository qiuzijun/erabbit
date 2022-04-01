<template>
  <div class="memberAside">
    <ul>
      <li v-for="item in memberList_1" :key="item.name">
        <h2>{{ item.name }}</h2>
        <RouterLink
          :to="data.key"
          v-for="data in item.children"
          :key="data.name"
          exact-active-class="active"
        >
          <p>{{ data.name }}</p>
        </RouterLink>
      </li>
      <li v-for="item in memberList_2" :key="item.name">
        <h2>{{ item.name }}</h2>
        <RouterLink
          :to="data.key"
          v-for="data in item.children"
          :key="data.name"
          active-class="active"
        >
          <p>{{ data.name }}</p>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
<script>
import { memberList_1, memberList_2 } from "./member";
import { ref } from "vue";
export default {
  name: "memberAside",
  setup(props) {
    return {
      memberList_1,
      memberList_2,
    };
  },
};
</script>
<style lang="less" scoped>
.memberAside {
  width: 100%;
  background-color: white;
  padding: 20px 0 20px 40px;
  ul {
    li {
      margin-top: 15px;
      border-bottom: 1px solid #f5f5f5;
      a {
        font-size: 14px;
        color: #666 !important;
        margin-bottom: 15px;
        display: block;
        position: relative;
        p {
          margin-bottom: 0px !important;
        }
        &:hover {
          color: @xtxColor !important;
        }
      }
      .active {
        color: @xtxColor !important;
        &::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: @xtxColor;
          position: absolute;
          top: 8px;
          left: -15px;
        }
      }
    }
  }
}
</style>
