<template>
  <a
    href="javascript:;"
    class="MyButton"
    :class="[border ? 'border' : '', Default ? 'active' : '']"
    @click="change(title)"
  >
    {{ title }}
  </a>
</template>
<script>
import { ref } from "vue";
export default {
  name: "MyButton",
  props: {
    title: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
      default: false,
    },
    Default: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const change = (title) => {};
    return {
      change,
    };
  },
};
</script>
<style lang="less" scoped>
.MyButton {
  color: #666 !important;
  text-align: center;
  border: 1px solid #e4e4e4;
  padding: 15px 20px;
  margin-right: 20px;
  display: block;
  &:hover {
    border: 1px solid @xtxColor;
  }
}
.border {
  color: rgb(153, 153, 153) !important ;
  border: none;
  &:hover {
    border: none;
  }
}
.active {
  border: 1px solid @xtxColor;
}
</style>
