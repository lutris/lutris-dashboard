import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/regressions',
    component: Layout,
    redirect: '/regressions/list',
    meta: { title: 'Regressions', icon: 'WarningFilled' },
    alwayShow: true,
    children: [
      {
        path: 'list',
        component: createNameComponent(() => import('@/views/regressions/list.vue')),
        name: 'RegressionList',
        meta: { title: 'Regressions', noCache: true }
      },
      {
        path: ':id',
        component: createNameComponent(() => import('@/views/regressions/detail.vue')),
        name: 'RegressionDetail',
        meta: { title: 'Regression Detail', noCache: true },
        hideMenu: true
      }
    ]
  }
]

export default route
