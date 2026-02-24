import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/display.css'
import 'normalize.css'
import './assets/style/common.scss'
import App from './App.vue'
import pinia from './stores'
import { useAppStore } from './stores/app'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
const appStore = useAppStore()
app.use(ElementPlus, { size: appStore.elementSize })
app.use(router)
appStore.initTheme()
app.mount('#app')
