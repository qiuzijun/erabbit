<template>
  <template v-if="data.length">
    <div class="container">
      <div class="content">
        <h3>
          {{ title }}
          <span>{{ name }}</span>
          <template v-if="title == '新鲜好物'">
            <a href="#">
              <span> 查看全部</span>
              <i class="iconfont icon-angle-right"></i>
            </a>
          </template>
        </h3>
        <transition name="fade">
          <ul v-if="data.length">
            <li v-for="item in data" :key="item.id">
              <a href="#">
                <img v-lazyload="item.picture" :alt="item.name" />
                <template v-if="item.price">
                  <p>{{ item.name }}</p>
                  <p>¥{{ item.price }}</p>
                </template>
                <template v-else>
                  <p>{{ item.title }}</p>
                  <p>{{ item.alt }}</p>
                </template>
              </a>
            </li>
          </ul>
          <HomeSkeleton bg="#f0f9f4" v-else />
        </transition>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="container" style="background-color: #f5f5f5">
      <div class="content">
        <h3>
          {{ title }}
          <span>{{ name }}</span>
          <div class="right" style="float: right; margin-right: 6px">
            <slot name="right" />
          </div>
        </h3>
        <slot />
      </div>
    </div>
  </template>
</template>
<script>
import { ref } from "@vue/reactivity";
export default {
  name: "XtxMore",
  props: {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return {};
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  background-color: white;
  .content {
    width: 1240px;
    height: 541px;
    margin: 0 auto;
    h3 {
      width: 100%;
      height: 115px;
      font-size: 32px;
      font-weight: 400;
      line-height: 35px;
      margin-left: 6px;
      padding: 40px 0;
      span {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
      a {
        margin-right: 15px;
        float: right;
      }
      i {
        font-size: 16px;
        color: #999;
      }
    }
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        width: 306px;
        height: 406px;
        background-color: #f0f9f4;
        .hoverShadow();
        a {
          p {
            font-size: 22px;
            padding: 12px 30px 0 30px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p:last-child {
            color: @priceColor;
          }
        }
      }
    }
  }
}
</style>
