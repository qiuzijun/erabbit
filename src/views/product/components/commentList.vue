<template>
  <div class="commentList" v-if="items">
    <div class="user">
      <img v-lazyload="items.member.avatar" :alt="items.member.nickname" />
      <span>{{ items.member.nickname }}</span>
    </div>
    <div class="text">
      <div class="score">
        <star-filled
          :style="{ color: '#ff9240' }"
          v-for="(item, index) in items.score"
          :key="index"
        />
        <star-outlined
          :style="{ color: '#ff9240' }"
          v-for="(item, index) in 5 - items.score"
          :key="index"
        />
        <span v-for="item in items.orderInfo.specs" :key="item.nameValue">
          {{ item.name }}:{{ item.nameValue }}
        </span>
      </div>
      <p>
        {{ items.content }}
      </p>
      <ul v-if="items.pictures">
        <li
          v-for="(item, index) in items.pictures"
          :key="index"
          @click="imgMax = item"
        >
          <img v-lazyload="item" alt="" />
        </li>
      </ul>
      <div class="imgMax" v-if="imgMax">
        <div class="close" @click="imgMax = null">
          <close-outlined :style="{ fontSize: '50px' }" />
        </div>
        <img :src="imgMax" alt="" />
      </div>
      <div class="time">
        <p>{{ items.createTime }}</p>
        <p>
          <like-outlined />
          <span>{{ items.praiseCount }}</span>
        </p>
      </div>
    </div>
  </div>
  <div class="skeleton" v-else>
    <a-skeleton avatar active />
  </div>
</template>
<script>
import { ref } from "vue";
import {
  StarFilled,
  StarOutlined,
  LikeOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import { Skeleton } from "ant-design-vue";
import "ant-design-vue/es/skeleton/style/css";
export default {
  name: "CommentList",
  components: {
    StarFilled,
    StarOutlined,
    ASkeleton: Skeleton,
    LikeOutlined,
    CloseOutlined,
  },
  props: {
    items: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const num = ref(1);
    const imgMax = ref(null);
    return {
      num,
      imgMax,
    };
  },
};
</script>
<style lang="less" scoped>
.commentList {
  padding: 20px;
  color: #666;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  .user {
    width: 160px;
    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
  }
  .text {
    width: 720px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .score,
    > p,
    ul,
    .time {
      margin-bottom: 15px;
    }
    .score {
      span {
        margin-right: 5px;
      }
    }
    ul {
      overflow: auto;
      li {
        width: 120px;
        height: 120px;
        border: 1px solid #f5f5f5;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        float: left;
      }
    }
    .imgMax {
      width: 478px;
      height: 478px;
      border: 1px solid #f5f5f5;
      background-color: #f8f8f8;
      cursor: pointer;
      position: relative;
      .close {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 0;
        transition: all 0.2s;
        &:hover {
          color: white;
        }
      }
    }
    .time {
      display: flex;
      justify-content: space-between;
    }
  }
}
.skeleton {
  width: 100%;
  height: 150px;
}
</style>
