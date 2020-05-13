import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/games',
    component: Layout,
    meta: {
      title: 'Games',
      icon: 'list'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/games/index'),
        name: 'GamesDashboard',
        meta: { title: 'Games', noCache: true }
      },
      {
        path: 'merge',
        component: () => import('@/views/games/merge'),
        name: 'GameMerge',
        meta: { title: 'Merge', noCache: true }
      },
      {
        path: ':slug',
        component: () => import('@/views/games/detail'),
        name: 'GameDetail',
        hidden: true
      }
    ]
  },
  {
    path: '/installers',
    redirect: '/installers/submissions',
    component: Layout,
    name: 'Installers',
    meta: {
      title: 'Installers',
      icon: 'list'
    },
    children: [
      {
        path: 'submissions',
        component: () => import('@/views/installers/submissions'),
        name: 'Submissions',
        meta: { title: 'submissions', noCache: true }
      },
      {
        path: 'submissions/drafts',
        component: () => import('@/views/installers/drafts'),
        name: 'Drafts',
        meta: { title: 'drafts', noCache: true }
      },
      {
        path: 'submissions/:id(\\d+)',
        component: () => import('@/views/installers/submission'),
        name: 'Submission',
        meta: { title: 'submission', noCache: true },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
