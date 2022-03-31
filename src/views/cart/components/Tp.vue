<template>
  <div class="Tp">
    <p @click="active = true">删除</p>
    <teleport to="#app">
      <div class="mask" v-if="active">
        <div class="content">
          <div class="header">
            <p>温馨提示</p>
            <close-outlined
              :style="{ fontSize: '15px' }"
              @click="active = false"
            />
          </div>
          <div class="body">
            <p>
              <exclamation-circle-filled
                :style="{ color: '#cf4444' }"
              />亲，您是否确认删除商品
            </p>
          </div>
          <div class="footer">
            <button @click="active = false">取消</button>
            <button @click="Delete">确认</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { ExclamationCircleFilled, CloseOutlined } from "@ant-design/icons-vue";
export default {
  name: "Tp",
  components: {
    ExclamationCircleFilled,
    CloseOutlined,
  },
  props: {
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const active = ref(false);
    const store = useStore();
    // 删除单选商品
    const Delete = () => {
      store.dispatch("cart/deleteList", [props.skuId]);
      active.value = false;
    };
    return {
      active,
      Delete,
    };
  },
};
</script>
<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .content {
    width: 400px;
    height: 200px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    .header {
      display: flex;
      justify-content: space-between;
      p {
        font-weight: 400;
        font-size: 18px;
      }
      span {
        cursor: pointer;
      }
    }
    .body {
      padding: 20px 50px;
      p {
        font-size: 16px;
      }
    }
    .footer {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      button {
        width: 60px;
        height: 32px;
        color: white;
        border: none;
        border-radius: 5px;
        margin-left: 15px;
        cursor: pointer;
      }
      button:first-child {
        background-color: #cccccc;
      }
      button:last-child {
        background-color: @xtxColor;
      }
    }
  }
}
</style>
