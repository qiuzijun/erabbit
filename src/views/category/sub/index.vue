<template>
  <div class="sub-category">
    <div class="container">
      <!-- 筛选区 -->
      <SubFilter @brandId="brandId" @getAttrs="getAttrs" />
      <div class="content">
        <div class="filter">
          <SubSort
            v-for="(item, index) in list"
            :key="item.sortField"
            @click="SubSortClick(index, item.sortField)"
            :showColor="showColor"
            :index="index"
            :name="item.name"
          />
          <SubCheck @inventory="inventory" @onlyDiscount="onlyDiscount" />
        </div>
        <SubList :list="Data" />
        <XtxInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </div>
    </div>
  </div>
</template>
<script>
import SubFilter from "./components/sub-filter";
import SubSort from "./components/sub-sort.vue";
import SubCheck from "./components/sub-check.vue";
import SubList from "./components/sub-list.vue";
import XtxInfiniteLoading from "./components/xtx-infinite-loading.vue";
import { findSubCategoryGoods } from "../../../api/category";
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "SubCategory",
  components: { SubFilter, SubSort, SubCheck, SubList, XtxInfiniteLoading },
  setup() {
    const route = useRoute();
    const showColor = ref(0);
    const Data = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const list = ref([
      {
        name: "默认排序",
        sortField: null,
      },
      {
        name: "最新商品",
        sortField: "publishTime",
      },
      {
        name: "最高人气",
        sortField: "orderNum",
      },
      {
        name: "评论最多",
        sortField: "evaluateNum",
      },
    ]);
    // 参数
    const data = ref({
      categoryId: route.params.id,
      attrs: null,
      brandId: null,
      inventory: false,
      onlyDiscount: false,
      page: 1,
      pageSize: 20,
      sortField: null,
      sortMethod: null,
    });
    const brandId = (brandId) => {
      Data.value = [];
      data.value.brandId = brandId;
      getData();
    };
    const getAttrs = (attrs) => {
      console.log(data);
      Data.value = [];
      data.value.attrs = attrs;
      getData();
    };
    const SubSortClick = (i, e) => {
      Data.value = [];
      showColor.value = i;
      data.value.sortField = e;
      getData();
    };
    const inventory = (e) => {
      Data.value = [];
      data.value.inventory = e;
      getData();
    };
    const onlyDiscount = (e) => {
      Data.value = [];
      data.value.onlyDiscount = e;
      getData();
    };
    //  获取数据函数
    const getData = async () => {
      let res;
      loading.value = true;
      try {
        res = await findSubCategoryGoods(data.value);
      } catch (error) {
        console.log(error);
        return;
      }
      const { result } = res;
      if (result.items.length) {
        Data.value.push(...result.items);
        data.value.page++;
      } else {
        // 加载完毕
        finished.value = true;
      }
      // 请求结束
      loading.value = false;
    };
    // 切换二级分类重新加载
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === "/category/sub/" + newVal) {
          Data.value = [];
          getData();
        }
      }
    );
    return {
      showColor,
      SubSortClick,
      inventory,
      onlyDiscount,
      list,
      Data,
      loading,
      finished,
      getData,
      brandId,
      getAttrs,
    };
  },
};
</script>
<style lang="less" scoped>
.sub-category {
  margin-top: 20px;
  .content {
    width: 100%;
    margin-top: 20px;
    padding: 0 20px;
    background-color: white;
    .filter {
      width: 100%;
      height: 30px;
      padding: 36px 0;
    }
  }
}
</style>
