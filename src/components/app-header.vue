<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <AppHeaderNav />
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <div class="cart">
        <a class="curr" href="#">
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
        <div class="cartList">
          <Cart />
          <div class="footer">
            <div class="total">
              <p>共 13 件商品</p>
              <p>¥7624.8</p>
            </div>
            <div class="button">去购物车结算</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import AppHeaderNav from "./app-header-nav";
import Cart from "../components/library/cart.vue";
</script>

<style lang="less" scoped>
.app-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../assets/images/logo.png) no-repeat center 18px / contain;
    }
  }
  .navs {
    width: 820px;
    display: flex;
    justify-content: space-around;
    padding-left: 40px;
    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
      }
      &:hover {
        a {
          color: @xtxColor;
          border-bottom: 1px solid @xtxColor;
        }
      }
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
      border: none;
    }
  }
  .cart {
    width: 50px;
    position: relative;
    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;
      .icon-cart {
        font-size: 22px;
      }
      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: @helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
    .cartList {
      width: 400px;
      height: 400px;
      position: absolute;
      top: 50px;
      right: 0;
      box-shadow: 0px 0px 6px 0px #999;
      opacity: 0;
      transition: all 0.4s 0.2s;
      transform: translateY(-200px) scaleY(0);
      background: #fff;
      border-radius: 4px;
      padding-top: 10px;
      z-index: 2;
      cursor: pointer;
      &::before {
        content: "";
        position: absolute;
        right: 14px;
        top: -10px;
        width: 20px;
        height: 20px;
        background: #fff;
        transform: scaleX(0.6) rotate(45deg);
        box-shadow: -3px -3px 5px #999;
        z-index: 1;
      }
      .footer {
        width: 400px;
        height: 70px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background: #f8f8f8;
        align-items: center;
        .total {
          padding-left: 10px;
          color: #999;
          P {
            margin-bottom: 0px !important;
          }
          p:first-child {
            color: #999;
            margin-top: 5px;
          }
          p:last-child {
            font-size: 18px;
            color: @priceColor;
          }
        }
        .button {
          width: 180px;
          height: 50px;
          font-size: 16px;
          color: @xtxColor;
          background: #e6faf6;
          text-align: center;
          line-height: 50px;
          border: 1px solid @xtxColor;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
        }
      }
    }
    &:hover {
      .cartList {
        opacity: 1;
        transition: all 0.4s 0.2s;
        transform: none;
      }
    }
  }
}
</style>
