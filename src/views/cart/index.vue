<template>
  <div class="table">
    <div class="thead">
      <ul>
        <li
          v-for="item in thead"
          :key="item.text"
          :style="{
            width: item.width + 'px',
            height: item.height + 'px',
            color: item.color,
          }"
        >
          <a-checkbox
            v-if="item.text == '全选'"
            v-model:checked="checked"
            @change="checkbox"
          ></a-checkbox>
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="tbody">
      <ul>
        <li v-for="item in list" :key="item.skuId">
          <div class="q_x">
            <a-checkbox
              ref="checkboxS"
              @change="checkboxAll($event, item.skuId)"
            ></a-checkbox>
          </div>
          <div class="x_x">
            <img v-lazyload="item.picture" alt="" />
            <div class="name">
              <p>{{ item.name }}</p>
              <p>{{ item.attrsText }}</p>
            </div>
          </div>
          <div class="d_j">
            <p>¥{{ item.price }}</p>
          </div>
          <div class="s_l">
            <div class="numbox">
              <div class="left">-</div>
              <div class="content">{{ item.count }}</div>
              <div class="right">+</div>
            </div>
          </div>
          <div class="x_j">¥{{ item.count * item.price * 1 }}</div>
          <div class="c_z">删除</div>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <div class="left">
      <a-checkbox @change="checkbox"></a-checkbox>
      <span>全选</span>
      <span>删除商品</span>
    </div>
    <div class="right">
      <div class="count">
        <span>共 {{ count }} 件商品，</span>
        <span>已选择 7 件，</span>
        <span>
          商品合计：
          <span> ¥{{ priceAll }}</span>
        </span>
      </div>
      <div class="button">下单结算</div>
    </div>
  </div>
</template>
<script>
import { Checkbox } from "ant-design-vue";
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Cart",
  components: {
    ACheckbox: Checkbox,
  },
  setup() {
    const checked = ref(false);
    const checkboxS = ref(false);
    const count = ref(0);
    const priceAll = ref(0);
    const store = useStore();
    const list = computed(() => {
      return store.state.cart.list;
    });
    const thead = ref([
      {
        text: "全选",
        width: 120,
        height: 70,
        color: "#27ba9b",
      },
      {
        text: "商品信息",
        width: 400,
        height: 70,
        color: "#666",
      },
      {
        text: "单价",
        width: 220,
        height: 70,
        color: "#666",
      },
      {
        text: "数量",
        width: 180,
        height: 70,
        color: "#666",
      },
      {
        text: "小计",
        width: 180,
        height: 70,
        color: "#666",
      },
      {
        text: "操作",
        width: 140,
        height: 70,
        color: "#666",
      },
    ]);
    const checkbox = (e) => {
      const { checked } = e.target;
      const checkboxAll = checkboxS.value.checked;
      console.log(checked);
      console.log(checkboxAll);
    };
    const checkboxAll = (e, index) => {
      const { checked } = e.target;
      console.log(index);
      console.log(checked);
    };
    watch(
      () => store.state.cart.list,
      (newVal) => {
        count.value = 0;
        priceAll.value = 0;
        newVal.forEach((data) => {
          count.value += data.count;
          priceAll.value += data.price * 1 * data.count;
        });
      },
      { deep: true }
    );
    return {
      thead,
      list,
      count,
      priceAll,
      checked,
      checkbox,
      checkboxS,
      checkboxAll,
    };
  },
};
</script>
<style lang="less" scoped>
.table {
  width: 100%;
  margin-top: 20px;
  background-color: white;
  .thead {
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #f5f5f5;
    ul {
      display: flex;
      li {
        text-align: center;
        line-height: 50px;
        padding: 10px;
      }
    }
  }
  .tbody {
    width: 100%;
    ul {
      overflow: auto;
      li {
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        justify-content: space-between;
        .q_x {
          width: 120px;
          height: 120px;
          text-align: center;
          line-height: 100px;
          padding: 10px;
          .ant-checkbox-wrapper {
            margin-right: 32px;
          }
        }
        .x_x {
          width: 400px;
          height: 120px;
          padding: 10px;
          display: flex;
          .name {
            width: 280px;
            color: #666;
            font-size: 16px;
            padding-left: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            p:last-child {
              color: #999;
              font-size: 14px;
              border: 1px solid #f5f5f5;
              display: inline-block;
              cursor: pointer;
              &::after {
                content: "∨";
                font-size: 15px;
                margin-left: 10px;
              }
            }
          }
        }
        .d_j {
          width: 220px;
          height: 120px;
          text-align: center;
          line-height: 120px;
        }
        .s_l {
          width: 180px;
          height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .numbox {
            width: 100%;
            height: 30px;
            border: 1px solid #f5f5f5;
            display: flex;
            justify-content: space-between;
            .left {
              width: 30px;
              height: 30px;
              background: #f8f8f8;
              border-right: 1px solid #f5f5f5;
              text-align: center;
              line-height: 30px;
              cursor: pointer;
            }
            .content {
              text-align: center;
              line-height: 30px;
            }
            .right {
              width: 30px;
              height: 30px;
              background: #f8f8f8;
              border-left: 1px solid #f5f5f5;
              text-align: center;
              line-height: 30px;
              cursor: pointer;
            }
          }
        }
        .x_j {
          width: 180px;
          height: 120px;
          font-size: 18px;
          color: @priceColor;
          text-align: center;
          line-height: 120px;
        }
      }
      .c_z {
        width: 140px;
        height: 120px;
        font-size: 15px;
        color: @xtxColor;
        text-align: center;
        line-height: 120px;
        cursor: pointer;
      }
    }
  }
}
.footer {
  width: 100%;
  height: 80px;
  background-color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    margin-left: 24px;
    span {
      font-size: 15px;
      color: @xtxColor;
      cursor: pointer;
    }
    span:last-child {
      font-size: 15px;
      color: black;
      margin-left: 15px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    .count {
      font-size: 15px;
      margin-right: 15px;
      span:nth-child(3) {
        span {
          font-size: 18px;
          color: @priceColor;
        }
      }
    }
    .button {
      width: 180px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: white;
      font-size: 15px;
      font-weight: bold;
      background-color: @xtxColor;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
/deep/ .ant-checkbox-inner {
  border: 1px solid @xtxColor !important;
}
/deep/.ant-checkbox-checked .ant-checkbox-inner {
  background-color: @xtxColor;
}
</style>
