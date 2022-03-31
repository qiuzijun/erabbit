<template>
  <div class="carts" ref="carts_h" @scroll="listScroll">
    <ul ref="ul_h">
      <li v-for="item in list" :key="item.id">
        <a href="#">
          <img v-lazyload="item.picture" alt="" width="80px" height="80px" />
          <div class="content">
            <p>{{ item.name }}</p>
            <p>{{ item.attrsText }}</p>
          </div>
          <div class="right">
            <p>￥{{ item.price }}</p>
            <p>x{{ item.count }}</p>
          </div>
          <div class="delete" @click="deleteCart(item.skuId)">
            <CloseOutlined />
          </div>
        </a>
      </li>
    </ul>
  </div>
  <div class="scrollBody" ref="scrollBody_h" :class="active ? 'active' : ''">
    <div
      class="scrollContent"
      ref="scrollContent_h"
      @mousedown="songSheetMouseMove"
    ></div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
export default {
  name: "Cart",
  components: {
    CloseOutlined,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const active = ref(false);
    const carts_h = ref(null);
    const ul_h = ref(null);
    const scrollBody_h = ref(null);
    const scrollContent_h = ref(null);
    const store = useStore();
    const isActive = () => {
      const cartsH = carts_h.value.offsetHeight;
      const ulH = ul_h.value.offsetHeight;
      if (ulH <= cartsH) active.value = true;
      else active.value = false;
    };
    //
    // 删除购物车
    const deleteCart = (id) => {
      store.dispatch("cart/deleteList", [id]);
    };
    // 计算滚动条高度
    const rollerHeight = () => {
      const cartsH = carts_h.value.offsetHeight;
      const ulH = ul_h.value.offsetHeight;
      const scrollBodyH = scrollBody_h.value.offsetHeight;
      scrollContent_h.value.style.height = (cartsH / ulH) * scrollBodyH + "px";
    };
    // 滚轮事件
    const listScroll = (e) => {
      const cartsH = carts_h.value.offsetHeight;
      const ulH = ul_h.value.offsetHeight;
      const scrollContentH = scrollContent_h.value.offsetHeight;
      scrollContent_h.value.style.top =
        (e.target.scrollTop * (cartsH - 10 - scrollContentH)) /
          (ulH - cartsH - 10) +
        "px";
    };
    //拖拽滚轮
    const songSheetMouseMove = (e) => {
      const cartsH = carts_h.value.offsetHeight;
      const ulH = ul_h.value.offsetHeight;
      const scrollContentH = scrollContent_h.value.offsetHeight;
      let e_y_1 = e.pageY;
      document.onmousemove = (e) => {
        let e_y_2 = e.pageY;
        let y = e_y_2 - e_y_1;
        scrollContent_h.value.style.top = y + "px";
        // 判断上边界
        if (y < 0) {
          scrollContent_h.value.style.top = 0 + "px";
        }
        // 判断下边界
        if (scrollContentH + y > cartsH) {
          scrollContent_h.value.style.top = cartsH - scrollContentH + "px";
        }
        // 计算列表滚动
        carts_h.value.scrollTop =
          ((ulH - cartsH - 10) * y) / (cartsH - 10 - scrollContentH);
      };
      document.onmouseup = () => {
        document.onmousemove = null;
      };
    };
    onMounted(() => {
      isActive();
      rollerHeight();
    });
    return {
      active,
      carts_h,
      ul_h,
      scrollBody_h,
      scrollContent_h,
      listScroll,
      songSheetMouseMove,
      deleteCart,
    };
  },
};
</script>
<style lang="less" scoped>
.carts {
  height: 330px;
  overflow: auto;
  padding: 0 10px;
  position: relative;
  ul {
    li {
      width: 370px;
      height: 101px;
      padding: 10px;
      border-bottom: 1px solid #f5f5f5;
      margin: 0 auto;
      a {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          margin-bottom: 0px !important;
        }
        img {
          width: 80px;
          height: 80px;
        }
        .content {
          width: 200px;
          padding: 0 10px;
          p:first-child {
            font-size: 16px;
          }
          p:last-child {
            color: #999;
            margin-top: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .right {
          p:first-child {
            font-size: 16px;
            color: @priceColor;
          }
          p:last-child {
            color: #999;
            margin-top: 5px;
          }
        }
        .delete {
          opacity: 0;
          transition: all 0.2s;
          .anticon {
            color: #999;
            transition: all 0.2s;
            &:hover {
              color: black;
            }
          }
        }
      }
      &:hover {
        .delete {
          opacity: 1;
        }
      }
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
.scrollBody {
  width: 10px;
  height: 330px;
  background-color: #f8f8f8;
  border-radius: 10px;
  position: absolute;
  top: 10px;
  right: 0;
  .scrollContent {
    width: 10px;
    position: absolute;
    top: 0px;
    height: 100px;
    background-color: #eeeeee;
    border-radius: 10px;
    &:hover {
      background-color: #cccccc;
    }
  }
}
.active {
  display: none;
}
</style>
