<template>
  <div class="sort" :class="showColor == index ? 'active' : ''">
    <p>{{ name }}</p>
  </div>
</template>
<script>
export default {
  name: "SubSort",
  props: {
    showColor: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
    },
    name: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    console.log(props);
  },
};
</script>
<style lang="less" scoped>
.sort {
  height: 30px;
  border-radius: 2px;
  border: 1px solid #e4e4e4;
  transition: all 0.3s;
  margin-right: 50px;
  cursor: pointer;
  float: left;
  p {
    line-height: 28px;
    padding: 0 20px;
    color: #999;
  }
}
.active {
  background-color: @xtxColor;
  border: 1px solid @xtxColor;

  p {
    color: white;
  }
}
</style>
