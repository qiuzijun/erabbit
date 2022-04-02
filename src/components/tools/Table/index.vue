<template>
  <div>
    <div class="table">
      <ul class="thead">
        <li
          v-for="item in columns"
          :key="item.key"
          :style="{ width: item.width + 'px', height: item.height + 'px' }"
        >
          {{ item.title }}
        </li>
      </ul>
      <ul class="tbody">
        <li v-for="item in data" :key="item.id">
          <div class="goods">
            <img v-lazyload="item.picture" alt="" />
            <div class="text">
              <p>{{ item.name }}</p>
              <p>{{ item.attrsText }}</p>
            </div>
          </div>
          <div class="price">¥{{ item.price }}</div>
          <div class="number">
            {{ item.count }}
          </div>
          <div class="subtotal">¥{{ item.price * item.count * 1 }}</div>
          <div class="paid">¥{{ item.price * item.count * 1 }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Table",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="less" scoped>
.table {
  width: 100%;
  ul {
    margin-bottom: 0px !important;
  }
  .thead {
    width: 100%;
    height: 60px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: space-between;
    li {
      width: 200px;
      text-align: center;
      line-height: 60px;
    }
  }
  .tbody {
    li {
      width: 100%;
      border: 1px solid #f5f5f5;
      border-top: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods {
        width: 520px;
        padding: 20px;
        display: flex;
        img {
          width: 70px;
          height: 70px;
          margin-right: 15px;
        }
        .text {
          p:last-child {
            color: #999;
          }
        }
      }
      .price,
      .number,
      .subtotal,
      .paid {
        width: 170px;
        padding: 20px;
        text-align: center;
      }
    }
  }
}
</style>
