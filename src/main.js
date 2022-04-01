import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 样式重置
import 'normalize.css'
import '@/assets/styles/common.less'
import ui from './components/library'
import 'ant-design-vue/dist/antd.css';
import './mock'


createApp(App).use(store).use(router).use(ui).mount('#app')
