<template>
  <div class="service">
    <p>
      <span>促销</span>
      <span>12月好物放送，App领券购买直降120元</span>
    </p>
    <div class="city">
      <span>配送</span>
      <div class="cityS" :class="active ? 'active' : ''">
        <span>至</span>
        <div class="address" @click="active = !active">{{ address }}∨</div>
        <div class="CityData" v-show="active">
          <ul>
            <li
              v-for="item in CityData"
              :key="item.code"
              @click="addressName(item, item.name)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <p class="btn">
      <span>服务</span>
      <span>无忧退货</span>
      <span>快速退款</span>
      <span>免费包邮</span>
      <a href="#">了解详情</a>
    </p>
  </div>
</template>
<script>
import { ref } from "vue";
import { getCityData } from "@/api/api";
export default {
  name: "City",
  setup(props) {
    const active = ref(false);
    const address = ref("北京市 市辖区 东城区");
    const CityData = ref([]);
    // 获取城市数据
    const getCity = async () => {
      let res;
      try {
        res = await getCityData();
      } catch (error) {
        console.log(error);
        return;
      }
      console.log(res);
      CityData.value = res;
    };
    const addressName = (item, name) => {
      if (item.level == 0) {
        address.value = "";
        address.value += name + " ";
        CityData.value = item.areaList;
      }
      if (item.level == 1) {
        address.value += name + " ";
        CityData.value = item.areaList;
      }
      if (item.level == 2) {
        address.value += name;
        active.value = false;
        getCity();
      }
    };
    getCity();
    return {
      active,
      address,
      CityData,
      addressName,
    };
  },
};
</script>
<style lang="less" scoped>
.service {
  width: 100%;
  height: 150px;
  background-color: #f5f5f5;
  padding: 20px 10px 0 10px;
  p {
    padding: 15px 0;
    color: #666;
    span:first-child {
      color: #999;
      margin-right: 15px;
    }
    a {
      margin-left: 15px;
      color: @xtxColor;
    }
  }
  .btn {
    span:nth-child(2),
    span:nth-child(3),
    span:nth-child(4) {
      &::before {
        content: "•";
        color: @xtxColor;
      }
    }
  }
  .city {
    color: #666;
    display: flex;
    > span {
      color: #999;
      margin-right: 15px;
    }
    .cityS {
      height: 30px;
      cursor: pointer;
      float: right;
      position: relative;
      span {
        line-height: 30px;
      }
      .address {
        padding: 2px;
        border: 1px solid #999;
        float: right;
      }
      .CityData {
        width: 532px;
        height: 292px;
        background-color: white;
        position: absolute;
        top: 30px;
        left: 14px;
        border: 1px solid #999;
        padding: 5px;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            width: 130px;
            height: 30px;
            border-radius: 5px;
            line-height: 30px;
            text-align: center;
            &:hover {
              background-color: #f5f5f5;
            }
          }
        }
      }
    }
    .active {
      .address {
        background-color: white;
      }
    }
  }
}
</style>
