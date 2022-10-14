import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'normalize.css' // css初始化
import './assets/style/common.scss' // 公共css
import App from './App.vue'
import store from './store'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(ElementPlus, { size: store.state.app.elementSize })
app.use(store)
app.use(router)
// app.config.performance = true
app.mount('#app')
