<template>
  <div class="relevant">
    <div class="title">
      <i class="icon"></i>
      <h1>同类商品推荐</h1>
    </div>
    <div class="content">
      <div class="left" @click="active == 0 ? (active = 0) : active--"></div>
      <div class="ul">
        <ul
          v-for="(data, index) in uls"
          :key="index"
          :class="active == index ? 'active' : ''"
        >
          <li v-for="item in list.slice(data, data + 4)" :key="item.id">
            <RelevantList :list="item" />
          </li>
        </ul>
      </div>
      <div class="right" @click="active == 3 ? (active = 3) : active++"></div>
    </div>
    <ul>
      <li
        v-for="(item, index) in 4"
        :key="index"
        @click="active = index"
        :class="active == index ? 'active' : ''"
      ></li>
    </ul>
  </div>
</template>
<script>
import RelevantList from "./relevantList.vue";
import { ref } from "vue";
export default {
  name: "Relevant",
  components: {
    RelevantList,
  },
  props: {
    list: Array,
    default: () => [],
  },
  setup(props) {
    const active = ref(0);
    const uls = ref([0, 4, 8, 12]);
    return {
      active,
      uls,
    };
  },
};
</script>
<style lang="less" scoped>
.relevant {
  width: 100%;
  margin-top: 20px;
  background-color: white;
  padding: 30px;
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .icon {
      width: 16px;
      height: 16px;
      transform: rotate(45deg);
      border-top: 4px solid @xtxColor;
      border-right: 4px solid @xtxColor;
      display: inline-block;
      position: relative;
      line-height: 16px;
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: #bcf1e6;
      }
    }
    h1 {
      font-size: 20px;
      font-weight: 400;
      margin-left: 20px;
    }
  }
  .content {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 30px;
      height: 30px;
      border-top: 2px solid #999;
      border-left: 2px solid #999;
      transform: rotate(-45deg);
      cursor: pointer;
    }
    .ul {
      display: flex;
      flex-direction: column;
      ul {
        display: none;
        li {
          width: 220px;
          height: 300px;
          margin-right: 60px;
          float: left;
        }
      }
      .active {
        display: block;
      }
    }
    .right {
      width: 30px;
      height: 30px;
      border-top: 2px solid #999;
      border-right: 2px solid #999;
      transform: rotate(45deg);
      cursor: pointer;
    }
  }
  > ul {
    width: 100px;
    margin: 10px auto 0;
    li {
      width: 14px;
      height: 14px;
      background-color: #999;
      border-radius: 50%;
      margin-right: 10px;
      float: left;
      &:hover {
        background-color: @xtxColor;
        cursor: pointer;
      }
    }
    .active {
      background-color: @xtxColor;
    }
  }
}
</style>
