<template>
  <div class="subCheck">
    <div class="check" @click="checkClick_1" :class="inventory ? 'active' : ''">
      <i>
        <check-outlined v-if="inventory" />
      </i>
      <span>仅显示有货商品</span>
    </div>
    <div
      class="check"
      @click="checkClick_2"
      :class="onlyDiscount ? 'active' : ''"
    >
      <i>
        <check-outlined v-if="onlyDiscount" />
      </i>
      <span>仅显示特惠商品</span>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { CheckOutlined } from "@ant-design/icons-vue";
export default {
  name: "SubCheck",
  components: {
    CheckOutlined,
  },
  setup(props, { emit }) {
    const inventory = ref(false);
    const onlyDiscount = ref(false);

    const checkClick_1 = () => {
      inventory.value = !inventory.value;
      emit("inventory", inventory.value);
    };
    const checkClick_2 = () => {
      onlyDiscount.value = !onlyDiscount.value;
      emit("onlyDiscount", onlyDiscount.value);
    };

    return {
      inventory,
      onlyDiscount,
      checkClick_1,
      checkClick_2,
    };
  },
};
</script>
<style lang="less" scoped>
.subCheck {
  width: 350px;
  overflow: auto;
  .check {
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #999;
    margin-right: 50px;
    float: left;
    cursor: pointer;
    transition: all 0.2s;
    i {
      width: 16px;
      height: 16px;
      border: 1px solid #999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .active {
    color: @xtxColor;
    i {
      border: 1px solid @xtxColor;
    }
  }
}
</style>
