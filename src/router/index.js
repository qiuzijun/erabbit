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
        path:'checkout',
        component:()=>import('../views/checkout/index.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
