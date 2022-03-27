<template>
  <div class="product">
    <Picture :img="list.mainPictures" />
    <Spec :list="list" />
  </div>
  <Relevant :list="relevant" />
  <div class="ProductDetails">
    <div class="left">
      <div class="switch">
        <p :class="active ? 'active' : ''" @click="active = true">商品详情</p>
        <p :class="active ? '' : 'active'" @click="CommentClick">
          商品评论<span>({{ evaPage ? evaPage.counts : 0 }})</span>
        </p>
      </div>
      <Details v-if="active" :details="list.details" />
      <Comment
        v-else
        :eva="eva"
        :evaPage="evaPage"
        @filterName="filterName"
        @filterHot="filterHot"
        @pageIndex="pageIndex"
      />
    </div>
    <div class="right">
      <div class="h">
        <h3 class="title">24小时热销榜</h3>
        <ul v-if="hot">
          <li v-for="item in hot" :key="item.id">
            <RelevantList :list="item" />
          </li>
        </ul>
      </div>
      <div class="week">
        <h3 class="title">周热销榜</h3>
        <ul v-if="week">
          <li v-for="item in week" :key="item.id">
            <RelevantList :list="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Picture from "./components/picture.vue";
import Spec from "./components/spec.vue";
import Relevant from "./components/relevant.vue";
import Details from "./components/Details.vue";
import Comment from "./components/comment.vue";
import RelevantList from "./components/relevantList.vue";
import {
  findProductGoods,
  findProductGoodsRelevant,
  findProductGoodsHot,
  evaluate,
  evaluatePage,
} from "../../api/product";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "Product",
  components: {
    Picture,
    Spec,
    Relevant,
    Details,
    Comment,
    RelevantList,
  },
  setup(props) {
    const list = ref([]);
    const relevant = ref([]);
    const hot = ref([]);
    const week = ref([]);
    const eva = ref({});
    const evaPage = ref({});
    const active = ref(true);
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
      //console.log(result);
      list.value = result;
    };
    // 获取商品同类商品推荐
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
      //console.log(result);
      relevant.value = result;
    };
    // 获取24小时榜单 以及周榜单接口
    const getProductGoodsHot = (type) => {
      return findProductGoodsHot({
        id: route.params.id,
        limit: 3,
        type,
      });
    };
    // 获取评论类型
    const getEvaluate = () => {
      evaluate(route.params.id).then(({ data }) => {
        console.log(data);
        data.result.tags.unshift({
          title: "全部",
          tagCount: data.result.evaluateCount,
        });
        eva.value = data.result;
      });
    };
    // 获取评论
    // 参数
    const dataPage = ref({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null,
    });
    const getEvaluatePage = () => {
      evaluatePage(route.params.id, dataPage.value).then(({ data }) => {
        console.log(data);
        evaPage.value = data.result;
      });
    };
    // 获取24小时榜单 以及周榜单方法
    const getHot = () => {
      let array = [];
      let number = [1, 2];
      number.forEach((type) => {
        array.push(getProductGoodsHot(type));
      });
      Promise.all(array)
        .then((data) => {
          hot.value = data[0].result;
          week.value = data[1].result;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    // 商品评论
    const CommentClick = () => {
      active.value = false;
      getEvaluatePage();
    };
    const filterName = (e) => {
      if (e == "有图") dataPage.value.hasPicture = true;
      else dataPage.value.tag = e;
      getEvaluatePage();
    };
    const filterHot = (e) => {
      dataPage.value.sortField = e;
      getEvaluatePage();
    };
    const pageIndex = (e) => {
      dataPage.value.page = e;
      getEvaluatePage();
    };
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === "/product" + newVal) {
          list.value = [];
          getProductGoods();
          getProductGoodsRelevant();
          getHot();
          getEvaluate();
        }
      }
    );
    getProductGoods();
    getProductGoodsRelevant();
    getHot();
    getEvaluate();
    return {
      list,
      relevant,
      active,
      hot,
      week,
      eva,
      evaPage,
      CommentClick,
      filterName,
      filterHot,
      pageIndex,
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
.ProductDetails {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 940px;
    background-color: white;
    .switch {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      border: 1px solid #f5f5f5;
      p {
        padding: 15px 40px;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
        border-right: 1px solid #f5f5f5;
        position: relative;
        cursor: pointer;
        span {
          color: @priceColor;
        }
      }
      .active {
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
  .right {
    width: 280px;
    .h {
      background-color: white;
      margin-bottom: 10px;
      h3 {
        height: 70px;
        background: #e26237;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: 400;
      }
    }
    .week {
      background-color: white;
      h3 {
        height: 70px;
        background: #e26237;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: 400;
      }
    }
  }
}
</style>
