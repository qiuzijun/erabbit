<template>
  <div class="nav">
    <div class="left">
      <ul>
        <li
          v-for="(item, i) in list"
          :key="item.id"
          @mouseover="listShow(i)"
          @mouseout="active = false"
        >
          <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
          <template v-if="item.children">
            <RouterLink
              :to="`/category/sub/${data.id}`"
              v-for="data in item.children"
              :key="data.id"
            >
              {{ data.name }}
            </RouterLink>
          </template>
          <span v-else>
            <XtxSkeleton
              width="60px"
              height="18px"
              style="margin-right: 5px"
              bg="rgba(255,255,255,0.2)"
            />
            <XtxSkeleton
              width="50px"
              height="18px"
              bg="rgba(255,255,255,0.2)"
            />
          </span>
        </li>
      </ul>
    </div>
    <div
      class="right"
      :class="active ? 'active' : ''"
      @mouseover="active = true"
      @mouseout="active = false"
    >
      <h4 v-if="index !== list.length - 1">
        分类推荐 <span>根据您的购买或浏览记录推荐</span>
      </h4>
      <h4 v-else>品牌推荐 <span>根据您的购买或浏览记录推荐</span></h4>
      <ul>
        <li v-for="item in list[index].goods" :key="item.id">
          <a href="#">
            <img v-lazyload="item.picture" :alt="item.name" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price" v-show="item.price"><i>¥</i>{{ item.price }}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, reactive, ref } from "vue";
import { brand } from "../../api/api";
const index = ref(0);
const active = ref(false);
const store = useStore();
const list = computed(() => {
  return store.state.category.list;
});
const listShow = (i) => {
  index.value = i;
  active.value = true;
};
</script>
<style lang="less" scoped>
.nav {
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  .left {
    width: 250px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    ul {
      li {
        width: 100%;
        height: 50px;
        padding-left: 30px;
        line-height: 50px;
        overflow: hidden;
        a {
          font-size: 12px;
          color: white !important;
          margin-right: 5px;
        }
        a:first-child {
          font-size: 16px;
          color: white;
        }
        &:hover {
          background-color: @xtxColor;
        }
      }
    }
  }
  .right {
    width: 990px;
    height: 100%;
    padding: 40px 20px 0px 20px;
    display: none;
    background-color: rgba(255, 255, 255, 0.6);
    h4 {
      font-size: 20px;
      font-weight: 400;
      span {
        font-size: 15px;
      }
    }
    ul {
      overflow: auto;
      margin-top: 20px;
      li {
        width: 310px;
        height: 120px;
        margin-right: 6px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        padding: 10px;
        float: left;
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            p {
              margin-bottom: 0 !important;
            }
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  .active {
    display: block;
  }
}
</style>
