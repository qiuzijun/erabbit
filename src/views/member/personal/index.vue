<template>
  <div class="personal">
    <div class="userImg">
      <img :src="profile.avatar" alt="" />
      <span>{{ profile.nickname }}</span>
    </div>
    <div class="item">
      <a href="javascript:;">
        <sketch-outlined />
        <p>会员中心</p>
      </a>
      <a href="javascript:;">
        <setting-outlined />
        <p>安全设置</p>
      </a>
      <a href="javascript:;">
        <environment-outlined />
        <p>地址管理</p>
      </a>
    </div>
  </div>
  <div class="content">
    <XtxMore title="我的收藏" :data="list_1" />
    <XtxMore title="我的足迹" :data="list_1" />
  </div>
</template>
<script>
import {
  SketchOutlined,
  SettingOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons-vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { findCollect } from "../../../api/index";
export default {
  name: "Personal",
  components: {
    SketchOutlined,
    SettingOutlined,
    EnvironmentOutlined,
  },
  setup(props) {
    const list_1 = ref([]);
    const store = useStore();
    const profile = computed(() => {
      return store.state.user.profile;
    });
    const getfindCollect = () => {
      findCollect({
        page: 1,
        pageSize: 4,
      })
        .then(({ result }) => {
          list_1.value = result.items;
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getfindCollect();
    return {
      profile,
      list_1,
    };
  },
};
</script>
<style lang="less" scoped>
.personal {
  width: 100%;
  height: 132px;
  padding: 20px 50px;
  background-image: url("../../../assets/images/center-bg.31e0daef.png");
  display: flex;
  justify-content: space-between;
  align-items: center;
  .userImg {
    img {
      width: 85px;
      height: 85px;
      margin-right: 15px;
      border-radius: 50%;
    }
    span {
      font-size: 18px;
      color: white;
    }
  }
  .item {
    display: flex;
    a {
      font-size: 30px;
      margin-left: 80px;
      color: white !important;
      text-align: center;
      display: block;
      p {
        font-size: 16px;
      }
    }
  }
}
.content {
  width: 100%;
}
</style>
