import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from 'element-plus'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import 'element-plus/theme-chalk/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import store from './store'
import router from "./router";

import "@/styles/main.scss";

import './permission.js'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
})
app.use(router);
app.use(store);
app.mount("#app");

export default app;