<template>
  <div class="Details" v-if="details">
    <ul>
      <li v-for="item in details.properties" :key="item.name">
        <span>{{ item.name }}</span>
        <span>{{ item.value }}</span>
      </li>
    </ul>
    <div class="img">
      <img
        v-lazyload="item"
        alt=""
        v-for="item in details.pictures"
        :key="item"
      />
    </div>
  </div>
  <div class="Details" v-else>
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
export default {
  name: "Details",
  props: {
    details: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
<style lang="less" scoped>
.Details {
  background-color: white;
  padding: 0 40px;
  ul {
    overflow: auto;
    li {
      padding: 20px 40px 0 40px;
      float: left;
      span:first-child {
        color: #999;
        margin-right: 15px;
      }
    }
  }
  .img {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    img {
      width: 100%;
    }
  }
}
</style>
