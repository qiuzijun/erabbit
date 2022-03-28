<template>
  <div class="page">
    <div class="content">
      <div
        class="topPage"
        @click="topPageClick"
        :class="active == 1 ? 'active' : ''"
      >
        上一页
      </div>
      <div class="ellipsis" v-if="topPage">...</div>
      <ul>
        <li
          v-for="(item, index) in num"
          :key="index"
          @click="numClick(item)"
          :class="active == item ? 'active' : ''"
        >
          {{ item }}
        </li>
      </ul>
      <div class="ellipsis" v-if="counts > 5 && num[4] !== counts">...</div>
      <div
        class="btnPage"
        :class="active == num[4] ? 'active' : ''"
        @click="btnPageClick"
      >
        下一页
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
export default {
  name: "Page",
  props: {
    counts: {
      type: Number,
      default: 10,
    },
  },
  setup(props, { emit }) {
    const num = ref([1, 2, 3, 4, 5]);
    const topPage = ref(false);
    const active = ref(1);
    const numClick = (i) => {
      active.value = i;
      emit("pageIndex", i);
      if (i > num.value[2] && num.value[4] !== props.counts) {
        num.value = num.value.map((data) => data + 1);
        console.log(num.value);
      } else if (i < num.value[2] && num.value[2] !== 3) {
        num.value = num.value.map((data) => data - 1);
      }
    };
    const topPageClick = () => {
      if (active.value == 1) {
        emit("pageIndex", active.value);
      }
      if (active.value > 1) {
        active.value--;
        emit("pageIndex", active.value);
        if (num.value[2] !== 3) {
          num.value = num.value.map((data) => data - 1);
        }
      }
    };
    const btnPageClick = () => {
      if (active.value !== num.value[4]) {
        active.value++;
        emit("pageIndex", active.value);
        if (num.value[4] !== props.counts) {
          num.value = num.value.map((data) => data + 1);
        }
      }
    };
    watch(num, (newVal) => {
      if (newVal[2] !== 3) {
        topPage.value = true;
      } else if (newVal[2] == 3) {
        topPage.value = false;
      }
    });
    return {
      num,
      numClick,
      topPageClick,
      btnPageClick,
      topPage,
      active,
    };
  },
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  .content {
    display: flex;
    .topPage {
      padding: 5px 15px;
      background-color: white;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      margin-right: 15px;
      cursor: pointer;
      &:hover {
        border: 1px solid @xtxColor;
      }
    }
    > .active {
      pointer-events: none;
      opacity: 0.4;
      &:hover {
        border: 1px solid #e4e4e4;
      }
    }
    .btnPage {
      padding: 5px 15px;
      background-color: white;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        border: 1px solid @xtxColor;
      }
    }
    .ellipsis {
      padding: 5px 15px;
      margin-right: 15px;
    }
    ul {
      margin-bottom: none !important;
      li {
        padding: 5px 15px;
        background-color: white;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
        margin-right: 15px;
        cursor: pointer;
        float: left;
        &:hover {
          border: 1px solid @xtxColor;
        }
      }
      .active {
        color: white;
        background: @xtxColor;
      }
    }
  }
}
</style>
