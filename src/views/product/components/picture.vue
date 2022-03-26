<template>
  <div class="picture">
    <div class="top">
      <div class="img" v-if="img[imgIndex]" ref="target">
        <img :src="img[imgIndex]" alt="" />
        <div class="layer" v-show="show" :style="position"></div>
      </div>
      <div class="imgElse" v-else></div>
      <div class="imgMini">
        <ul>
          <li
            v-for="(item, index) in img"
            :key="index"
            @mouseover="imgIndex = index"
          >
            <img v-lazyload="item" alt="" />
          </li>
        </ul>
      </div>
      <div
        class="imgMax"
        v-show="show"
        :style="[{ backgroundImage: `url(${img[imgIndex]})` }, bgPosition]"
      ></div>
    </div>
    <ul class="btn">
      <li v-for="(item, index) in 4" :key="index">
        <p>哈哈哈哈</p>
        <p>200+</p>
        <p>哈哈哈哈</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";
export default {
  name: "Picture",
  props: {
    img: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    let imgIndex = ref(0);
    const usePreviewImg = () => {
      const target = ref(null);
      const show = ref(false);
      // elementX 鼠标基于容器左上角X轴偏移
      // elementY 鼠标基于容器左上角Y轴偏移
      // isOutside 鼠标是否在模板容器外
      const { elementX, elementY, isOutside } = useMouseInElement(target);
      const position = reactive({ left: 0, top: 0 });
      const bgPosition = reactive({
        backgroundPositionX: 0,
        backgroundPositionY: 0,
      });
      watch([elementX, elementY, isOutside], () => {
        // 控制X轴方向的定位 0-200 之间
        if (elementX.value < 100) position.left = 0;
        else if (elementX.value > 300) position.left = 200;
        else position.left = elementX.value - 100;
        // 控制Y轴方向的定位 0-200 之间
        if (elementY.value < 100) position.top = 0;
        else if (elementY.value > 300) position.top = 200;
        else position.top = elementY.value - 100;
        // 设置大背景的定位
        bgPosition.backgroundPositionX = -position.left * 2 + "px";
        bgPosition.backgroundPositionY = -position.top * 2 + "px";
        // 设置遮罩容器的定位
        position.left = position.left + "px";
        position.top = position.top + "px";
        // 设置是否显示预览大图
        show.value = !isOutside.value;
      });
      return { position, bgPosition, show, target };
    };
    const { position, bgPosition, show, target } = usePreviewImg();

    return {
      imgIndex,
      position,
      bgPosition,
      show,
      target,
    };
  },
};
</script>
<style lang="less" scoped>
.picture {
  width: 580px;
  height: 600px;
  padding: 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    width: 480px;
    height: 400px;
    display: flex;
    justify-content: space-between;
    position: relative;
    .img {
      width: 400px;
      height: 400px;
      position: relative;
      cursor: move;
      .layer {
        width: 200px;
        height: 200px;
        background: rgba(0, 0, 0, 0.2);
        left: 0;
        top: 0;
        position: absolute;
      }
    }
    .imgElse {
      width: 400px;
      height: 400px;
      background-color: #999;
    }
    .imgMini {
      width: 68px;
      height: 100%;
      ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        li {
          width: 68px;
          height: 68px;
          overflow: hidden;
          img {
            transition: all 0.2s;
          }
          &:hover {
            border: 2px solid @xtxColor;
            img {
              width: 70px;
              height: 70px;
            }
          }
        }
      }
    }
    .imgMax {
      width: 400px;
      height: 400px;
      position: absolute;
      right: -332px;
      z-index: 2;
    }
  }
  .btn {
    height: 140px;
    li {
      padding: 0 15px;
      border-right: 1px solid #e4e4e4;
      text-align: center;
      margin-top: 40px;
      float: left;
      p {
        margin-bottom: 5px;
      }
      p:first-child {
        color: #999;
      }
      p:nth-child(2) {
        color: @priceColor;
      }
      p:last-child {
        color: #666;
      }
    }
    li:last-child {
      border-right: 1px solid transparent;
    }
  }
}
</style>
