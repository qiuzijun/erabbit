<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <!-- <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ topCategory.name }}</XtxBreadItem>
      </XtxBread> -->
      <!-- 轮播图 -->
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <router-link :to="`/category/sub/${item.id}`">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }} -</h3>
          <a href="#">
            <span> 查看全部</span>
            <i class="iconfont icon-angle-right"></i>
          </a>
        </div>
        <div class="body">
          <GoodsItem v-for="g in item.goods" :key="g.id" :goods="g" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GoodsItem from "./components/goods-item";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed, ref, watch } from "vue";
import { findTopCategory } from "../../api/category";
export default {
  name: "TopCategory",
  components: {
    GoodsItem,
  },
  setup() {
    // 面包屑+所有分类
    const store = useStore();
    const route = useRoute();
    const topCategory = computed(() => {
      let cate = {};
      const item = store.state.category.list.find((item) => {
        return item.id === route.params.id;
      });
      if (item) cate = item;
      return cate;
    });
    // 推荐商品
    const subList = ref([]);
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children;
      });
    };
    watch(
      () => route.params.id,
      (newVal) => {
        newVal && getSubList();
      },
      { immediate: true }
    );
    return {
      topCategory,
      subList,
    };
  },
};
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      h3 {
        width: 100%;
        height: 115px;
        font-size: 32px;
        font-weight: 400;
        line-height: 35px;
        margin-left: 6px;
        padding: 40px 0;
      }
      span {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
      a {
        margin-right: 15px;
        position: absolute;
        top: 48px;
        right: 0;
      }
      i {
        font-size: 16px;
        color: #999;
      }
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
