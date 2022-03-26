<template>
  <div class="number">
    <span>数量</span>
    <div class="count">
      <div class="reduce" @click="count == 1 ? (count = 1) : count--">-</div>
      <p>{{ count }}</p>
      <div class="plus" @click="count++">+</div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  name: "Number",
  setup(props) {
    const count = ref(1);
    return {
      count,
    };
  },
};
</script>
<style lang="less" scoped>
.number {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  span {
    width: 50px;
    color: #999;
    margin-right: 15px;
    display: block;
  }
  .count {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    justify-content: space-between;
    .reduce,
    .plus {
      width: 30px;
      height: 30px;
      background-color: #e4e4e4;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
    p {
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
