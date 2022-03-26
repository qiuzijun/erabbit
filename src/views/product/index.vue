<template>
  <div class="product">
    <Picture />
    <Spec />
  </div>
</template>
<script>
import Picture from "./components/picture.vue";
import Spec from "./components/spec.vue";
export default {
  name: "Product",
  components: {
    Picture,
    Spec,
  },
  setup(props) {},
};
</script>
<style lang="less" scoped>
.product {
  width: 1240px;
  margin: 20px auto 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
}
</style>
