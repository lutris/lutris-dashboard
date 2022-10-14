import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: 'dashboard', icon: 'el-icon-menu' },
    children: [
      {
        path: 'dashboard',
        component: createNameComponent(() => import('@/views/main/dashboard/index.vue')),
        meta: { title: 'front page', icon: 'el-icon-menu', hideClose: true }
      }
    ]
  }
]

export default route