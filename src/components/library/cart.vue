<template>
  <div class="carts" ref="carts_h" @scroll="listScroll">
    <ul ref="ul_h">
      <li v-for="(item, index) in 5" :key="index">
        <a href="#">
          <img
            src="https://yanxuan-item.nosdn.127.net/50db51cb0a25b0d346ce62b22b5e0f92.png"
            alt=""
            width="80px"
            height="80px"
          />
          <div class="content">
            <p>拼色更童趣，儿童撞色T恤110-160cm</p>
            <p>颜色:藏青 C尺码:160cm</p>
          </div>
          <div class="right">
            <p>￥79.00</p>
            <p>x2</p>
          </div>
          <div class="delete">
            <CloseOutlined />
          </div>
        </a>
      </li>
    </ul>
  </div>
  <div class="scrollBody" ref="scrollBody_h">
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
export default {
  name: "Cart",
  components: {
    CloseOutlined,
  },
  setup(props) {
    const carts_h = ref(null);
    const ul_h = ref(null);
    const scrollBody_h = ref(null);
    const scrollContent_h = ref(null);
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
      rollerHeight();
    });
    return {
      carts_h,
      ul_h,
      scrollBody_h,
      scrollContent_h,
      listScroll,
      songSheetMouseMove,
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
</style>
