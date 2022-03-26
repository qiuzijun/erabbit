<template>
  <div class="Specifications">
    <ul>
      <li v-for="item in specs" :key="item.name">
        <span>{{ item.name }}</span>
        <ul>
          <li
            v-for="data in item.values"
            :key="data.name"
            :class="item.specs == data.name ? 'active' : ''"
            @click="item.specs == data.name"
          >
            <span
              v-if="item.name !== '颜色'"
              @click="skusClick(item, data.name)"
              >{{ data.name }}</span
            >
            <div class="img" v-else @click="skusClick(item, data.name)">
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
  },
  setup(props) {
    const active = ref(null);
    const skusName = ref("");
    const skusClick = (item, name) => {
      skusName.value += name;
      props.skus.forEach((data) => {
        if (
          skusName.value == data.specsName ||
          skusName.value == data.specsReverse
        ) {
          console.log(data);
        }
      });
      item.specs = name;
    };
    return {
      active,
      skusClick,
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

        .active {
          border: 1px solid @xtxColor;
        }
      }
    }
  }
}
</style>
