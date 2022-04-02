<template>
  <div class="address">
    <div class="left">
      <div class="text" v-if="addressShow">
        <p>收货人：{{ userAddresses.receiver }}</p>
        <p>联系方式：{{ userAddresses.contact }}</p>
        <p>收货地址：{{ userAddresses.fullLocation }}</p>
      </div>
      <div class="noAddress" v-else>请添加地址</div>
      <a class="del" @click="active = true">
        修改地址
        <teleport to="#app">
          <div class="mask" v-if="active">
            <button @click="active = false">取消</button>
          </div>
        </teleport>
      </a>
    </div>
    <div class="right">
      <div class="switch">切换地址</div>
      <div class="add">添加地址</div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
export default {
  name: "Address",
  props: {
    userAddresses: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const active = ref(false);
    const addressShow = ref(false);
    watch(
      () => props.userAddresses,
      (newVal) => {
        if (newVal) {
          addressShow.value = true;
        }
      },
      { deep: true }
    );
    return {
      active,
      addressShow,
    };
  },
};
</script>
<style lang="less" scoped>
.address {
  width: 100%;
  height: 150px;
  border: 1px solid #f5f5f5;
  margin-top: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 800px;
    height: 100%;
    padding: 30px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .del {
      color: @xtxColor !important;
      height: 100%;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
      padding-right: 15px;
      display: block;
    }
    .noAddress {
      width: 600px;
      margin-top: 15px;
      margin-bottom: 20px;
      text-align: center;
      line-height: 150pc;
    }
  }
  .right {
    width: 420px;
    height: 100%;
    padding: 10px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .switch,
    .add {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      color: #666;
      appearance: none;
      border: none;
      outline: none;
      background: #fff;
      text-align: center;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
