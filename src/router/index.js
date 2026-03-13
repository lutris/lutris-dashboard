import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useKeepAliveStore } from '@/stores/keepAlive'
import NProgress from '@/utils/system/nprogress'
import { changeTitle } from '@/utils/system/title'

import Layout from '@/layout/index.vue'
import MenuBox from '@/components/menu/index.vue'
import { createNameComponent } from './createNode'

import Dashboard from './modules/dashboard'
import Games from './modules/games'
import Installers from './modules/installers'
import Regressions from './modules/regressions'
import System, { catchAllRoute } from './modules/system'

let modules = [...System]

const routes = modules

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
let asyncRoutes = [...Dashboard, ...Games, ...Installers, ...Regressions]

let routesInitialized = false

export function addRoutes() {
  if (routesInitialized) return
  asyncRoutes.forEach((item) => {
    modules.push(item)
    router.addRoute(item)
  })
  // Add catch-all route last so it doesn't match before dynamic routes
  router.addRoute(catchAllRoute)
  routesInitialized = true
}

function eachData(data, type) {
  data.forEach((d) => {
    if (d.children && d.children.length > 0) {
      if (type === 0) {
        d.component = Layout
      } else {
        d.component = createNameComponent(MenuBox)
      }
      eachData(d.children, type + 1)
    } else {
      d.component = createNameComponent(() => import('@/views/main/dashboard/index.vue'))
    }
  })
  console.log(data)
}

const whiteList = ['/login']

router.beforeEach((to, _from, next) => {
  NProgress.start()
  const userStore = useUserStore()

  // Initialize routes on first navigation if user has a persisted token
  // This must happen in beforeEach (not at module load) because the
  // pinia persistence plugin hydrates state after app.use(pinia)
  if (!routesInitialized && userStore.token) {
    addRoutes()
    userStore.getInfo()
    // Redirect to the same path so the newly added routes are recognized
    next({ path: to.path, query: to.query, replace: true })
    return
  }

  if (userStore.token || whiteList.indexOf(to.path) !== -1) {
    to.meta.title ? changeTitle(to.meta.title) : ''
    next()
  } else {
    next('/login')
    to.meta.title ? changeTitle(to.meta.title) : ''
  }
})

router.afterEach((to, _from) => {
  const keepAliveStore = useKeepAliveStore()
  const name = to.matched[to.matched.length - 1].components.default.name
  if (to.meta && to.meta.cache && name && !keepAliveStore.componentNames.includes(name)) {
    keepAliveStore.addComponentName(name)
  }
  NProgress.done()
})

export { modules }

export default router
