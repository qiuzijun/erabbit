<template>
  <div class="Specifications">
    <ul>
      <li v-for="item in specs" :key="item.name">
        <span>{{ item.name }}</span>
        <ul>
          <li
            v-for="data in item.values"
            :key="data.name"
            :class="{ selected: data.selected }"
            @click="clickSpecs(item, data)"
          >
            <span v-if="item.name !== '颜色'" @click="skusClick(item, data)">{{
              data.name
            }}</span>
            <div class="img" v-else @click="skusClick(item, data)">
              <img :src="data.picture" :alt="data.name" :title="data.name" />
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import { ref } from "vue";
import getPowerSet from "@/vender/power-set";
export default {
  name: "Specifications",
  props: {
    specs: {
      type: Array,
      default: () => [],
    },
    skus: {
      type: Array,
      default: () => [],
    },
    skuId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const active = ref(null);
    const pathMapS = ref([]);
    const skusClick = (item, data) => {
      if (!data.selected) console.log(data.name);
    };
    const clickSpecs = (item, val) => {
      // 如果是禁用状态不作为
      if (val.disabled) return false;
      // 1. 选中与取消选中逻辑
      if (val.selected) {
        val.selected = false;
      } else {
        item.values.forEach((bv) => {
          bv.selected = false;
        });
        val.selected = true;
        console.log(val);
        // 点击的时候更新禁用状态
        // updateDisabledStatus(props.specs, pathMap);
        // 触发change事件将sku数据传递出去
        const selectedArr = getSelectedArr(props.specs).filter((v) => v);
        if (selectedArr.length === props.specs.length) {
          const skuIds = pathMapS.value[selectedArr.join(spliter)];
          setTimeout(() => {
            console.log(skuIds);
          }, 1000);
          setTimeout(() => {
            const sku = props.skus.find((sku) => sku.id === skuIds[0]);
            // 传递
            emit("change", {
              skuId: sku.id,
              price: sku.price,
              oldPrice: sku.oldPrice,
              inventory: sku.inventory,
              specsText: sku.specs
                .reduce((p, n) => `${p} ${n.name}：${n.valueName}`, "")
                .replace(" ", ""),
            });
          }, 1000);
        } else {
          emit("change", {});
        }
      }
    };
    const spliter = "★";
    // 根据skus数据得到路径字典对象
    const getPathMap = (skus) => {
      const pathMap = {};
      skus.forEach((sku) => {
        // 1. 过滤出有库存有效的sku
        if (sku.inventory) {
          // 2. 得到sku属性值数组
          const specs = sku.specs.map((spec) => spec.valueName);
          // 3. 得到sku属性值数组的子集
          const powerSet = getPowerSet(specs);
          console.log(powerSet);
          // 4. 设置给路径字典对象
          powerSet.forEach((set) => {
            const key = set.join(spliter);
            if (pathMap[key]) {
              // 已经有key往数组追加
              pathMap[key].push(sku.id);
            } else {
              // 没有key设置一个数组
              pathMap[key] = [sku.id];
            }
          });
        }
      });
      pathMapS.value = pathMap;
    };

    // 得到当前选中规格集合
    const getSelectedArr = (specs) => {
      const selectedArr = [];
      specs.forEach((spec) => {
        const selectedVal = spec.values.find((val) => val.selected);
        selectedArr.push(selectedVal ? selectedVal.name : undefined);
      });
      return selectedArr;
    };
    // 更新按钮的禁用状态
    const updateDisabledStatus = (specs, pathMap) => {
      specs.forEach((spec, i) => {
        const selectedArr = getSelectedArr(specs);
        spec.values.forEach((val) => {
          // 已经选中的按钮不用判断
          if (val.name === selectedArr[i]) return false;
          // 未选中的替换对应的值
          selectedArr[i] = val.name;
          // 过滤无效值得到key
          const key = selectedArr.filter((v) => v).join(spliter);
          // 设置禁用状态
          val.disabled = !pathMap[key];
        });
      });
    };
    // 初始化选中状态
    const initSelectedStatus = (specs, skus, skuId) => {
      const sku = skus.find((sku) => sku.id === skuId);
      if (sku) {
        specs.forEach((spec, i) => {
          const value = sku.specs[i].valueName;
          spec.values.forEach((val) => {
            val.selected = val.name === value;
          });
        });
      }
    };
    getPathMap(props.skus);
    // const pathMap = getPathMap(props.skus);
    // console.log(pathMap);
    // 根据传入的skuId默认选中规格按钮
    initSelectedStatus(props.specs, props.skus, props.skuId);
    // 组件初始化的时候更新禁用状态
    updateDisabledStatus(props.specs, pathMapS.value);
    return {
      active,
      skusClick,
      clickSpecs,
    };
  },
};
</script>
<style lang="less" scoped>
.Specifications {
  width: 100%;
  > ul {
    margin-top: 20px;
    > li {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      > span {
        width: 50px;
        color: #999;
        margin-right: 15px;
        display: block;
      }
      ul {
        overflow: hidden;
        li {
          text-align: center;
          margin-bottom: 5px;
          margin-right: 10px;
          border: 1px solid #e4e4e4;
          float: left;
          cursor: pointer;
          span {
            text-align: center;
            padding: 3px 20px;
          }
          .img {
            width: 50px;
            height: 50px;
          }
        }
        .selected {
          border: 1px solid @xtxColor;
        }
      }
    }
  }
}
</style>
