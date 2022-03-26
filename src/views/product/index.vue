<template>
  <div class="product">
    <Picture :img="list.mainPictures" />
    <Spec :list="list" />
  </div>
</template>
<script>
import Picture from "./components/picture.vue";
import Spec from "./components/spec.vue";
import { findProductGoods } from "../../api/product";
import { ref } from "vue";
export default {
  name: "Product",
  components: {
    Picture,
    Spec,
  },
  setup(props) {
    const list = ref([]);
    // 获取商品详情
    const getProductGoods = async () => {
      let res;
      try {
        res = await findProductGoods("1147023");
      } catch (error) {
        console.log(error);
        return;
      }
      const { result } = res;

      result.specs.forEach((element) => {
        element.specs = "";
      });
      result.skus.forEach((sku) => {
        const sortSpecs = [];
        result.specs.forEach((spec) => {
          sortSpecs.push(sku.specs.find((item) => item.name === spec.name));
        });
        sku.specs = sortSpecs;
      });
      console.log(result);
      list.value = result;
    };
    getProductGoods();
    return {
      list,
    };
  },
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
