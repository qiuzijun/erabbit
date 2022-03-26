// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxMore from './xtx-more.vue'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'
import HomeSkeleton  from '../home-skeleton.vue'
// 导入library文件夹下的所有组件
// 批量导入需要使用一个函数 require.context(dir,deep,matching)
// 参数：1. 目录  2. 是否加载子目录  3. 加载的正则匹配
const importFn = require.context('./', false, /\.vue$/)
export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    // app.component(XtxSkeleton.name, XtxSkeleton)
    // app.component(XtxMore.name, XtxMore)
    app.component(HomeSkeleton .name, HomeSkeleton )
    // app.component(XtxBread .name, XtxBread )
    // app.component(XtxBreadItem .name, XtxBreadItem )
     // 批量注册全局组件
     importFn.keys().forEach(key => {
        // 导入组件
        const component = importFn(key).default
        // 注册组件
        app.component(component.name, component)
      })

    defineDirective(app)
    
  }
}
import defaultImg from '@/assets/images/qrcode.jpg'
// 指令
const defineDirective = (app) => {
    // 图片懒加载指令
    app.directive('lazyload', {
      mounted (el, binding) {
        const observer = new IntersectionObserver(([{ isIntersecting }]) => {
          if (isIntersecting) {
            observer.unobserve(el)
            el.onerror = () => {
                el.src = defaultImg
            }  
            el.src = binding.value
          }
        }, {
          threshold: 0.01
        })
        observer.observe(el)
      }
    })
  }
