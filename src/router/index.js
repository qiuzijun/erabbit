import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  { path: '/login', component: ()=>import('../views/login') },
  {
    path:"/",
    component:()=>import('../views/Layout.vue'),
    children:[
      {
        path:"",
        component:()=>import('../views/home'),
      },
      {
        path:"category/:id",
        component:()=>import('../views/category/index.vue'),
        
      },
      {
        path:"category/sub/:id",
        component:()=>import('../views/category/sub/index.vue'),
      },
      {
        path:"product/:id",
        component:()=>import('../views/product/index.vue'),
      },
      {
        path:"cart",
        component:()=>import('../views/cart/index.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
