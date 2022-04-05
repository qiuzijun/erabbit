import { createRouter, createWebHashHistory } from 'vue-router'
import {h} from 'vue'
const routes = [
  { path: '/login', component: ()=>import('../views/login') },
  {
    path:"/",
    component:()=>import('../views/Layout.vue'),
    children:[
      {
        path:"",
        component:()=>import('../views/home'),
        meta: {
          title:'首页',
          keepAlive: false,
        }
      },
      {
        path:"category/:id",
        component:()=>import('../views/category/index.vue'),
        meta: {
          keepAlive: false,
        }
      },
      {
        path:"category/sub/:id",
        component:()=>import('../views/category/sub/index.vue'),
        meta: {
          keepAlive: true,
        }
      },
      {
        path:"product/:id",
        component:()=>import('../views/product/index.vue'),
        meta: {
          keepAlive: false,
        }
      },
      {
        path:"cart",
        component:()=>import('../views/cart/index.vue'),
        meta: {
          keepAlive: false,
        }
      },
      {
        path:"member",
        component:()=>import('../views/member/index.vue'),
        meta: {
          title:'个人中心',
          keepAlive: false,
        },
        children:[
          {
            path:'',
            component:()=>import('../views/member/personal/index.vue')
          },
          {
            path:'address',
            component:()=>import('../views/member/address/index.vue')
          },
          {
            path:'message',
            component:()=>import('../views/message/index.vue'),
            meta:{
              title:'消息通知'
            }
          },
          {
            path:'security',
            component:()=>import('../views/security/index.vue'),
            meta:{
              title:'安全设置'
            }
          },
          {
            path:'myPoints',
            component:()=>import('../views/myPoints/index.vue'),
            meta:{
              title:'我的积分'
            }
          },
          {
            path:'myTracks',
            component:()=>import('../views/myTracks/index.vue'),
            meta:{
              title:'我的足迹'
            }
          },
          {
            path:'politeInvitation',
            component:()=>import('../views/politeInvitation/index.vue'),
            meta:{
              title:'邀请有礼'
            }
          },
          {
            path:'luckyDraw',
            component:()=>import('../views/luckyDraw/index.vue'),
            meta:{
              title:'幸运抽奖'
            }
          },
          {
            path:'coupon',
            component:()=>import('../views/coupon/index.vue'),
            meta:{
              title:'优惠券'
            }
          },
          {
            path:'giftCard',
            component:()=>import('../views/giftCard/index.vue'),
            meta:{
              title:'礼品卡'
            }
          },
          {
            path:'evaluation',
            component:()=>import('../views/evaluation/index.vue'),
            meta:{
              title:'评价晒单'
            }
          },
          {
            path:'afterSale',
            component:()=>import('../views/afterSale/index.vue'),
            meta:{
              title:'售后服务'
            }
          },
          {
            path:'collectibleGoods',
            component:()=>import('../views/collectibleGoods/index.vue'),
            meta:{
              title:'收藏的商品'
            }
          },
          {
            path:'collectionTopics',
            component:()=>import('../views/collectionTopics/index.vue'),
            meta:{
              title:'收藏的专题'
            }
          },
          {
            path:'concernedBrands',
            component:()=>import('../views/concernedBrands/index.vue'),
            meta:{
              title:'关注的品牌'
            }
          },
          {
            path:'helpCenter',
            component:()=>import('../views/helpCenter/index.vue'),
            meta:{
              title:'帮助中心'
            }
          },
          {
            path:'onlineService',
            component:()=>import('../views/onlineService/index.vue'),
            meta:{
              title:'在线客服'
            }
          },
          {
            path:'order/',
            component: { render: () => h(<RouterView/>) },
            children: [
              { path: '', component:()=>import('../views/member/order/index.vue') },
              { path: ':id', component:()=>import('../views/member/orderDetails/index.vue') }
            ]
          },
          
        ]
      },
      {
        path:'member/pay/:id',
        component:()=>import('../views/member/pay/index.vue'),
        meta:{
          title:'支付订单'
        }
      },
      {
        path:'checkout',
        component:()=>import('../views/checkout/index.vue'),
        meta:{
          title:'填写订单'
        }
      },
      
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
