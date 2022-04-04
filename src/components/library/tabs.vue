<template>
  <div class="tabs">
    <ul>
      <li
        v-for="item in orderState"
        :key="item.id"
        :class="active == item.id ? 'active' : ''"
        @click="pageIndex(item.id)"
      >
        {{ item.name }}
      </li>
      <div class="li"></div>
    </ul>
    <div class="content">
      <Table
        v-for="item in list"
        :key="item.id"
        :order="item"
        :orderState="orderState"
      />
    </div>
  </div>
</template>
<script>
import { reactive, ref } from "vue";
import { toRefs } from "@vueuse/shared";
import Table from "./table.vue";
export default {
  name: "Tabs",
  components: {
    Table,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const active = ref(0);
    const state = reactive({
      orderState: [
        {
          id: 0,
          name: "全部",
        },
        {
          id: 1,
          name: "待付款",
        },
        {
          id: 2,
          name: "待发货",
        },
        {
          id: 3,
          name: "待收货",
        },
        {
          id: 4,
          name: "待评价",
        },
        {
          id: 5,
          name: "已完成",
        },
        {
          id: 6,
          name: "已取消",
        },
      ],
    });
    const pageIndex = (id) => {
      active.value = id;
      emit("pageIndex", id);
    };
    return {
      active,
      pageIndex,
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
.tabs {
  > ul {
    overflow: auto;
    li {
      width: 110px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border-right: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;
      box-sizing: border-box;
      float: left;
      cursor: pointer;
    }
    .li {
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #f5f5f5;
    }
    .active {
      line-height: 56px;
      border-top: 2px solid @xtxColor;
      border-bottom: 1px solid transparent;
      background: #fff;
    }
  }
  .content {
    width: 100%;
    padding: 0 15px 20px;
  }
}
</style>
