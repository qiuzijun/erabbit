<template>
  <div class="product">
    <Picture :img="list.mainPictures" />
    <Spec :list="list" />
  </div>
  <Relevant :list="relevant" />
</template>
<script>
import Picture from "./components/picture.vue";
import Spec from "./components/spec.vue";
import Relevant from "./components/relevant.vue";
import { findProductGoods, findProductGoodsRelevant } from "../../api/product";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "Product",
  components: {
    Picture,
    Spec,
    Relevant,
  },
  setup(props) {
    const list = ref([]);
    const relevant = ref([]);
    const route = useRoute();
    // 获取商品详情
    const getProductGoods = async () => {
      let res;
      try {
        res = await findProductGoods(route.params.id);
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
    const getProductGoodsRelevant = async () => {
      let res;
      try {
        res = await findProductGoodsRelevant({
          id: route.params.id,
          limit: 16,
        });
      } catch (error) {
        console.log(error);
        return;
      }
      const { result } = res;
      console.log(result);
      relevant.value = result;
    };
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === "/product" + newVal) {
          list.value = [];
          getProductGoods();
          getProductGoodsRelevant();
        }
      }
    );
    getProductGoods();
    getProductGoodsRelevant();
    return {
      list,
      relevant,
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
