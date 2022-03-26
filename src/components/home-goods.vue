<template>
  <div class="container">
    <template v-if="list.name">
      <div class="content">
        <h3>
          {{ list.name }}
          <a href="#">
            <span> 查看全部</span>
            <i class="iconfont icon-angle-right"></i>
          </a>
          <ul>
            <li v-for="item in list.children" :key="item.id">
              <a href="#">{{ item.name }}</a>
            </li>
          </ul>
        </h3>
        <div class="list">
          <div class="left">
            <a href="#">
              <img
                src="https://yanxuan-item.nosdn.127.net/d0176b163973961ed01818d04ee94a06.png?quality=95&thumbnail=610x610&imageView"
                alt=""
              />
              <div class="label">
                <!-- <p>{{ list.name }}馆</p> -->
                <p>大额优惠等</p>
              </div>
            </a>
          </div>
          <div class="right">
            <ul>
              <li v-for="item in list.goods" :key="item.id">
                <div class="goodsItem">
                  <a href="#" class="image">
                    <img v-lazyload="item.picture" :alt="item.name" />
                  </a>
                  <p>{{ item.name }}</p>
                  <p style="color: #666" class="desc">{{ item.desc }}</p>
                  <p style="font-size: 20px; color: #cf4444">
                    ¥{{ item.price }}
                  </p>
                  <div class="extra">
                    <a href="#">
                      <span>找相似</span>
                      <br />
                      <span>发现更多宝贝></span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: "HomeGoods",
  props: {
    list: {
      type: Object,
    },
  },
  setup(props) {
    // console.log(props.list);
  },
};
</script>
<style lang="less" scoped>
.container {
  width: 100%;
  background-color: white;
  overflow: hidden;
  .content {
    width: 1240px;
    margin: 0 auto;
    h3 {
      width: 100%;
      height: 115px;
      font-size: 32px;
      font-weight: 400;
      line-height: 35px;
      margin-left: 6px;
      padding: 40px 0;
      ul {
        line-height: 35px;
        margin-right: 50px;
        float: right;
        li {
          font-size: 16px;
          color: #999;
          padding: 2px 12px;
          margin-right: 15px;
          float: left;
          &:hover {
            background-color: @xtxColor;
            border-radius: 8px;
            a {
              color: white;
            }
          }
        }
      }
      > a {
        font-size: 16px;
        color: #999;
        margin-right: 6px;
        float: right;
      }
    }
    .list {
      width: 100%;
      height: 610px;
      display: flex;
      justify-content: space-between;
      .left {
        width: 240px;
        height: 100%;
        background-color: red;
        a {
          width: 240px;
          height: 610px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .label {
            height: 66px;
            position: absolute;
            top: 50%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
              height: 66px;
              color: white;
              font-size: 18px;
              text-align: center;
              line-height: 66px;
              padding: 0 20px;
              background-color: rgba(0, 0, 0, 0.7);
            }

            p:last-child {
              background-color: rgba(0, 0, 0, 0.5);
            }
          }
        }
      }
      .right {
        width: 1000px;
        height: 100%;
        ul {
          display: flex;
          flex-flow: wrap;
          li {
            width: 250px;
            height: 300px;
            padding: 0 10px;
            margin-bottom: 10px;
            position: relative;
            .goodsItem {
              width: 250px;
              height: 300px;
              padding: 10px 30px;
              position: absolute;
              overflow: hidden;
              border: 1px solid transparent;
              transition: all 0.5s;
              .image {
                display: block;
                width: 160px;
                height: 160px;
                margin: 0 auto;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              p {
                font-size: 16px;
                margin-top: 10px;
              }
              .desc {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .extra {
                position: absolute;
                left: 0;
                bottom: 0;
                height: 86px;
                width: 100%;
                background: #27ba9b;
                text-align: center;
                transform: translate3d(0, 100%, 0);
                transition: all 0.5s;
                a {
                  color: white;
                  span {
                    font-size: 18px;
                    line-height: 35px;
                  }
                  span:first-child {
                    padding: 5px 50px;
                    border-bottom: 1px solid white;
                  }
                }
              }
              &:hover {
                border-color: #27ba9b;
                cursor: pointer;
                .extra {
                  transform: translate3d(0, 0%, 0);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
