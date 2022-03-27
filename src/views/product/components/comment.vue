<template>
  <div class="Comment">
    <div class="eva">
      <div class="left">
        <p>
          <span>{{ eva.salesCount }}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{ eva.praisePercent }}</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="right">
        <p>大家都在说:</p>
        <ul>
          <li
            v-for="(item, index) in eva.tags"
            :key="index"
            :class="[active == index ? 'active' : '']"
            @click="filterName(index, item.title)"
          >
            {{ item.title }}({{ item.tagCount }})
          </li>
        </ul>
      </div>
    </div>
    <div class="filter">
      <ul>
        <li v-for="item in filter" :key="item.name">
          {{ item.name }}:
          <span
            v-for="(data, index) in item.children"
            :key="data.name"
            @click="filterHot(index, data.sortField)"
            :class="hot == index ? 'hot' : ''"
          >
            {{ data.name }}
          </span>
        </li>
      </ul>
    </div>
    <CommentList v-for="item in evaPage.items" :key="item.id" :items="item" />
    <Page :counts="evaPage.counts" @pageIndex="pageIndex" />
  </div>
</template>
<script>
import { reactive, ref } from "vue-demi";
import CommentList from "./commentList.vue";
import Page from "./page.vue";
export default {
  name: "Comment",
  components: {
    CommentList,
    Page,
  },
  props: {
    eva: {
      type: Object,
      default: () => {},
    },
    evaPage: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const active = ref(0);
    const hot = ref(0);
    const state = reactive({
      filter: [
        {
          name: "排序",
          children: [
            {
              name: "默认",
              sortField: null,
            },
            {
              name: "最新",
              sortField: "createTime",
            },
            {
              name: "最热",
              sortField: "praiseCount",
            },
          ],
        },
      ],
    });
    const filterName = (i, name) => {
      active.value = i;
      console.log(name);
      emit("filterName", name);
    };
    const filterHot = (i, name) => {
      hot.value = i;
      console.log(name);
      emit("filterHot", name);
    };
    const pageIndex = (i) => {
      emit("pageIndex", i);
    };
    return {
      ...state,
      active,
      hot,
      filterName,
      filterHot,
      pageIndex,
    };
  },
};
</script>
<style lang="less" scoped>
.Comment {
  background-color: white;
  padding: 0 40px;
  .eva {
    padding: 25px 0px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    .left {
      width: 340px;
      height: 120px;
      padding: 30px 30px 0 30px;
      border-right: 1px solid #f5f5f5;
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        flex-direction: column;
        text-align: center;
        span:first-child {
          font-size: 32px;
          color: @priceColor;
        }
        span:last-child {
          color: #999;
        }
      }
    }
    .right {
      width: 600px;
      display: flex;
      > p {
        width: 200px;
        font-weight: bold;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 132px;
          height: 42px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          font-size: 16px;
          color: #999;
          text-align: center;
          line-height: 42px;
          margin-right: 9px;
          cursor: pointer;
        }
        .active {
          border: 1px solid @xtxColor;
          background: @xtxColor;
          color: white;
        }
      }
    }
  }
  .filter {
    height: 50px;
    border-bottom: 1px solid #f5f5f5;
    ul {
      li {
        line-height: 50px;
        span {
          margin-left: 30px;
          &:hover {
            color: @xtxColor;
            cursor: pointer;
          }
        }
        .hot {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
